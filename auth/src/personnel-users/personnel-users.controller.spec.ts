import { Test, TestingModule } from '@nestjs/testing';
import { PersonnelUsersController } from './personnel-users.controller';
import { PersonnelUsersService } from './personnel-users.service';

describe('PersonnelUsersController', () => {
  let controller: PersonnelUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonnelUsersController],
      providers: [PersonnelUsersService],
    }).compile();

    controller = module.get<PersonnelUsersController>(PersonnelUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
