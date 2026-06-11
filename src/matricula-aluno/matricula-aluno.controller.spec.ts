import { Test, TestingModule } from '@nestjs/testing';
import { MatriculaAlunoController } from './matricula-aluno.controller';

describe('MatriculaAlunoController', () => {
  let controller: MatriculaAlunoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatriculaAlunoController],
    }).compile();

    controller = module.get<MatriculaAlunoController>(MatriculaAlunoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
