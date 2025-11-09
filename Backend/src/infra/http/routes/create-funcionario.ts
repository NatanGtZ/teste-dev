import { createFuncionario, createFuncionarioInput } from "@/app/functions/create-funcionario";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from 'zod'

const funcionarioBodySchema = z.object({
  cpf: z.string().min(11).max(14),
  name: z.string().min(1),
  email: z.email(),
  tamanho_camiseta: z.string().min(1),
  tamanho_calcado: z.string().min(1),
});

export const createFuncionarioRoute: FastifyPluginAsyncZod = async server => {
  server.post('/funcionarios', 
    {
      schema: {
        summary: 'Create funcionario',
        description: 'Cria um novo funcionário no sistema',
        tags: ['Funcionarios'],
        body: funcionarioBodySchema,
        response: {
          200: z.null().describe('Funcionário criado com sucesso'),
          400: z.object({ message: z.string() }).describe('Erro ao criar funcionário'),
        },
      },
    },
    async (request, reply) => {

      const funcionario = request.body;

      const result = await createFuncionario({
        cpf: funcionario.cpf,
        name: funcionario.name,
        email: funcionario.email,
        tamanho_camiseta: funcionario.tamanho_camiseta,
        tamanho_calcado: funcionario.tamanho_calcado,
      })

      return reply.status(200).send();
    }
  )
}