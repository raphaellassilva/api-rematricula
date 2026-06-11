import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TurmaService } from './turma.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Turma')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('turma')
export class TurmaController {
  constructor(private readonly turmaService: TurmaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar turma' })
  create(@Body() dto: CreateTurmaDto) {
    return this.turmaService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar turmas (com filtro opcional por período)' })
  @ApiQuery({ name: 'periodo', required: false, description: 'Ex: 2025.1' })
  findAll(@Query('periodo') periodo?: string) {
    return this.turmaService.findAll(periodo);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar turma por ID' })
  findOne(@Param('id') id: number) {
    return this.turmaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar turma' })
  update(@Param('id') id: number, @Body() dto: Partial<CreateTurmaDto>) {
    return this.turmaService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover turma' })
  remove(@Param('id') id: number) {
    return this.turmaService.remove(id);
  }
}