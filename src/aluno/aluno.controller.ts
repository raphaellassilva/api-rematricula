import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@ApiTags('Aluno')
@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar novo aluno' })
  create(@Body() dto: CreateAlunoDto) {
    return this.alunoService.create(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Perfil do aluno autenticado' })
  getProfile(@Req() req: any) {
    return this.alunoService.findOne(req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos os alunos' })
  findAll() {
    return this.alunoService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar aluno por ID' })
  findOne(@Param('id') id: number) {
    return this.alunoService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar aluno' })
  update(@Param('id') id: number, @Body() dto: UpdateAlunoDto) {
    return this.alunoService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover aluno' })
  remove(@Param('id') id: number) {
    return this.alunoService.remove(id);
  }
}