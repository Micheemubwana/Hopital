
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class EtablissemntAccessTokenStrategy extends PassportStrategy(Strategy,'etablissement-jwt') {
  private readonly logger = new Logger(EtablissemntAccessTokenStrategy.name);
  constructor(
    private readonly configService:ConfigService,
    private readonly httpService: HttpService
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET_ETABLISSEMENT,
      passReqToCallback: true
    });
  }

  async validate(req:any, payload: any) {
    this.logger.log('Request sent by user: ' + payload.userId);
    const url = await this.configService.get<string>('URL_AUTH');
    const {data} = await this.httpService.axiosRef.get(`${url}/users/auth/${payload.userId}/${payload.email}`)
    this.logger.log('Request sent by user: ' + payload.userId);
    return payload;
  }
}
