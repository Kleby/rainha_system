import type {FastifyRequest, FastifyReply, FastifyInstance} from "fastify"
import { produtoService } from "./produto.service"
import { criarProdutoSchema } from "./produto.schema"

export const produtoController = {
    async criar(request: FastifyRequest, reply: FastifyReply){
        const dados = criarProdutoSchema.parse(request.body);
        const produto = await produtoService.criar(dados);
        return reply.status(201).send(produto);
    },

    async listarTodos(_: FastifyRequest, reply:FastifyReply){
        const produtos = await produtoService.listarTodos();
        return reply.status(200).send(produtos)
    },

    async buscarPorId(request: FastifyRequest, reply: FastifyReply){
        const { id } = request.params as {id: number};
        const produto = await produtoService.buscarPorId(id);
        return reply.status(200).send(produto);
    }
}