# Backend

## Estrutura do projeto

Este projeto está estruturado com base no padrão MVC. Todos os arquivos que contém tanto a lógica de negócios quanto os testes de unidade de services podem ser encontrados na pasta 'src'.

## Dependências

- Express
- Typeorm
- Postgres
- Docker
- Yarn

## Variavéis de ambiente

- PORT=5000
  - Porta onde o serviço vai ser iniciado
- TYPEORM_CONNECTION=postgres
  - Tipo da conexão
- TYPEORM_HOST=database|localhost
  - Ip do host, database caso seja com docker, localhost caso não esteja usando o docker
- TYPEORM_USERNAME=postgres
  - Tipo do user
- TYPEORM_PASSWORD=postgres
  - Senha de acesso
- TYPEORM_DATABASE=postgres
  - Nome do database
- TYPEORM_PORT=5432
  - Porta para conexão com o banco
- TYPEORM_LOGGING=true
  - Registro de consultas
- TYPEORM_ENTITIES="./src/models/\*.ts"
  - Local onde as modeles estão localizadas
- TYPEORM_MIGRATIONS="./src/database/migrations/\*.ts"
  - Local onde as migrations estão localizadas
- TYPEORM_MIGRATIONS_DIR="./src/database/migrations"
  - Diretório onde esta localizadas as migrations
- FOLDER_IMAGE="./src/util/image"
  - Diretório onde as imagens estão sendo salvas
- POSTGRES_USER=postgres
  - Mesmo utilizado no typeorm
- POSTGRES_PASSWORD=postgres
  - Mesmo utilizado no typeorm
- POSTGRES_DB=postgres
  - Mesmo utilizado no typeorm

## Rotas

[Criar cidade](./src/docs/create_city.md)

[Buscar cidade por id](./src/docs/get_city_by_id.md)

[Buscar cidade por nome e/ou estado](./src/docs/get_cities_by_query_params.md)

[Criar cliente](./src/docs/create_client.md)

[Buscar cliente por id](./src/docs/get_city_by_id.md)

[Buscar cliente por nome](./src/docs/get_client_by_name.md)

[Atualizar nome do cliente](./src/docs/update_name_client.md)

[Deletar cliente](./src/docs/delete_client.md)

## Instalação com docker no Linux

1. Instale o `docker` e o `docker-compose`.
2. clone este repositório:

   ```shell
   git clone https://github.com/yuregl/backendCuol.git
   cd backendCuol
   ```

3. Crie um arquivo chamado .env com o conteúdo de `.env.example` e preencha os campos:

   ```shell
   cp .env.example .env
   vi .env
   ```

4. Crie um arquivo chamado database.env com o conteúdo de `database.example.env` e preencha os campos:

   ```shell
   cp database.example.env database.env
   vi .env
   ```

5. Crie e levante o container usando o `docker-compose`:

   ```
   docker-compose up -d
   ```

6. Testes

   ```
     yarn test
   ```

7. Para acessar o serviço `http://localhost:${PORT_SERVER}`.

### Pré-requisitos

- É necessário possuir o Postgres v12
- Node 16

1. Clone este repósitorio:

   ```shell
   git clone https://github.com/yuregl/backendCuol.git
   cd backendCuol
   ```

2. Crie um arquivo chamado `.env` com o conteúdo de `.env.example` e preencha os campos:

   ```shell
   cp .env.example .env
   vi .env
   ```

3. Crie um arquivo chamado database.env com o conteúdo de `database.example.env` e preencha os campos:

   ```shell
   cp database.example.env database.env
   vi .env
   ```

4. Instale as dependencias do projeto:

   ```shell
     yarn
   ```

5. Rode o serviço

   ```
     yarn start
   ```

6. Testes

   ```
     yarn test
   ```

7. Para acessar o serviço `http://localhost:${PORT_SERVER}`.
