import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMatriculaAlunoDto {
  @ApiProperty()
  @IsNumber()
  alunoId: number;

  @ApiProperty()
  @IsNumber()
  turmaId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  situacao?: string;
}