import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstitutionsModule } from './institutions/institutions.module';
import { DepartementsModule } from './departements/departements.module';
import { AdressesModule } from './adresses/adresses.module';

@Module({
  imports: [InstitutionsModule, DepartementsModule, AdressesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
