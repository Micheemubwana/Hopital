import { Injectable } from '@nestjs/common';
import { CreatePersonnelUserDto } from './dto/create-personnel-user.dto';
import { UpdatePersonnelUserDto } from './dto/update-personnel-user.dto';

@Injectable()
export class PersonnelUsersService {
  create(createPersonnelUserDto: CreatePersonnelUserDto) {
    return 'This action adds a new personnelUser';
  }

  findAll() {
    return `This action returns all personnelUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personnelUser`;
  }

  update(id: number, updatePersonnelUserDto: UpdatePersonnelUserDto) {
    return `This action updates a #${id} personnelUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} personnelUser`;
  }
}
