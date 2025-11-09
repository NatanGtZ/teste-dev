<template>
  <Dialog 
    v-model:visible="isVisible" 
    :header="isEditMode ? 'Editar Funcionário' : 'Novo Funcionário'"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeModal"
  >
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="field">
        <label for="cpf">CPF *</label>
        <InputText 
          id="cpf" 
          v-model="formData.cpf" 
          placeholder="000.000.000-00"
          :class="{ 'p-invalid': errors.cpf }"
          @input="formatCPF"
        />
        <small v-if="errors.cpf" class="p-error">{{ errors.cpf }}</small>
      </div>

      <div class="field">
        <label for="nome">Nome *</label>
        <InputText 
          id="nome" 
          v-model="formData.name" 
          placeholder="Nome completo"
          :class="{ 'p-invalid': errors.nome }"
        />
        <small v-if="errors.nome" class="p-error">{{ errors.nome }}</small>
      </div>

      <div class="field">
        <label for="email">E-mail *</label>
        <InputText 
          id="email" 
          v-model="formData.email" 
          type="email"
          placeholder="email@exemplo.com"
          :class="{ 'p-invalid': errors.email }"
        />
        <small v-if="errors.email" class="p-error">{{ errors.email }}</small>
      </div>

      <div class="field">
        <label for="camiseta">Tamanho de Camiseta *</label>
        <Select 
          id="camiseta" 
          v-model="formData.tamanho_camiseta"
          :options="tamanhosCamiseta"
          placeholder="Selecione"
          :class="{ 'p-invalid': errors.tamanho_camiseta }"
        />
        <small v-if="errors.tamanho_camiseta" class="p-error">{{ errors.tamanho_camiseta }}</small>
      </div>

      <div class="field">
        <label for="calcado">Tamanho de Calçado *</label>
        <Select 
          id="calcado" 
          v-model="formData.tamanho_calcado"
          :options="tamanhosCalcado"
          placeholder="Selecione"
          :class="{ 'p-invalid': errors.tamanho_calcado }"
        />
        <small v-if="errors.tamanho_calcado" class="p-error">{{ errors.tamanho_calcado }}</small>
      </div>

      <div class="button-group">
        <Button 
          label="Cancelar" 
          severity="secondary" 
          @click="closeModal" 
          type="button"
        />
        <Button 
          :label="isEditMode ? 'Atualizar' : 'Cadastrar'" 
          type="submit"
          :loading="loading"
        />
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Button from 'primevue/button';
import type { Funcionario } from '../types/Funcionario';

interface Props {
  visible: boolean;
  funcionario?: Funcionario | null;
}

interface Emits {
  (e: 'update:visible', value: boolean): void;
  (e: 'save', funcionario: Funcionario): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isVisible = ref(props.visible);
const loading = ref(false);
const isEditMode = ref(false);

const resetForm = () => {
  formData.value = {
    cpf: '',
    nome: '',
    email: '',
    tamanho_camiseta: '',
    tamanho_calcado: '',
  };
  errors.value = {};
};

const formData = ref<Funcionario>({
  cpf: '',
  nome: '',
  email: '',
  tamanho_camiseta: '',
  tamanho_calcado: '',
});

const errors = ref<Record<string, string>>({});

const tamanhosCamiseta = ['PP', 'P', 'M', 'G', 'GG', 'XG'];
const tamanhosCalcado = Array.from({ length: 21 }, (_, i) => (i + 33).toString());

watch(() => props.visible, (newVal) => {
  isVisible.value = newVal;
});

watch(() => props.funcionario, (newVal) => {
  if (newVal) {
    isEditMode.value = true;
    formData.value = { ...newVal };
  } else {
    isEditMode.value = false;
    resetForm();
  }
}, { immediate: true });

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
  
  if (!formData.value.nome) {
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

const handleSubmit = () => {
  if (!validateForm()) return;
  
  loading.value = true;
  emit('save', { ...formData.value });
  loading.value = false;
};

const closeModal = () => {
  emit('update:visible', false);
  resetForm();
};

</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 0;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field label {
  font-weight: 600;
  color: #495057;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}

.p-error {
  color: #e24c4c;
  font-size: 0.875rem;
}
</style>
