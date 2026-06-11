import { Controller, Get, Post, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MatriculaAlunoService } from './matricula-aluno.service';
import { CreateMatriculaAlunoDto } from './dto/create-matricula-aluno.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Matricula-Aluno')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('matricula-aluno')
export class MatriculaAlunoController {
  constructor(private readonly service: MatriculaAlunoService) {}

  @Post()
  @ApiOperation({ summary: 'Matricular aluno em uma turma' })
  create(@Body() dto: CreateMatriculaAlunoDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as matrículas' })
  findAll() {
    return this.service.findAll();
  }

  @Get('minhas-disciplinas')
  @ApiOperation({ summary: 'Disciplinas cursadas pelo aluno autenticado' })
  minhasDisciplinas(@Req() req: any) {
    return this.service.findDisciplinasCursadas(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar matrícula por ID' })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar matrícula' })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}