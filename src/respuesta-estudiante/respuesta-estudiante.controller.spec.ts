import { Test, TestingModule } from '@nestjs/testing';
import { RespuestaEstudianteController } from './respuesta-estudiante.controller';

describe('RespuestaEstudianteController', () => {
  let controller: RespuestaEstudianteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RespuestaEstudianteController],
    }).compile();

    controller = module.get<RespuestaEstudianteController>(RespuestaEstudianteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
