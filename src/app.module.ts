import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { AlunoModule } from './aluno/aluno.module';
import { CursoModule } from './curso/curso.module';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { TurmaModule } from './turma/turma.module';
import { MatriculaAlunoModule } from './matricula-aluno/matricula-aluno.module';
import { PrerequisitoModule } from './prerequisito/prerequisito.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    AuthModule,
    AlunoModule,
    CursoModule,
    DisciplinaModule,
    TurmaModule,
    MatriculaAlunoModule,
    PrerequisitoModule,
  ],
})
export class AppModule {}