import { ref } from 'vue';
import type { Funcionario } from '../types/Funcionario';

export function useFuncionarioForm(initialData?: Funcionario | null) {
  const formData = ref<Funcionario>({
    cpf: '',
    name: '',
    email: '',
    tamanho_camiseta: '',
    tamanho_calcado: '',
  });

  const errors = ref<Record<string, string>>({});
  const loading = ref(false);

  const tamanhosCamiseta = ['PP', 'P', 'M', 'G', 'GG', 'XG'];
  const tamanhosCalcado = Array.from({ length: 21 }, (_, i) => (i + 33).toString());

  const resetForm = () => {
    formData.value = {
      cpf: '',
      name: '',
      email: '',
      tamanho_camiseta: '',
      tamanho_calcado: '',
    };
    errors.value = {};
  };

  const loadFuncionario = (funcionario: Funcionario | null | undefined) => {
    if (funcionario) {
      formData.value = { ...funcionario };
    } else {
      resetForm();
    }
  };

  const formatCPF = () => {
    let value = formData.value.cpf.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }
    
    formData.value.cpf = value;
  };

  const validateForm = (): boolean => {
    errors.value = {};
    
    if (!formData.value.cpf) {
      errors.value.cpf = 'CPF é obrigatório';
    } else if (formData.value.cpf.replace(/\D/g, '').length !== 11) {
      errors.value.cpf = 'CPF deve ter 11 dígitos';
    }
    
    if (!formData.value.name) {
      errors.value.nome = 'Nome é obrigatório';
    }
    
    if (!formData.value.email) {
      errors.value.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
      errors.value.email = 'E-mail inválido';
    }
    
    if (!formData.value.tamanho_camiseta) {
      errors.value.tamanho_camiseta = 'Tamanho de camiseta é obrigatório';
    }
    
    if (!formData.value.tamanho_calcado) {
      errors.value.tamanho_calcado = 'Tamanho de calçado é obrigatório';
    }
    
    return Object.keys(errors.value).length === 0;
  };

  if (initialData) {
    loadFuncionario(initialData);
  }

  return {
    formData,
    errors,
    loading,
    tamanhosCamiseta,
    tamanhosCalcado,
    
    resetForm,
    loadFuncionario,
    formatCPF,
    validateForm,
  };
}
