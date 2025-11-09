
import { getFuncionarios } from '@/app/functions/get-funcionarios';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getFuncionariosRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/funcionarios',
    {
      schema: {
        summary: 'Get funcionarios',
        tags: ['funcionarios'],
        querystring: z.object({
          searchQuery: z.string().optional(),
          searchBy: z.enum(['cpf', 'nome', 'email', 'tamanho_camiseta', 'tamanho_calcado']).optional().default('nome'),
          sortBy: z.enum(['createdAt']).optional(),
          sortDirection: z.enum(['asc', 'desc']).optional(),
        }),
        response: {
          200: z.object({
            funcionarios: z.array(
              z.object({
                id: z.string(),
                cpf: z.string(),
                name: z.string(),
                email: z.string(),
                tamanho_camiseta: z.string(),
                tamanho_calcado: z.string(),
                createdAt: z.coerce.string(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { searchQuery, searchBy, sortBy, sortDirection} = request.query;

      const result = await getFuncionarios({
        searchQuery,
        searchBy,
        sortBy,
        sortDirection,
      })

      return reply.status(200).send({ funcionarios: result })
    }
  )
}
