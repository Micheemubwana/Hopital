import { Test, TestingModule } from '@nestjs/testing';
import { AttributionsController } from './attributions.controller';
import { AttributionsService } from './attributions.service';

describe('AttributionsController', () => {
  let controller: AttributionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttributionsController],
      providers: [AttributionsService],
    }).compile();

    controller = module.get<AttributionsController>(AttributionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
