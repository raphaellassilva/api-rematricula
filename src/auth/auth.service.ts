import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AlunoService } from '../aluno/aluno.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private alunoService: AlunoService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, senha: string) {
    const alunos = await this.alunoService.findAll();
    const aluno = alunos.find(a => a.email === email);

    if (!aluno) throw new UnauthorizedException('Aluno não encontrado');
    if (!aluno.senha) throw new UnauthorizedException('Aluno sem senha cadastrada');

    const senhaValida = await bcrypt.compare(senha, aluno.senha);
    if (!senhaValida) throw new UnauthorizedException('Senha inválida');

    return this.gerarToken(aluno);
  }

  async loginGoogle(aluno: any) {
    return this.gerarToken(aluno);
  }

  private gerarToken(aluno: any) {
    const payload = { sub: aluno.id, email: aluno.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}