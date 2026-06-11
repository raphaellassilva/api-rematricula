import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MatriculaAluno } from './entities/matricula-aluno.entity';
import { Aluno } from '../aluno/entities/aluno.entity';
import { Turma } from '../turma/entities/turma.entity';
import { CreateMatriculaAlunoDto } from './dto/create-matricula-aluno.dto';
import { PrerequisitoService } from '../prerequisito/prerequisito.service';

@Injectable()
export class MatriculaAlunoService {
  constructor(
    @InjectRepository(MatriculaAluno)
    private repo: Repository<MatriculaAluno>,

    @InjectRepository(Aluno)
    private alunoRepo: Repository<Aluno>,

    @InjectRepository(Turma)
    private turmaRepo: Repository<Turma>,

    private prerequisitoService: PrerequisitoService,
  ) {}

  async create(dto: CreateMatriculaAlunoDto) {
    const aluno = await this.alunoRepo.findOne({ where: { id: dto.alunoId } });
    if (!aluno) throw new BadRequestException('Aluno não encontrado');

    const turma = await this.turmaRepo.findOne({
      where: { id: dto.turmaId },
      relations: ['disciplina'],
    });
    if (!turma) throw new BadRequestException('Turma não encontrada');

    // Verificar duplicidade
    const existe = await this.repo.findOne({
      where: { aluno: { id: dto.alunoId }, turma: { id: dto.turmaId } },
    });
    if (existe) throw new BadRequestException('Aluno já matriculado nesta turma');

    // Validar pré-requisitos
    const prerequisitos = await this.prerequisitoService.findByDisciplina(
      turma.disciplina.id,
    );

    if (prerequisitos.length > 0) {
      // Buscar disciplinas já cursadas pelo aluno (situacao CONCLUIDA)
      const matriculasConcluidas = await this.repo.find({
        where: { aluno: { id: dto.alunoId }, situacao: 'CONCLUIDA' },
        relations: ['turma', 'turma.disciplina'],
      });

      const disciplinasCursadas = matriculasConcluidas.map(
        (m) => m.turma.disciplina.id,
      );

      for (const pre of prerequisitos) {
        if (!disciplinasCursadas.includes(pre.disciplinaRequisito.id)) {
          throw new BadRequestException(
            `Pré-requisito não cumprido: ${pre.disciplinaRequisito.nome}`,
          );
        }
      }
    }

    const matricula = this.repo.create({
      aluno,
      turma,
      situacao: dto.situacao ?? 'MATRICULADO',
    });

    return this.repo.save(matricula);
  }

  findAll() {
    return this.repo.find({ relations: ['aluno', 'turma', 'turma.disciplina'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['aluno', 'turma', 'turma.disciplina'],
    });
  }

  async findDisciplinasCursadas(alunoId: number) {
    const matriculas = await this.repo.find({
      where: { aluno: { id: alunoId } },
      relations: ['turma', 'turma.disciplina'],
    });
    return matriculas.map((m) => ({
      disciplina: m.turma.disciplina,
      situacao: m.situacao,
      dataMatricula: m.dataMatricula,
    }));
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}