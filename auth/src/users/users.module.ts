import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MyNestJwtPackageModule } from 'my-nest-jwt-package';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MailsModule } from 'src/mails/mails.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    MyNestJwtPackageModule,
    MailsModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
