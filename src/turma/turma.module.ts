import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Turma } from './entities/turma.entity';
import { Disciplina } from '../disciplina/entities/disciplina.entity';
import { MatriculaAluno } from '../matricula-aluno/entities/matricula-aluno.entity';

import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Turma, Disciplina, MatriculaAluno])
  ],
  controllers: [TurmaController],
  providers: [TurmaService],
})
export class TurmaModule {}