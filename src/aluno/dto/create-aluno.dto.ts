import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlunoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  senha: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  matricula: string;

  @ApiProperty()
  @IsNumber()
  cursoId: number;
}