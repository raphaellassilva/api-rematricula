import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PrerequisitoService } from './prerequisito.service';
import { CreatePrerequisitoDto } from './dto/create-prerequisito.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Prerequisito')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('prerequisito')
export class PrerequisitoController {
  constructor(private readonly service: PrerequisitoService) {}

  @Post()
  @ApiOperation({ summary: 'Associar pré-requisito entre disciplinas' })
  create(@Body() dto: CreatePrerequisitoDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pré-requisitos' })
  findAll() {
    return this.service.findAll();
  }

  @Get('disciplina/:id')
  @ApiOperation({ summary: 'Listar pré-requisitos de uma disciplina' })
  findByDisciplina(@Param('id') id: number) {
    return this.service.findByDisciplina(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover pré-requisito' })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}