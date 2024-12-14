import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MyNestJwtPackageService {
    constructor(
        private jwtService: JwtService,
        
      ) {}
    
      async hashRefreshToken(refresh_token: string,salt:string): Promise<string> {
        const hash = await bcrypt.hash(refresh_token, salt);
        return hash;
      }
      async hashPassword(password: string,salt:string): Promise<string> {
        const hash = await bcrypt.hash(password, salt);
        return hash;
      }
    
      async generateSalt(){
        const salt = await bcrypt.genSalt()
        return salt
      }
    
      async validatePassword(incomePassword: string, existPassword: string): Promise<boolean> {

        const isMatch = await bcrypt.compare(incomePassword, existPassword);
        if (!isMatch) {
          throw new NotFoundException(
            'Le mot de passe que vous avez entré est incorrect!',
          );
        }
        return isMatch;
      }
      async validateRefreshToken(incomeToken: string, existToken: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(incomeToken, existToken);
        if (!isMatch) {
          throw new ForbiddenException('Accès refusé')
        }
        return isMatch;
      }
    
      async signAccess_token(payload: Record<string, any>, secret:string): Promise<string> {

        return  this.jwtService.signAsync(payload,
            {
              secret: secret
              //expiresIn: '15m',
            },
          )
        // const token = this.jwtService.sign(payload);
        // return token;
      }

      async signRefresh_token(payload: Record<string, any>, secret:string): Promise<string> {

        return  this.jwtService.signAsync(payload,
            {
              secret: secret 
              //expiresIn: '7d',
            },
          )
      }

      async sign(payload:Record<string, any>,secret:string){

        const token =  this.jwtService.signAsync(payload,
          {
            secret: secret
            //expiresIn: '7d',
          },
        )
        return token;
      }
    
      async verify(payload: string, secret: string){
        const result = await this.jwtService.verify(payload,{
          secret: secret
        })
        return result
      }
}
