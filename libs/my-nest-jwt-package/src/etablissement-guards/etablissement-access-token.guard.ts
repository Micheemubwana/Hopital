
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class EtablissementAccessTokenGuard extends AuthGuard('etablissement-jwt') {}