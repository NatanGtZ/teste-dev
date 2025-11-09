import { deleteFuncionario } from "@/app/functions/delete-funcionario";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from 'zod'

export const deleteFuncionarioRoute: FastifyPluginAsyncZod = async server => {
  server.delete('/funcionarios/:id', 
    {
      schema: {
        summary: 'Delete funcionario',
        description: 'Exclui um funcionário',
        tags: ['Funcionarios'],
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

      const result = await deleteFuncionario(request.params.id);

      return reply.status(200).send();
    }
  )
}