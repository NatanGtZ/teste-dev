import axios from 'axios';

// Configure a URL base da sua API aqui
const API_BASE_URL = 'http://localhost:3333/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // timeout de 10 segundos
});

// Interceptor para tratamento de erros global (opcional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

export default api;
