import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AttributionsModule } from './attributions/attributions.module';
import { UserAttributionsModule } from './user_attributions/user_attributions.module';
import { PatientUsersModule } from './patient-users/patient-users.module';
import { PersonnelUsersModule } from './personnel-users/personnel-users.module';
import { MyNestJwtPackageModule } from 'my-nest-jwt-package';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { MailsModule } from './mails/mails.module';
import { NatsStreamingTransport } from '@nestjs-plugins/nestjs-nats-streaming-transport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_URL,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
    }),
    NatsStreamingTransport.register({
      clientId: process.env.NATS_CLIENT_ID,
      clusterId: process.env.NATS_CLUSTER_ID,
      connectOptions: {
        url: process.env.NATS_URL,
      },
    }),

    MyNestJwtPackageModule,
    UsersModule, 
    AttributionsModule, 
    UserAttributionsModule, 
    PatientUsersModule, 
    PersonnelUsersModule, MailsModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
