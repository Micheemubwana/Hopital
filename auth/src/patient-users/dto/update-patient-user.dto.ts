import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientUserDto } from './create-patient-user.dto';

export class UpdatePatientUserDto extends PartialType(CreatePatientUserDto) {}
