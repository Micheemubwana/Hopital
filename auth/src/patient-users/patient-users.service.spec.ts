import { Test, TestingModule } from '@nestjs/testing';
import { PatientUsersService } from './patient-users.service';

describe('PatientUsersService', () => {
  let service: PatientUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientUsersService],
    }).compile();

    service = module.get<PatientUsersService>(PatientUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
