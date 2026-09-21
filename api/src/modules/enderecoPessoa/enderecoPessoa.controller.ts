import type {FastifyRequest, FastifyReply} from "fastify";
import { criarEnderecoPessoaSchema, type EnderecoPessoaSchema } from "./enderecoPessoa.schema";
import { enderecoPessoaService } from "./endrecoPessoa.service";

export const enderecoPessoaController = {
    async criar(request: FastifyRequest, reply: FastifyReply): Promise<EnderecoPessoaSchema>{
        const dados = criarEnderecoPessoaSchema.parse(request.body);
        const enderecoPessoa = await enderecoPessoaService.criar(dados);
        return reply.status(201).send(enderecoPessoa);
    },

    async listarTodos(_: FastifyRequest, reply: FastifyReply): Promise<EnderecoPessoaSchema[]>{
        return reply.status(200).send(await enderecoPessoaService.listarTodos())
    }
}