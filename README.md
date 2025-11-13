# Sistema web simples para o Grupo Dass, destinada ao gerenciamento do cadastro de tamanhos de calçados e camisetas dos funcionários, visando a distribuição de brindes no final do ano.

Gestão de funcionários com frontend em Vue.js, backend em Node.js/Fastify e PostgreSQL, totalmente dockerizado.

## Passos para subir o projeto com DOCKER
  ## Ter o docker instalado
  ## Ter o NodeJs versão 22 ou superior
  ## Ter o gerenciador de pacotes npm
  ## Criar o arquivo .env no backend com os seguintes valores
  ### Backend (.env)
    ```env
    DATABASE_URL=postgresql://docker:docker@localhost:5435/gestao_funcionarios
    NODE_ENV=development
    ```
  ## Criar o arquivo .env no frontend com os seguintes valores
  ### Frontend
      ```env
      VITE_API_BASE_URL=http://localhost:3000
      ```
  ## Entrar na pasta Backend, e executar o comando:
  ```
    cd Backend
    npm install
  ```
  ## Na pasta raiz do projeto executar o comando: 
  ```
    docker-compose up --build -d
  ```
  ## Entrar na pasta Backend e rodas os seguintes comandos: 
  ```
  cd Backend
  npm run db:migrate -- Gerar as migrações no banco de dados
  npm run db:seed -- Inserir dados para exemplificação
  ```
  ## Acessar as seguintes URL's no navegador: 
   **URLs:**
    - Frontend: http://localhost:5173 -- Frontend
    - Backend Docs: http://localhost:3000/docs -- Docs backend com swagger

## Passos para subir o projeto SEM DOCKER
  ## Ter o NodeJs versão 22 ou superior
  ## Ter o gerenciador de pacotes npm
  ## Ter o postgres/pgAdmin
    ## Criar o arquivo .env no backend com os seguintes valores
  ### Backend (.env)
    ```env
    Verificar a versão do postgres antes de colocar a porta(5432/5433).
    Principalmente se houver mais de um versão do docker instalada

    DATABASE_URL=postgresql://postgres:sua_senha@localhost:5432/gestao_funcionarios
    NODE_ENV=development
    ```
  ## Criar o arquivo .env no frontend com os seguintes valores
  ### Frontend
      ```env
      VITE_API_BASE_URL=http://localhost:3333
      ```
  ## Entrar na pasta Backend e frontend, e executar o comando:
  ```
    cd Backend/ cd Frontend
    npm install
  ```
  ## No pgAdmin criar um banco de dados com Nome = gestao_funcionarios 
  ## Entrar na pasta Backend e rodas os seguintes comandos: 
  ```
  cd Backend
  npm run db:migrate -- Gerar as migrações no banco de dados
  npm run db:seed -- Inserir dados para exemplificação
  ```
  ## Entrar na pasta Backend e Fronted e rodas os seguintes comandos: 
  ```
  cd Backend
  npm run dev
  cd Frontend
  npm run dev
  ```
  ## Acessar as seguintes URL's no navegador: 
   **URLs:**
    - Frontend: http://localhost:5173 -- Frontend
    - Backend Docs: http://localhost:3000/docs -- Docs backend com swagger


**URLs do Projeto:**
- Frontend: http://localhost (porta 5173)
- Backend API: http://localhost:3000/docs
- PostgreSQL: localhost:5435

## 📦 Estrutura do Projeto

```
TesteDevWeb/
├── Backend/              # API Node.js + Fastify + Drizzle ORM
│   ├── src/
│   │   ├── app/         # Lógica de negócio
│   │   └── infra/       # Infraestrutura (DB, HTTP)
│   ├── Dockerfile
│   └── package.json
├── Frontend/             # Vue.js 3 + Vite + PrimeVue
│   ├── src/
│   │   ├── components/  # Componentes Vue
│   │   ├── services/    # Serviços de API
│   │   └── types/       # Tipos TypeScript
│   └── Dockerfile
│ 
│   
├── docker-compose.yml       # Desenvolvimento
└── README.md         # Documentação detalhada
```

## 🛠️ Tecnologias

### Backend
- **Node.js** 22.14.0
- **Fastify** - Framework
- **Drizzle ORM** - ORM TypeScript
- **PostgreSQL** - Banco de dados
- **Zod** - Validação de schemas
- **TypeScript** - Tipagem

### Frontend
- **Vue.js 3** - Framework
- **Vite** - Build tool
- **PrimeVue** - Biblioteca de componentes UI
- **Axios** - Client HTTP
- **TypeScript** - Tipagem

### Infraestrutura
- **Docker** - Containerização
- **Docker Compose** - Orquestração

## Endpoints da API

- `GET /funcionarios` - Listar todos os funcionários
- `POST /funcionarios` - Criar novo funcionário
- `PUT /funcionarios/:id` - Atualizar funcionário
- `DELETE /funcionarios/:id` - Deletar funcionário
- `GET /health` - Health check

Documentação completa: http://localhost:3000/docs

## Banco de Dados

**PostgreSQL** configurado com:
- Host: `postgres` (interno) / `localhost` (externo)
- Porta: 5435
- Usuário: `docker`
- Senha: `docker`
- Database: `gestao_funcionarios`

### Recriar containers do zero
```powershell
docker-compose down -v
docker-compose up --build --force-recreate
```


