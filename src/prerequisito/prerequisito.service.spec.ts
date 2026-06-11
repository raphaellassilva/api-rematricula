import { Test, TestingModule } from '@nestjs/testing';
import { PrerequisitoService } from './prerequisito.service';

describe('PrerequisitoService', () => {
  let service: PrerequisitoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrerequisitoService],
    }).compile();

    service = module.get<PrerequisitoService>(PrerequisitoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
