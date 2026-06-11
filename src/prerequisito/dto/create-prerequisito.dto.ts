import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrerequisitoDto {
  @ApiProperty({ description: 'ID da disciplina que possui o pré-requisito' })
  @IsNumber()
  disciplinaId: number;

  @ApiProperty({ description: 'ID da disciplina que é o pré-requisito' })
  @IsNumber()
  disciplinaRequisitoId: number;
}