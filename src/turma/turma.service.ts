import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turma } from './entities/turma.entity';
import { Disciplina } from '../disciplina/entities/disciplina.entity';

@Injectable()
export class TurmaService {
  constructor(
    @InjectRepository(Turma)
    private turmaRepo: Repository<Turma>,

    @InjectRepository(Disciplina)
    private disciplinaRepo: Repository<Disciplina>,
  ) {}

  async create(dto: any) {
    const disciplina = await this.disciplinaRepo.findOne({
      where: { id: dto.disciplinaId },
    });

    if (!disciplina) {
      throw new NotFoundException('Disciplina não encontrada');
    }

    const turma = this.turmaRepo.create({
      professor: dto.professor,
      horario: dto.horario,
      periodoLetivo: dto.periodoLetivo,
      disciplina: disciplina,
    });

    return this.turmaRepo.save(turma);
  }

  findAll(periodo?: string) {
    if (periodo) {
      return this.turmaRepo.find({ where: { periodoLetivo: periodo } });
    }
    return this.turmaRepo.find();
  }

  findOne(id: number) {
    return this.turmaRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: any) {
    const turma = await this.findOne(id);
    if (!turma) throw new NotFoundException('Turma não encontrada');
    await this.turmaRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.turmaRepo.delete(id);
  }
}