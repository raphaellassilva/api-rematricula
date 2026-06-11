import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno])],
  controllers: [AlunoController],
  providers: [AlunoService],
  exports: [AlunoService], // 🔥 ESSENCIAL
})
export class AlunoModule {}