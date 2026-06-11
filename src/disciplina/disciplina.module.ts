import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Disciplina } from './entities/disciplina.entity';
import { Curso } from '../curso/entities/curso.entity';

import { DisciplinaService } from './disciplina.service';
import { DisciplinaController } from './disciplina.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Disciplina, Curso]) // 🔥 ISSO É O QUE ESTAVA FALTANDO
  ],
  controllers: [DisciplinaController],
  providers: [DisciplinaService],
})
export class DisciplinaModule {}