import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prerequisito } from './entities/prerequisito.entity';
import { CreatePrerequisitoDto } from './dto/create-prerequisito.dto';

@Injectable()
export class PrerequisitoService {
  constructor(
    @InjectRepository(Prerequisito)
    private repo: Repository<Prerequisito>,
  ) {}

  create(dto: CreatePrerequisitoDto) {
    const prerequisito = this.repo.create({
      disciplina: { id: dto.disciplinaId },
      disciplinaRequisito: { id: dto.disciplinaRequisitoId },
    });
    return this.repo.save(prerequisito);
  }

  findAll() {
    return this.repo.find();
  }

  findByDisciplina(disciplinaId: number) {
    return this.repo.find({
      where: { disciplina: { id: disciplinaId } },
    });
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}