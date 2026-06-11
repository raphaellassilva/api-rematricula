import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Curso } from '../../curso/entities/curso.entity';

@Entity('alunos')
export class Aluno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column()
  matricula: string;

  @ManyToOne(() => Curso, { eager: true })
  curso: Curso;
}