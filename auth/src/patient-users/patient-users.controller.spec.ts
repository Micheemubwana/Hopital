import { Test, TestingModule } from '@nestjs/testing';
import { PatientUsersController } from './patient-users.controller';
import { PatientUsersService } from './patient-users.service';

describe('PatientUsersController', () => {
  let controller: PatientUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientUsersController],
      providers: [PatientUsersService],
    }).compile();

    controller = module.get<PatientUsersController>(PatientUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
