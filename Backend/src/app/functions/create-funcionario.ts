import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { z } from 'zod'

export const createFuncionarioInput = z.object({
  cpf: z.string().min(11).max(14),
  name: z.string().min(1),
  email: z.email(),
  tamanho_camiseta: z.string().min(1),
  tamanho_calcado: z.string().min(1),
})

type CreateFuncionarioInput = z.input<typeof createFuncionarioInput>


export async function createFuncionario(input: CreateFuncionarioInput){

   var result = await db.insert(schema.funcionario).values({
    name: input.name,
    cpf: input.cpf,
    email: input.email,
    tamanho_camiseta: input.tamanho_camiseta,
    tamanho_calcado: input.tamanho_calcado,
  })

  

  return result
}