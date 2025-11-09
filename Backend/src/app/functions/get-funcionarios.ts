import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { asc, and, count, desc, ilike, or } from 'drizzle-orm'
import { z } from 'zod'

const getFuncionariosInput = z.object({
  searchQuery: z.string().optional(),
  searchBy: z.enum(['cpf', 'nome', 'email', 'tamanho_camiseta', 'tamanho_calcado']).optional().default('nome'),
  sortBy: z.enum(['createdAt']).optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
})

type GetFuncionariosInput = z.input<typeof getFuncionariosInput>

export async function getFuncionarios(input: GetFuncionariosInput){
  
   const { searchQuery, searchBy, sortBy, sortDirection } =
    getFuncionariosInput.parse(input)

  let query = db.select({
    id: schema.funcionario.id,
    cpf: schema.funcionario.cpf,
    name: schema.funcionario.name,
    email: schema.funcionario.email,
    tamanho_camiseta: schema.funcionario.tamanho_camiseta,
    tamanho_calcado: schema.funcionario.tamanho_calcado,
    createdAt: schema.funcionario.created_at,
  }).from(schema.funcionario).$dynamic()
  

  if (searchQuery && searchQuery.trim() !== '') {
    const searchPattern = `%${searchQuery}%`
    
    switch (searchBy) {
      case 'cpf':
        query = query.where(ilike(schema.funcionario.cpf, searchPattern))
        break
      case 'nome':
        query = query.where(ilike(schema.funcionario.name, searchPattern))
        break
      case 'email':
        query = query.where(ilike(schema.funcionario.email, searchPattern))
        break
      case 'tamanho_camiseta':
        query = query.where(ilike(schema.funcionario.tamanho_camiseta, searchPattern))
        break
      case 'tamanho_calcado':
        query = query.where(ilike(schema.funcionario.tamanho_calcado, searchPattern))
        break
    }
  }
  
  // Aplica ordenação se especificada
  if (sortBy && sortDirection) {
    const orderFn = sortDirection === 'asc' ? asc : desc
    query = query.orderBy(orderFn(schema.funcionario.created_at))
  }

  const funcionarios = await query

  return funcionarios
}