# API Rematrícula

Sistema de rematrícula de alunos desenvolvido com NestJS, JWT, Google OAuth2, Swagger e PostgreSQL.

## Tecnologias

- NestJS
- TypeORM + PostgreSQL
- JWT (autenticação interna)
- Google OAuth2 (autenticação externa)
- Swagger (documentação)
- class-validator (validação)
- bcrypt (criptografia de senha)

## Instalação

```bash
npm install
```

## Configuração

Copie o arquivo `.env.example` e preencha com suas credenciais:

```bash
cp .env.example .env
```

Variáveis necessárias:

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=rematricula_db
JWT_SECRET=seu_secret
GOOGLE_CLIENT_ID=seu_client_id
GOOGLE_CLIENT_SECRET=seu_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

## Banco de dados

O projeto usa PostgreSQL. Crie o banco antes de rodar:

```sql
CREATE DATABASE rematricula_db;
```

As tabelas são criadas automaticamente pelo TypeORM com `synchronize: true`.

## Executando

```bash
# desenvolvimento
npm run start:dev

# produção
npm run start:prod
```

## Documentação

Acesse o Swagger em: http://localhost:3000/api

## Endpoints principais

### Auth
- `POST /auth/login` — login com email e senha
- `GET /auth/google` — login via Google OAuth2

### Aluno
- `POST /aluno` — cadastrar aluno
- `GET /aluno/me` — perfil do aluno autenticado
- `GET /aluno` — listar alunos
- `PATCH /aluno/:id` — atualizar aluno
- `DELETE /aluno/:id` — remover aluno

### Curso
- `POST /curso` — criar curso
- `GET /curso` — listar cursos
- `PATCH /curso/:id` — atualizar curso
- `DELETE /curso/:id` — remover curso

### Disciplina
- `POST /disciplina` — criar disciplina
- `GET /disciplina` — listar disciplinas
- `PATCH /disciplina/:id` — atualizar disciplina
- `DELETE /disciplina/:id` — remover disciplina

### Turma
- `POST /turma` — criar turma
- `GET /turma?periodo=2025.1` — listar turmas (filtro por período)
- `PATCH /turma/:id` — atualizar turma
- `DELETE /turma/:id` — remover turma

### Matrícula
- `POST /matricula-aluno` — matricular aluno em turma
- `GET /matricula-aluno` — listar matrículas
- `GET /matricula-aluno/minhas-disciplinas` — disciplinas do aluno autenticado
- `DELETE /matricula-aluno/:id` — cancelar matrícula

### Pré-requisito
- `POST /prerequisito` — associar pré-requisito
- `GET /prerequisito` — listar pré-requisitos
- `GET /prerequisito/disciplina/:id` — pré-requisitos de uma disciplina
- `DELETE /prerequisito/:id` — remover pré-requisito

## Fluxo de rematrícula

1. Cadastre um curso (`POST /curso`)
2. Cadastre um aluno vinculado ao curso (`POST /aluno`)
3. Cadastre disciplinas (`POST /disciplina`)
4. Defina pré-requisitos entre disciplinas (`POST /prerequisito`)
5. Cadastre turmas (`POST /turma`)
6. Faça login (`POST /auth/login`) e copie o token
7. Use o token para se matricular em uma turma (`POST /matricula-aluno`).