import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Disciplina } from '../../disciplina/entities/disciplina.entity';

@Entity('prerequisitos')
export class Prerequisito {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Disciplina, { eager: true, onDelete: 'CASCADE' })
  disciplina: Disciplina;

  @ManyToOne(() => Disciplina, { eager: true, onDelete: 'CASCADE' })
  disciplinaRequisito: Disciplina;
}