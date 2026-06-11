import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDisciplinaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNumber()
  cargaHoraria: number;

  @ApiProperty()
  @IsNumber()
  cursoId: number;
}