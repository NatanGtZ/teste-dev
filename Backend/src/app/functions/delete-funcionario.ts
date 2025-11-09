import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
  

export async function deleteFuncionario(id: string){

   var result = await db.delete(schema.funcionario)
    .where(eq(schema.funcionario.id, id))

  return result
}