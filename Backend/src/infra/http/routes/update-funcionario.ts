import { updateFuncionario } from "@/app/functions/update-funcionario";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from 'zod'

const funcionarioBodySchema = z.object({
  cpf: z.string()
    .length(11, { message: "CPF deve ter exatamente 11 dígitos" })
    .regex(/^\d+$/, { message: "CPF deve conter apenas números" }),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.email({ message: "E-mail inválido" }),
  tamanho_camiseta: z.enum(['P', 'M', 'G', 'GG'], {
    message: "Tamanho de camiseta deve ser P, M, G ou GG"
  }),
  tamanho_calcado: z.string()
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 33 && num <= 53;
    }, { message: "Tamanho de calçado deve estar entre 33 e 53" }),
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