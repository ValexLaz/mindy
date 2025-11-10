import { Test, TestingModule } from '@nestjs/testing';
import { MatricesController } from './matrices.controller';

describe('MatricesController', () => {
  let controller: MatricesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatricesController],
    }).compile();

    controller = module.get<MatricesController>(MatricesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
