import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient } from './entities/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsStreamingTransport } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forFeature([Patient]),
    NatsStreamingTransport.register({
      clientId: process.env.NATS_CLIENT_ID,
      clusterId: process.env.NATS_CLUSTER_ID,
      connectOptions: {
        url: process.env.NATS_URL,
      },
    }),

  ],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}
