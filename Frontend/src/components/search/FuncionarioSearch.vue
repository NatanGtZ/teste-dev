<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

interface SearchEmit {
  searchQuery: string;
  searchBy: string;
}

const emit = defineEmits<{
  search: [value: SearchEmit];
  clear: [];
}>();

const searchQuery = ref('');
const searchBy = ref('nome');

const searchOptions = [
  { label: 'Nome', value: 'nome' },
  { label: 'CPF', value: 'cpf' },
  { label: 'E-mail', value: 'email' },
  { label: 'Tamanho Camiseta', value: 'tamanho_camiseta' },
  { label: 'Tamanho Calçado', value: 'tamanho_calcado' },
];

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', {
      searchQuery: searchQuery.value.trim(),
      searchBy: searchBy.value,
    });
  } else {
    searchQuery.value = '';
    searchBy.value = 'nome';
    emit('clear');
  }
};

const handleClear = () => {
  searchQuery.value = '';
  searchBy.value = 'nome';
  emit('clear');
};

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
};
</script>

<template>
  <div class="search-container">
    <div class="search-wrapper">
      <div class="search-field">
        <label for="searchType">Buscar por</label>
        <Dropdown 
          id="searchType"
          v-model="searchBy" 
          :options="searchOptions" 
          optionLabel="label" 
          optionValue="value"
          placeholder="Selecione o tipo de busca"
          class="search-dropdown"
        />
      </div>
      
      <div class="search-field search-input-field">
        <label for="searchQuery">Pesquisar</label>
        <InputText 
          id="searchQuery"
          v-model="searchQuery" 
          placeholder="Digite para pesquisar..."
          class="search-input"
          @keypress="handleKeyPress"
        />
      </div>
      
      <div class="search-buttons">
        <Button 
          label="Buscar" 
          icon="pi pi-search" 
          @click="handleSearch"
          severity="primary"
        />
        <Button 
          label="Limpar" 
          icon="pi pi-times" 
          @click="handleClear"
          severity="secondary"
          outlined
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import './FuncionarioSearch.css';
</style>
