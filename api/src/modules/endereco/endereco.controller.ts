import type{ FastifyRequest, FastifyReply  } from "fastify";
import { enderecoService } from "./endereco.service";
import type { CriarAtualizarEnderecoSchema, EnderecoSchema } from "./endereco.schema";

export const enderecoController = {
    async criar(request: FastifyRequest, reply: FastifyReply):Promise<CriarAtualizarEnderecoSchema | {sucesso: boolean, mensagem: string}>{
        const novoEndereco = request.body as CriarAtualizarEnderecoSchema;
        return await reply.status(201).send(enderecoService.criar(novoEndereco));
    },
    async listarTodos(_: FastifyRequest, reply: FastifyReply): Promise<EnderecoSchema[]>{
        return await reply.status(200).send(enderecoService.listarTodos());
    },

    async obterPorId(request: FastifyRequest, reply: FastifyReply): Promise<EnderecoSchema>{
        const { id } = request.params as {id: number};
        return await reply.status(200).send(enderecoService.obterPorId(id));
    },

    async obterPorRua(request: FastifyRequest, reply: FastifyReply): Promise<EnderecoSchema>{
        const {rua} =  request.params as {rua: string};
        return await reply.status(200).send(enderecoService.obterPorRua(rua));
    },

    async obterPorCidade(request: FastifyRequest, reply: FastifyReply): Promise<EnderecoSchema>{
        const {cidade} =  request.params as {cidade: string};
        return await reply.status(200).send(enderecoService.obterPorCidade(cidade));
    },

    async obterPorCep(request: FastifyRequest, reply: FastifyReply): Promise<EnderecoSchema>{
        const {cep} =  request.params as {cep: string};
        return await reply.status(200).send(enderecoService.obterPorCep(cep));
    },

    async atualizar(request: FastifyRequest, reply: FastifyReply): Promise<CriarAtualizarEnderecoSchema>{
        const {id, enderecoAtualizado} = request.body as {id: number, enderecoAtualizado: CriarAtualizarEnderecoSchema};
        return await  reply.status(204).send(enderecoService.atualizar(id, enderecoAtualizado));
    },

    async apagar(request: FastifyRequest, reply: FastifyReply): Promise<{sucesso: boolean, mensagem: string}>{
        const {id} = request.params as {id: number};
        return await reply.status(200).send(enderecoService.apagar(id));
    }
}

