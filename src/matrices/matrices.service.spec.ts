import { Test, TestingModule } from '@nestjs/testing';
import { MatricesService } from './matrices.service';

describe('MatricesService', () => {
  let service: MatricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatricesService],
    }).compile();

    service = module.get<MatricesService>(MatricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
