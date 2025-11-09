import api from './api';
import type { Funcionario } from '../types/Funcionario';

export const funcionarioService = {
  // Listar todos os funcionários
  async getAll(): Promise<Funcionario[]> {
    const response = await api.get('/funcionarios');
    console.log("chegou aqui")
    return response.data.funcionarios;
  },

  // Buscar um funcionário por ID
  async getById(id: number): Promise<Funcionario> {
    const response = await api.get(`/funcionarios/${id}`);
    return response.data;
  },

  // Criar novo funcionário
  async create(funcionario: Funcionario): Promise<Funcionario> {
    const response = await api.post('/funcionarios', funcionario);
    return response.data;
  },

  // Atualizar funcionário existente
  async update(id: number, funcionario: Funcionario): Promise<Funcionario> {
    const response = await api.put(`/funcionarios/${id}`, funcionario);
    return response.data;
  },

  // Deletar funcionário
  async delete(id: number): Promise<void> {
    await api.delete(`/funcionarios/${id}`);
  },
};
