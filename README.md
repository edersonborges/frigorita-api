# Frigorita API - Node.js + TypeScript + Prisma + Docker

Este projeto é uma API desenvolvida em **Node.js** com **TypeScript**, utilizando **Prisma** como ORM e **Express** como framework HTTP. O projeto está estruturado para facilitar manutenção e escalabilidade, com separação entre **rotas**, **controllers** e **services**.

---

## Estrutura do Projeto

- **src/**: Arquivos principais da aplicação.
  - **controllers/**: Controllers que processam requisições e retornam respostas.
  - **services/**: Lógica de negócio.
  - **routes/**: Definições das rotas e sua vinculação aos controllers.
  - **Middlewares/**: Autenticação e middlewares.
  - **configs/**: Configurações do projeto (ex: porta, variáveis de ambiente).
  - **utils/**: Funções utilitárias.
- **prisma/**: Schema e migrações do Prisma.
- **swagger_output.json**: Documentação Swagger gerada.
- **docker-compose.yml**: Ambiente docker (dev).
- **docker-compose.prod.yml**: Ambiente docker (produção/rede interna, recomendado).

---

## Requisitos

- **Node.js**
- **Docker + Docker Compose**
- **PostgreSQL** (rodando via Docker é o caminho recomendado)
- **Prisma** (já é dependência do projeto)

---

## Variáveis de Ambiente (`.env`)

Crie um arquivo `.env` na raiz do **backend**.

### Exemplo mínimo (DEV)

```env
PORT=5003
JWT_SECRET=COLOQUE_UM_SECRET_FORTE_AQUI
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/frigorita?schema=public"

# Quando TRUE: cria pedido como PENDENTE (0)
# Quando FALSE: cria pedido como APROVADO (1)
APROVACAO_PEDIDO=TRUE

# CORS (opcional em DEV). Se não setar, fica liberado.
# CORS_ORIGINS=http://localhost:5173
```

### Exemplo (PRODUÇÃO em Docker / rede interna)

Quando a API está dentro do docker, o host do banco **não é localhost**, é o nome do serviço do compose:

```env
PORT=5003
JWT_SECRET=COLOQUE_UM_SECRET_FORTE_AQUI
DATABASE_URL="postgresql://postgres:postgres@db:5432/frigorita?schema=public"

APROVACAO_PEDIDO=TRUE
CORS_ORIGINS=http://IP_DO_SERVIDOR
```

> Dica: Se você servir o front via Nginx na mesma origem (`http://IP_DO_SERVIDOR`) e usar `/api` como proxy, as chamadas ficam na mesma origem e o CORS normalmente não atrapalha — mas manter configurado é recomendado.

---

## Rodando o projeto em DESENVOLVIMENTO (DEV)

### 1) Clonar o repositório

```bash
git clone https://github.com/edersonborges/frigorita-api.git
cd frigorita-api
```

### 2) Instalar dependências

```bash
npm install
```

### 3) Subir o banco com Docker


```bash
docker compose up -d
```

### 4) Rodar migrations e gerar Prisma Client

**Se a API está rodando local (fora do docker):**

```bash
npx prisma migrate dev
npx prisma generate
```

**Se a API está rodando dentro do docker (recomendado no seu setup atual):**

```bash
docker compose exec api npx prisma migrate dev -n init
docker compose exec api npx prisma generate
```

### 5) Rodar a API (DEV)

**Local:**

```bash
npm run dev
```

**Ou via Docker:**

```bash
docker compose up -d --build api
```

### 6) Swagger

- `http://localhost:5003/api-docs`

---

## Rodando em PRODUÇÃO (servidor privado / rede interna)

A recomendação é subir **front + api + db** via `docker-compose.prod.yml`.

### 1) No servidor, subir os containers

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

### 2) Aplicar migrations em produção

Em produção, prefira `migrate deploy`:

```bash
docker compose -f docker-compose.prod.yml exec api npx prisma migrate deploy
docker compose -f docker-compose.prod.yml exec api npx prisma generate
```

### 3) Acessar pela rede

- Front: `http://IP_DO_SERVIDOR/`
- API (via proxy): `http://IP_DO_SERVIDOR/api/...`
- Swagger: `http://IP_DO_SERVIDOR/api-docs`

---

## Atualizações comuns

### Alterei código (backend)

Se estiver em docker:

```bash
docker compose restart api
```

Se mudou dependências:

```bash
docker compose exec api npm install
docker compose restart api
```

### Alterei schema Prisma

**Dev (dentro do docker):**

```bash
docker compose exec api npx prisma migrate dev -n nome_da_migration
docker compose exec api npx prisma generate
```

**Produção:**

```bash
docker compose -f docker-compose.prod.yml exec api npx prisma migrate deploy
docker compose -f docker-compose.prod.yml exec api npx prisma generate
```

---

## Scripts Disponíveis

- `npm run dev`: executa a aplicação em modo desenvolvimento (hot reload).
- `npm run build`: compila TypeScript.
- `npm run start`: roda build compilado.
- `npm run swagger-autogen`: gera o `swagger_output.json`.
- `npx prisma migrate dev`: cria/aplica migrações (dev).
- `npx prisma migrate deploy`: aplica migrações existentes (produção).
- `npx prisma generate`: gera Prisma Client.

---

## Tecnologias Utilizadas

- Node.js + Express
- TypeScript
- Prisma
- PostgreSQL
- Swagger
- Docker / Docker Compose
