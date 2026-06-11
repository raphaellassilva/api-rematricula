import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Curso } from '../../curso/entities/curso.entity';

@Entity('disciplinas')
export class Disciplina {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column()
  nome: string;

  @Column()
  cargaHoraria: number;

  @ManyToOne(() => Curso, (curso) => curso.disciplinas)
  curso: Curso;
}