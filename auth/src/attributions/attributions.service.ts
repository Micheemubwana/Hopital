import { Injectable } from '@nestjs/common';
import { CreateAttributionDto } from './dto/create-attribution.dto';
import { UpdateAttributionDto } from './dto/update-attribution.dto';

@Injectable()
export class AttributionsService {
  create(createAttributionDto: CreateAttributionDto) {
    return 'This action adds a new attribution';
  }

  findAll() {
    return `This action returns all attributions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attribution`;
  }

  update(id: number, updateAttributionDto: UpdateAttributionDto) {
    return `This action updates a #${id} attribution`;
  }

  remove(id: number) {
    return `This action removes a #${id} attribution`;
  }
}
