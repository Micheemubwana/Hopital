import { Test, TestingModule } from '@nestjs/testing';
import { PersonnelUsersService } from './personnel-users.service';

describe('PersonnelUsersService', () => {
  let service: PersonnelUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonnelUsersService],
    }).compile();

    service = module.get<PersonnelUsersService>(PersonnelUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
