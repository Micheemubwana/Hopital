import { Module } from '@nestjs/common';
import { UserAttributionsService } from './user_attributions.service';
import { UserAttributionsController } from './user_attributions.controller';

@Module({
  controllers: [UserAttributionsController],
  providers: [UserAttributionsService],
})
export class UserAttributionsModule {}
