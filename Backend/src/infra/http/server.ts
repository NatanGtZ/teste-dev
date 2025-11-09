import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { getFuncionariosRoute } from './routes/get-funcionarios'
import { createFuncionarioRoute } from './routes/create-funcionario'
import { updateFuncionarioRoute } from './routes/update-funcionario'
import { deleteFuncionarioRoute } from './routes/delete-funcionario'

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifyCors, { 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Funcionários API',
      version: '1.0.0',
    },
  },
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(getFuncionariosRoute)
server.register(createFuncionarioRoute)
server.register(updateFuncionarioRoute)
server.register(deleteFuncionarioRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP Server running!')
})