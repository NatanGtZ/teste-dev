<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import FuncionarioModal from './components/FuncionarioModal.vue';
import { funcionarioService } from './services/funcionarioService';
import type { Funcionario } from './types/Funcionario';

const toast = useToast();
const confirm = useConfirm();

const funcionarios = ref<Funcionario[]>([]);
const loading = ref(false);
const modalVisible = ref(false);
const funcionarioSelecionado = ref<Funcionario | null>(null);

onMounted(() => {
  loadFuncionarios();
});

const loadFuncionarios = async () => {
  loading.value = true;
  try {
    funcionarios.value = await funcionarioService.getAll();
    console.log(funcionarios.value);
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Funcionários carregados com sucesso',
      life: 3000,
    });
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: error.response?.data?.message || 'Erro ao carregar funcionários',
      life: 5000,
    });
    console.error('Erro ao carregar funcionários:', error);
  } finally {
    loading.value = false;
  }
};

const openModalNovo = () => {
  funcionarioSelecionado.value = null;
  modalVisible.value = true;
};

const openModalEditar = (funcionario: Funcionario) => {
  funcionarioSelecionado.value = { ...funcionario };
  modalVisible.value = true;
};

const handleSave = async (funcionario: Funcionario) => {
  try {
    if (funcionario.id) {
      // Atualizar
      await funcionarioService.update(funcionario.id, funcionario);
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Funcionário atualizado com sucesso',
        life: 3000,
      });
    } else {
      // Criar
      await funcionarioService.create(funcionario);
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Funcionário cadastrado com sucesso',
        life: 3000,
      });
    }
    modalVisible.value = false;
    await loadFuncionarios();
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: error.response?.data?.message || 'Erro ao salvar funcionário',
      life: 5000,
    });
    console.error('Erro ao salvar funcionário:', error);
  }
};

const confirmarExclusao = (funcionario: Funcionario) => {
  confirm.require({
    message: `Tem certeza que deseja excluir o funcionário ${funcionario.name}?`,
    header: 'Confirmar Exclusão',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Excluir',
    accept: () => deleteFuncionario(funcionario.id!),
  });
};

const deleteFuncionario = async (id: number) => {
  try {
    await funcionarioService.delete(id);
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Funcionário excluído com sucesso',
      life: 3000,
    });
    await loadFuncionarios();
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: error.response?.data?.message || 'Erro ao excluir funcionário',
      life: 5000,
    });
    console.error('Erro ao excluir funcionário:', error);
  }
};
</script>

<template>
  <div class="app-container">
    <Toast />
    <ConfirmDialog />
    
    <div class="header">
      <h1>Gestão de Funcionários</h1>
      <Button 
        label="Novo Funcionário" 
        icon="pi pi-plus" 
        @click="openModalNovo"
        severity="success"
      />
    </div>

    <div class="table-container">
      <DataTable 
        :value="funcionarios" 
        :loading="loading"
        stripedRows
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        responsiveLayout="scroll"
        emptyMessage="Nenhum funcionário cadastrado"
      >
        <Column field="cpf" header="CPF" sortable></Column>
        <Column field="name" header="Nome" sortable></Column>
        <Column field="email" header="E-mail" sortable></Column>
        <Column field="tamanho_camiseta" header="Camiseta" sortable></Column>
        <Column field="tamanho_calcado" header="Calçado" sortable></Column>
        <Column header="Ações" :exportable="false">
          <template #body="slotProps">
            <div class="action-buttons">
              <Button 
                icon="pi pi-pencil" 
                severity="info"
                outlined
                rounded
                @click="openModalEditar(slotProps.data)"
                v-tooltip.top="'Editar'"
              />
              <Button 
                icon="pi pi-trash" 
                severity="danger"
                outlined
                rounded
                @click="confirmarExclusao(slotProps.data)"
                v-tooltip.top="'Excluir'"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <FuncionarioModal 
      v-model:visible="modalVisible"
      :funcionario="funcionarioSelecionado"
      @save="handleSave"
    />
  </div>
</template>

<style scoped>
.app-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 2rem;
}

.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

:deep(.p-datatable) {
  font-size: 0.95rem;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background: #f8f9fa;
  color: #495057;
  font-weight: 600;
  padding: 1rem;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 1rem;
}
</style>
