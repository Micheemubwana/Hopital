
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class PatientAccessTokenGuard extends AuthGuard('patient-jwt') {}