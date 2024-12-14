import { Module } from '@nestjs/common';
import { MyNestJwtPackageService } from './my-nest-jwt-package.service';
import { EtablissementAccessTokenGuard } from './etablissement-guards/etablissement-access-token.guard';
import { EtablissemntAccessTokenStrategy } from './etablissement-stategies/etablissement-access-token.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({}),
    HttpModule, ConfigModule.forRoot({isGlobal: true})
  ],
  providers: [
    MyNestJwtPackageService,
    EtablissementAccessTokenGuard,
    EtablissemntAccessTokenStrategy
  ],
  exports: [MyNestJwtPackageService],
})
export class MyNestJwtPackageModule {}
