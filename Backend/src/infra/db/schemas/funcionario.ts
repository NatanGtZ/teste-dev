import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const funcionario = pgTable('funcionario', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: text('name').notNull(),
  cpf: text('cpf').notNull(),
  email: text('email').notNull(),
  tamanho_camiseta: text('tamanho_camiseta').notNull(),
  tamanho_calcado: text('tamanho_calcado').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),  
})
