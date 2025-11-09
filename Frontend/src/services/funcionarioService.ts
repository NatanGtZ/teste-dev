import api from './api';
import type { Funcionario } from '../types/Funcionario';

export const funcionarioService = {
  async getAll(): Promise<Funcionario[]> {
    const response = await api.get('/funcionarios');
    return response.data.funcionarios;
  },

  async getById(id: number): Promise<Funcionario> {
    const response = await api.get(`/funcionarios/${id}`);
    return response.data;
  },

  async create(funcionario: Funcionario): Promise<Funcionario> {
    const response = await api.post('/funcionarios', funcionario);
    return response.data;
  },

  async update(id: number, funcionario: Funcionario): Promise<Funcionario> {
    console.log("entrou no service")
    const response = await api.put(`/funcionarios/${id}`, funcionario);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/funcionarios/${id}`);
  },
};
