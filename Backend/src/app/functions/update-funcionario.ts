import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const updateFuncionarioInput = z.object({
  id: z.uuid(),
  cpf: z.string().min(11).max(14),
  name: z.string().min(1),
  email: z.email(),
  tamanho_camiseta: z.string().min(1),
  tamanho_calcado: z.string().min(1),
})

type UpdateFuncionarioInput = z.input<typeof updateFuncionarioInput>
  

export async function updateFuncionario(input: UpdateFuncionarioInput){

   var result = await db.update(schema.funcionario)
   .set({
    name: input.name,
    cpf: input.cpf,
    email: input.email,
    tamanho_camiseta: input.tamanho_camiseta,
    tamanho_calcado: input.tamanho_calcado,
  }).where(eq(schema.funcionario.id, input.id))

  return result
}