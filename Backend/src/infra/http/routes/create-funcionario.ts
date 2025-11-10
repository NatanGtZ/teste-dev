import { createFuncionario, createFuncionarioInput } from "@/app/functions/create-funcionario";
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

export const createFuncionarioRoute: FastifyPluginAsyncZod = async server => {
  server.post('/funcionarios', 
    {
      schema: {
        summary: 'Create funcionario',
        description: 'Cria um novo funcionário',
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