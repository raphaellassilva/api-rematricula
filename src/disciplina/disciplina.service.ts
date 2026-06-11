import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disciplina } from './entities/disciplina.entity';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { Curso } from '../curso/entities/curso.entity';

@Injectable()
export class DisciplinaService {
  constructor(
    @InjectRepository(Disciplina)
    private disciplinaRepo: Repository<Disciplina>,

    @InjectRepository(Curso)
    private cursoRepo: Repository<Curso>,
  ) {}

  async create(dto: CreateDisciplinaDto) {
    const curso = await this.cursoRepo.findOne({ where: { id: dto.cursoId } });
    if (!curso) throw new NotFoundException('Curso não encontrado');

    const disciplina = this.disciplinaRepo.create({
      codigo: dto.codigo,
      nome: dto.nome,
      cargaHoraria: dto.cargaHoraria,
      curso,
    });
    return this.disciplinaRepo.save(disciplina);
  }

  findAll() {
    return this.disciplinaRepo.find({ relations: ['curso'] });
  }

  async findOne(id: number) {
    const disciplina = await this.disciplinaRepo.findOne({ where: { id }, relations: ['curso'] });
    if (!disciplina) throw new NotFoundException('Disciplina não encontrada');
    return disciplina;
  }

  async update(id: number, dto: Partial<CreateDisciplinaDto>) {
    await this.findOne(id);
    await this.disciplinaRepo.update(id, {
      codigo: dto.codigo,
      nome: dto.nome,
      cargaHoraria: dto.cargaHoraria,
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const disciplina = await this.findOne(id);
    return this.disciplinaRepo.remove(disciplina);
  }
}