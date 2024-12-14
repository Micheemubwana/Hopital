import { Injectable } from '@nestjs/common';
import { CreatePatientUserDto } from './dto/create-patient-user.dto';
import { UpdatePatientUserDto } from './dto/update-patient-user.dto';

@Injectable()
export class PatientUsersService {
  create(createPatientUserDto: CreatePatientUserDto) {
    return 'This action adds a new patientUser';
  }

  findAll() {
    return `This action returns all patientUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patientUser`;
  }

  update(id: number, updatePatientUserDto: UpdatePatientUserDto) {
    return `This action updates a #${id} patientUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} patientUser`;
  }
}
