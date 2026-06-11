import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { Turma } from '../../turma/entities/turma.entity';

@Entity('matriculas_alunos')
export class MatriculaAluno {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.id, { eager: true })
  aluno: Aluno;

  @ManyToOne(() => Turma, (turma) => turma.matriculas, { eager: true })
  turma: Turma;

  @Column({ default: 'MATRICULADO' })
  situacao: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataMatricula: Date;
}