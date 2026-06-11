import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Disciplina } from '../../disciplina/entities/disciplina.entity';
import { MatriculaAluno } from '../../matricula-aluno/entities/matricula-aluno.entity';

@Entity('turmas')
export class Turma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  professor: string;

  @Column()
  horario: string;

  @Column()
  periodoLetivo: string;

  @ManyToOne(() => Disciplina, { eager: true, onDelete: 'CASCADE' })
  disciplina: Disciplina;

  @OneToMany(() => MatriculaAluno, (matricula) => matricula.turma)
  matriculas: MatriculaAluno[];
}