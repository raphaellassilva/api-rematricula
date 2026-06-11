import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from './entities/aluno.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private readonly repo: Repository<Aluno>,
  ) {}

  async create(dto: any) {
    const hash = await bcrypt.hash(dto.senha, 10);
    const aluno = this.repo.create({
      nome: dto.nome,
      email: dto.email,
      senha: hash,
      matricula: dto.matricula,
      curso: { id: dto.cursoId } as any,
    });
    return this.repo.save(aluno);
  }

  findAll() {
    return this.repo.find({ relations: ['curso'] });
  }

  async findOne(id: number) {
    const aluno = await this.repo.findOne({ where: { id }, relations: ['curso'] });
    if (!aluno) throw new NotFoundException('Aluno não encontrado');
    return aluno;
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async update(id: number, dto: any) {
    const aluno = await this.findOne(id);
    const atualizado = { ...aluno, ...dto };
    return this.repo.save(atualizado);
  }

  async remove(id: number) {
    const aluno = await this.findOne(id);
    return this.repo.remove(aluno);
  }
}