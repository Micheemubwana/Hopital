
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class PersonnelAccessTokenGuard extends AuthGuard('personnel-jwt') {}