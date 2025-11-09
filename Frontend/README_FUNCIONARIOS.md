# Sistema de Gestão de Funcionários - Frontend

Aplicação Vue 3 + TypeScript para cadastro e gerenciamento de funcionários.

## 🚀 Tecnologias Utilizadas

- **Vue 3** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **PrimeVue** - Biblioteca de componentes UI
- **Axios** - Cliente HTTP para requisições à API
- **Vite** - Build tool e dev server

## 📋 Funcionalidades

- ✅ Listar funcionários em uma tabela responsiva
- ✅ Cadastrar novos funcionários
- ✅ Editar dados de funcionários existentes
- ✅ Excluir funcionários com confirmação
- ✅ Validação de formulários
- ✅ Notificações toast para feedback ao usuário
- ✅ Formatação automática de CPF

## 📦 Instalação

```bash
npm install
```

## 🔧 Configuração da API

A aplicação usa Axios para comunicação com a API. Configure a URL base da API no arquivo:

**`src/services/api.ts`**

```typescript
const API_BASE_URL = 'http://localhost:3000/api';
```

### Endpoints esperados pela API:

A API deve implementar os seguintes endpoints:

```
GET    /api/funcionarios       - Listar todos os funcionários
GET    /api/funcionarios/:id   - Buscar funcionário por ID
POST   /api/funcionarios       - Criar novo funcionário
PUT    /api/funcionarios/:id   - Atualizar funcionário
DELETE /api/funcionarios/:id   - Excluir funcionário
```

### Estrutura de dados do Funcionário:

```typescript
{
  id?: number;
  cpf: string;
  nome: string;
  email: string;
  tamanho_camiseta: string; // PP, P, M, G, GG, XG
  tamanho_calcado: string;  // 33 a 53
}
```

## 🎯 Exemplo de Backend com Express.js

Se você ainda não tem uma API, aqui está um exemplo básico com Express:

```javascript
// Backend exemplo com Express.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let funcionarios = [];
let nextId = 1;

// Listar todos
app.get('/api/funcionarios', (req, res) => {
  res.json(funcionarios);
});

// Buscar por ID
app.get('/api/funcionarios/:id', (req, res) => {
  const funcionario = funcionarios.find(f => f.id === parseInt(req.params.id));
  if (!funcionario) return res.status(404).json({ message: 'Funcionário não encontrado' });
  res.json(funcionario);
});

// Criar
app.post('/api/funcionarios', (req, res) => {
  const funcionario = { id: nextId++, ...req.body };
  funcionarios.push(funcionario);
  res.status(201).json(funcionario);
});

// Atualizar
app.put('/api/funcionarios/:id', (req, res) => {
  const index = funcionarios.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Funcionário não encontrado' });
  funcionarios[index] = { ...funcionarios[index], ...req.body };
  res.json(funcionarios[index]);
});

// Excluir
app.delete('/api/funcionarios/:id', (req, res) => {
  const index = funcionarios.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Funcionário não encontrado' });
  funcionarios.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});
```

## ▶️ Executar o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── FuncionarioModal.vue   # Modal para cadastro/edição
├── services/
│   ├── api.ts                  # Configuração do Axios
│   └── funcionarioService.ts   # Serviço de API para funcionários
├── types/
│   └── Funcionario.ts          # Interface TypeScript
├── App.vue                     # Componente principal
├── main.ts                     # Entrada da aplicação
└── style.css                   # Estilos globais
```

## 🎨 Componentes e Recursos

### FuncionarioModal
- Formulário com validação
- Formatação automática de CPF
- Selects para tamanhos de camiseta e calçado
- Modo criação e edição

### App.vue
- DataTable com paginação
- Botões de ação (editar/excluir)
- Confirmação de exclusão
- Toast notifications
- Carregamento dos dados

## 🔒 Validações Implementadas

- CPF obrigatório e com 11 dígitos
- Nome obrigatório
- E-mail obrigatório e com formato válido
- Tamanho de camiseta obrigatório
- Tamanho de calçado obrigatório

## 🌐 CORS

Certifique-se de que sua API permite requisições do frontend. Se usar Express, instale e configure o CORS:

```bash
npm install cors
```

```javascript
const cors = require('cors');
app.use(cors());
```

## 📝 Notas

- O projeto usa PrimeVue para componentes UI, garantindo uma interface moderna e responsiva
- Axios está configurado com timeout de 10 segundos e interceptors para tratamento de erros
- Todos os componentes são tipados com TypeScript para maior segurança

## 🤝 Suporte

Para dúvidas ou problemas, verifique:
1. Se a API está rodando na URL configurada
2. Se o CORS está habilitado na API
3. O console do navegador para erros
4. O terminal do backend para logs de requisições
