import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DisciplinaService } from './disciplina.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';

@ApiTags('Disciplina')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('disciplina')
export class DisciplinaController {
  constructor(private readonly disciplinaService: DisciplinaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar disciplina' })
  create(@Body() dto: CreateDisciplinaDto) {
    return this.disciplinaService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar disciplinas' })
  findAll() {
    return this.disciplinaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar disciplina por ID' })
  findOne(@Param('id') id: number) {
    return this.disciplinaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar disciplina' })
  update(@Param('id') id: number, @Body() dto: Partial<CreateDisciplinaDto>) {
    return this.disciplinaService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover disciplina' })
  remove(@Param('id') id: number) {
    return this.disciplinaService.remove(id);
  }
}