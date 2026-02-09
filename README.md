
# Template API - Projeto Node.js com TypeScript

Este projeto é uma API desenvolvida em Node.js com TypeScript, utilizando Prisma como ORM para manipulação de banco de dados e Express como framework para construção das rotas. O projeto está estruturado para facilitar a manutenção e escalabilidade, com separação entre rotas, controladores e serviços.

## Estrutura do Projeto

- **src/**: Contém os arquivos principais da aplicação (controladores, serviços, rotas, middlewares).
  - **controllers/**: Controladores que processam as requisições e retornam respostas.
  - **services/**: Lógica de negócio da aplicação.
  - **routes/**: Definições das rotas e sua vinculação aos controladores.
  - **middlewares/**: Middleware para tratamento de erros e autenticação.
  - **configs/**: Configurações do projeto (ex: porta, variáveis de ambiente).
  - **utils/**: Funções utilitárias como validação de dados e gerenciamento de datas.
- **prisma/**: Configurações e migrações do Prisma para o banco de dados.
- **swagger_output.json**: Arquivo gerado para documentação da API via Swagger.
- **package.json**: Gerenciamento de dependências e scripts de execução.
- **docker-compose.yml**: Arquivo de configuração Docker para criar o ambiente do banco de dados e outras dependências.

## Requisitos

- **Node.js** (versão especificada no `.nvmrc`)
- **Docker** (opcional, para executar o banco de dados via Docker Compose)
- **Prisma** (instalado como dependência no projeto)

## Configuração e Execução

### 1. Clonar o Repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
cd NOME_DO_REPOSITORIO
```

### 2. Instalar Dependências

Instale as dependências do projeto usando npm:

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias. Exemplo:

```
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
PORT=5003
```

### 4. Executar Banco de Dados com Docker (Opcional)

Se desejar usar o banco de dados via Docker, execute:

```bash
docker-compose up -d
```

### 5. Gerar a Documentação com Swagger

Para gerar a documentação Swagger, o projeto já possui um arquivo `swagger_output.json`. Caso você precise regenerar, execute:

```bash
npm run swagger-autogen
```

### 6. Rodar as Migrações do Prisma

Antes de executar a aplicação, é importante aplicar as migrações do Prisma para garantir que o banco de dados esteja na estrutura correta:

```bash
npx prisma migrate dev
```

### 7. Executar o Projeto

Para rodar o projeto em modo de desenvolvimento:

```bash
npm run dev
```

A API estará disponível em `http://localhost:5003`.

### 8. Acessar a Documentação da API

A documentação da API gerada pelo Swagger estará disponível em:

```
http://localhost:5003/api-docs
```

## Scripts Disponíveis

- **`npm run dev`**: Executa a aplicação em modo de desenvolvimento com `nodemon`.
- **`npm run build`**: Compila os arquivos TypeScript para JavaScript.
- **`npm run start`**: Executa a versão compilada do projeto.
- **`npm run swagger-autogen`**: Gera a documentação da API no arquivo `swagger_output.json`.
- **`npm run prisma-generate`**: Gera os clientes Prisma a partir do schema.

## Tecnologias Utilizadas

- **Node.js** e **Express**: Backend da API.
- **TypeScript**: Tipagem estática para JavaScript.
- **Prisma**: ORM para banco de dados relacional.
- **Swagger**: Geração de documentação da API.
- **Docker**: Ambiente de execução para o banco de dados.
- **Nodemon**: Ferramenta para desenvolvimento com recarga automática.