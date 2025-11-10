import { Test, TestingModule } from '@nestjs/testing';
import { RespuestaEstudianteService } from './respuesta-estudiante.service';

describe('RespuestaEstudianteService', () => {
  let service: RespuestaEstudianteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RespuestaEstudianteService],
    }).compile();

    service = module.get<RespuestaEstudianteService>(RespuestaEstudianteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
