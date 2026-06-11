import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AlunoService } from '../aluno/aluno.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private alunoService: AlunoService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || 'placeholder',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'placeholder',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const email = profile.emails?.[0]?.value;
    if (!email) return done(new UnauthorizedException('Email não retornado pelo Google'), false);

    const alunos = await this.alunoService.findAll();
    const aluno = alunos.find(a => a.email === email);
    if (!aluno) return done(new UnauthorizedException('Nenhum aluno cadastrado com este e-mail Google'), false);

    return done(null, aluno);
  }
}