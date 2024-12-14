import { Module } from '@nestjs/common';
import { PersonnelUsersService } from './personnel-users.service';
import { PersonnelUsersController } from './personnel-users.controller';

@Module({
  controllers: [PersonnelUsersController],
  providers: [PersonnelUsersService],
})
export class PersonnelUsersModule {}
