import { db, pg } from './index'
import { schema } from './schemas'

async function seed() {
  console.log('🌱 Seeding database...')

  const funcionarios = [
    {
      name: 'João Silva',
      cpf: '123.456.789-00',
      email: 'joao.silva@email.com',
      tamanho_camiseta: 'M',
      tamanho_calcado: '42',
    },
    {
      name: 'Maria Santos',
      cpf: '234.567.890-11',
      email: 'maria.santos@email.com',
      tamanho_camiseta: 'P',
      tamanho_calcado: '36',
    },
    {
      name: 'Pedro Oliveira',
      cpf: '345.678.901-22',
      email: 'pedro.oliveira@email.com',
      tamanho_camiseta: 'G',
      tamanho_calcado: '43',
    },
    {
      name: 'Ana Costa',
      cpf: '456.789.012-33',
      email: 'ana.costa@email.com',
      tamanho_camiseta: 'M',
      tamanho_calcado: '37',
    },
    {
      name: 'Carlos Ferreira',
      cpf: '567.890.123-44',
      email: 'carlos.ferreira@email.com',
      tamanho_camiseta: 'GG',
      tamanho_calcado: '44',
    },
    {
      name: 'Juliana Almeida',
      cpf: '678.901.234-55',
      email: 'juliana.almeida@email.com',
      tamanho_camiseta: 'P',
      tamanho_calcado: '35',
    },
    {
      name: 'Ricardo Souza',
      cpf: '789.012.345-66',
      email: 'ricardo.souza@email.com',
      tamanho_camiseta: 'M',
      tamanho_calcado: '41',
    },
    {
      name: 'Fernanda Lima',
      cpf: '890.123.456-77',
      email: 'fernanda.lima@email.com',
      tamanho_camiseta: 'G',
      tamanho_calcado: '38',
    },
    {
      name: 'Roberto Martins',
      cpf: '901.234.567-88',
      email: 'roberto.martins@email.com',
      tamanho_camiseta: 'GG',
      tamanho_calcado: '45',
    },
    {
      name: 'Camila Rocha',
      cpf: '012.345.678-99',
      email: 'camila.rocha@email.com',
      tamanho_camiseta: 'M',
      tamanho_calcado: '37',
    },
  ]

  await db.insert(schema.funcionario).values(funcionarios)

  console.log('✅ Seeding completed!')
  console.log(`📊 Inserted ${funcionarios.length} funcionários`)
}

seed()
  .catch((error) => {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await pg.end()
    process.exit(0)
  })
