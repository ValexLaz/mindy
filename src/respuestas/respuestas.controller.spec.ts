import { Test, TestingModule } from '@nestjs/testing';
import { RespuestasController } from './respuestas.controller';

describe('RespuestasController', () => {
  let controller: RespuestasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RespuestasController],
    }).compile();

    controller = module.get<RespuestasController>(RespuestasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
