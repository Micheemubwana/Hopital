import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MyNestJwtPackageService } from 'my-nest-jwt-package';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { generationDeMotDePasse } from 'src/utils/generale.util';
import { MailsService } from 'src/mails/mails.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: MyNestJwtPackageService,
    private readonly mailsService: MailsService
  ){}

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.userRepository.createQueryBuilder("user")
                      .where ("user.email =:email",{email: createUserDto.email})
                      .getOne();
    if (userExist){
      throw new HttpException("cette adresse mail existe déja", HttpStatus.CONFLICT)
    }
    createUserDto.salt = await this.authService.generateSalt();
    if (createUserDto.password){
      createUserDto.password = await this.authService.hashPassword(createUserDto.password, createUserDto.salt);
    }
    else {
      createUserDto.password = await generationDeMotDePasse();
      createUserDto.password = await this.authService.hashPassword(createUserDto.password, createUserDto.salt);
      await this.mailsService.sendLoginDetailsPatient(createUserDto.email, createUserDto.password, createUserDto.nom_user)
    }
    const user = await this.userRepository.save(createUserDto);
    if(user){
      delete user.password;
      user.refresh_token;
      user.salt;
      return user;
    }
    throw new HttpException("votre enregistrement n'a pas réussi", HttpStatus.CONFLICT)
  
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  
  async getOneByEmail(email:string){
    const user =await this.userRepository.createQueryBuilder("user")
                .where ("user.email =:email",{email: email})
                .getOne();
    if (user){
      return user
    }
    throw new HttpException("l'utilisateur n'existe pas",HttpStatus.NOT_FOUND)
  }

  async login(email: string, motDePass: string){
    const user = await this.getOneByEmail(email);
    
    const isMatch= await this.authService.validatePassword(motDePass, user.password)
    if(!isMatch)
      throw new HttpException("le mot de passe est incorrect!",HttpStatus.AMBIGUOUS)
    const data = {
      userId: user.id,
      username: user.nom_user,
      email: user.email,
      role: user.role
    }
    const token = await this.authService.signAccess_token(data, process.env.JWT_ACCESS_SECRET);
    const refreshToken = await this.authService.signRefresh_token(data,process.env.JWT_REFRESH_SECRET);
    await this.setCurrentRefreshToken(refreshToken, user.id);
    delete user.salt;
    delete user.password;
    delete user.refresh_token;
    return {...user, accessToken: token, refreshToken:refreshToken};
  }

  async findForValidate(payload: any){
    const user = await this.userRepository.createQueryBuilder('user')
                .where('user.id =:id', {id: payload.userId})
                .andWhere('user.username =:username', {username: payload.username})
                .andWhere('user.deletedAt IS NULL')
                .getOne();
    if(!user)
      throw new HttpException("Cet utilisateur n'existe pas encore !",HttpStatus.UNAUTHORIZED)
    return user;
  }

  async logout(userId: string) {
    return await this.userRepository.update(userId, { refresh_token: null });
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string){
    const user = await this.getOne(userId);
    if(user){
      const salt = user.salt;
      const currentHashedRefreshToken = await this.authService.hashRefreshToken(refreshToken, salt)
      return await this.userRepository.update(userId,{refresh_token: currentHashedRefreshToken})
    }else{
      throw new HttpException(`Cet utilisateur n'existe pas encore !`, HttpStatus.NOT_FOUND);
    }

  }

  async getOne(id: string){
    const user = await this.userRepository.createQueryBuilder('user')
                  .where('user.id =:id', {id: id})
                  .getOne();
    if(!user)
      throw new HttpException(`Cet utilisateur n'existe pas encore !`, HttpStatus.NOT_FOUND);
    return user;
  }

  async createPatient(createUserDto: any) {
    const userExist = await this.userRepository.createQueryBuilder("user")
                      .where ("user.email =:email",{email: createUserDto.email})
                      .getOne();
    if (userExist){
      throw new HttpException("cette adresse mail existe déja", HttpStatus.CONFLICT)
    }
    createUserDto.salt = await this.authService.generateSalt();
   
    createUserDto.password = await generationDeMotDePasse();
    createUserDto.password = await this.authService.hashPassword(createUserDto.password, createUserDto.salt);
    await this.mailsService.sendLoginDetailsPatient(createUserDto.email, createUserDto.password, createUserDto.nom_user)
    
    const user = await this.userRepository.save(createUserDto);
    if(user){
      delete user.password;
      user.refresh_token;
      user.salt;
      return user;
    }
    throw new HttpException("votre enregistrement n'a pas réussi", HttpStatus.CONFLICT)
  
  }

}
