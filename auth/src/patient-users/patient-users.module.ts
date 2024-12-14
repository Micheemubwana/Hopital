import { Module } from '@nestjs/common';
import { PatientUsersService } from './patient-users.service';
import { PatientUsersController } from './patient-users.controller';

@Module({
  controllers: [PatientUsersController],
  providers: [PatientUsersService],
})
export class PatientUsersModule {}
