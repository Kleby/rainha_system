import type {FastifyRequest, FastifyReply} from "fastify"
import { produtoService } from "./produto.service"
import { criarProdutoSchema } from "./produto.schema";
import type { IProduto } from "./produto.model";


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
    },

    async apagar(request: FastifyRequest, reply: FastifyReply){
        const { id } = request.query as {id: number};
        const resultado = await produtoService.remover(id);
        if(!resultado.sucesso){
            return reply.status(404).send(resultado);
        }
        return reply.status(200).send(resultado);
    },

    async atualizar(request: FastifyRequest, reply: FastifyReply){
        const {id, produto} = request.body as {id: number, produto:IProduto};
        console.log(id, produto);
        console.log("OK");
        
        
        const resultado = await produtoService.atualizar(id, produto);
        if(!resultado){
            return reply.status(404).send({
                sucesso: false,
                mensagem: "Não foi possivel Atualizar o registro"
            });
        };
        return reply.status(200).send(resultado);
    }
}