import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AttributionsModule } from './attributions/attributions.module';
import { UserAttributionsModule } from './user_attributions/user_attributions.module';
import { PatientUsersModule } from './patient-users/patient-users.module';
import { PersonnelUsersModule } from './personnel-users/personnel-users.module';

@Module({
  imports: [UsersModule, AttributionsModule, UserAttributionsModule, PatientUsersModule, PersonnelUsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
