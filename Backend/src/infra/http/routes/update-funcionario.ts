import { updateFuncionario } from "@/app/functions/update-funcionario";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from 'zod'

const funcionarioBodySchema = z.object({
  cpf: z.string().min(11).max(14),
  name: z.string().min(1),
  email: z.email(),
  tamanho_camiseta: z.string().min(1),
  tamanho_calcado: z.string().min(1),
});

export const updateFuncionarioRoute: FastifyPluginAsyncZod = async server => {
  server.put('/funcionarios/:id', 
    {
      schema: {
        summary: 'Update funcionario',
        description: 'Atualiza um funcionário existente no sistema',
        tags: ['Funcionarios'],
        body: funcionarioBodySchema,
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          200: z.null().describe('Funcionário atualizado com sucesso'),
          400: z.object({ message: z.string() }).describe('Erro ao atualizar funcionário'),
        },
      },
    },
    async (request, reply) => {

      const funcionario = request.body;

      const result = await updateFuncionario({
        id: request.params.id,
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