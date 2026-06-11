import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MatriculaAluno } from './entities/matricula-aluno.entity';
import { Aluno } from '../aluno/entities/aluno.entity';
import { Turma } from '../turma/entities/turma.entity';

import { MatriculaAlunoService } from './matricula-aluno.service';
import { MatriculaAlunoController } from './matricula-aluno.controller';
import { PrerequisitoModule } from '../prerequisito/prerequisito.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MatriculaAluno, Aluno, Turma]),
    PrerequisitoModule,
  ],
  providers: [MatriculaAlunoService],
  controllers: [MatriculaAlunoController],
})
export class MatriculaAlunoModule {}