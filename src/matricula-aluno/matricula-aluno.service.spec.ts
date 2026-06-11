import { Test, TestingModule } from '@nestjs/testing';
import { MatriculaAlunoService } from './matricula-aluno.service';

describe('MatriculaAlunoService', () => {
  let service: MatriculaAlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatriculaAlunoService],
    }).compile();

    service = module.get<MatriculaAlunoService>(MatriculaAlunoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
