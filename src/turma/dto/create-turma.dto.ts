import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTurmaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  professor: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  horario: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  periodoLetivo: string;

  @ApiProperty()
  @IsNumber()
  disciplinaId: number;
}