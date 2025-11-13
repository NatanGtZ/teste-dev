# Sistema web simples para o Grupo Dass, destinada ao gerenciamento do cadastro de tamanhos de calçados e camisetas dos funcionários, visando a distribuição de brindes no final do ano.

Gestão de funcionários com frontend em Vue.js, backend em Node.js/Fastify e PostgreSQL.

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
    - Backend Docs: http://localhost:3333/docs -- Docs backend com swagger


