import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Disciplina } from '../../disciplina/entities/disciplina.entity';

@Entity('cursos')
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sigla: string;

  // 🔗 relação correta do enunciado
  @OneToMany(() => Disciplina, (disciplina) => disciplina.curso)
  disciplinas: Disciplina[];
}