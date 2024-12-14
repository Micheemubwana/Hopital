import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonnelUserDto } from './create-personnel-user.dto';

export class UpdatePersonnelUserDto extends PartialType(CreatePersonnelUserDto) {}
