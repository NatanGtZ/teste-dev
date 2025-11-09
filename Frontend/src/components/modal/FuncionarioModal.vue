<script setup lang="ts">
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Button from 'primevue/button';
import type { Funcionario } from '../../types/Funcionario';
import { useFuncionarioForm } from '../../composables/useFuncionarioForm';

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

const {
  formData,
  errors,
  loading,
  tamanhosCamiseta,
  tamanhosCalcado,
  resetForm,
  loadFuncionario,
  formatCPF,
  validateForm,
} = useFuncionarioForm();

const isVisible = ref(props.visible);
const isEditMode = ref(false);

watch(() => props.visible, (newVal) => {
  isVisible.value = newVal;
});

watch(() => props.funcionario, (newVal) => {
  if (newVal) {
    isEditMode.value = true;
    loadFuncionario(newVal);
  } else {
    isEditMode.value = false;
    resetForm();
  }
}, { immediate: true });

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
          :class="{ 'p-invalid': errors.name }"
        />
        <small v-if="errors.name" class="p-error">{{ errors.name }}</small>
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

<style scoped>
  @import './FuncionarioModal.css';
</style>
