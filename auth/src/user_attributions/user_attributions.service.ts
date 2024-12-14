import { Injectable } from '@nestjs/common';
import { CreateUserAttributionDto } from './dto/create-user_attribution.dto';
import { UpdateUserAttributionDto } from './dto/update-user_attribution.dto';

@Injectable()
export class UserAttributionsService {
  create(createUserAttributionDto: CreateUserAttributionDto) {
    return 'This action adds a new userAttribution';
  }

  findAll() {
    return `This action returns all userAttributions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAttribution`;
  }

  update(id: number, updateUserAttributionDto: UpdateUserAttributionDto) {
    return `This action updates a #${id} userAttribution`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAttribution`;
  }
}
