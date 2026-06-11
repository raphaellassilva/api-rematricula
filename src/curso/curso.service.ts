import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private readonly repo: Repository<Curso>,
  ) {}

  create(dto: any) {
    const curso = this.repo.create({
      nome: dto.nome,
      sigla: dto.sigla,
    });

    return this.repo.save(curso);
  }

  findAll() {
    // ❌ REMOVIDO: relations inválido (disciplinas não existe ainda)
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
    });
  }

  async update(id: number, dto: any) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}