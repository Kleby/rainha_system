import type {FastifyReply, FastifyRequest} from "fastify";
import {produtoEstoqueService} from "./produtoEstoque.service";
import { criarProdutoEstoqueSchema } from "./produtoEstoque.schema";

interface IEstoqueIdProdutoId{
    estoqueId: number;
    produtoId: number;
}

export const produtoEstoqueController = {
    async criar(request: FastifyRequest, reply: FastifyReply){
        const dados = criarProdutoEstoqueSchema.parse(request.body);
        const produtoEstoque = await produtoEstoqueService.criar(dados);
        return reply.status(201).send(produtoEstoque);
    },

    async listarTodos(request: FastifyRequest, reply: FastifyReply){
        const produtoEstoque = await produtoEstoqueService.listarTodos();        
        return reply.status(200).send(produtoEstoque);
    },
    async obterPorId(request: FastifyRequest, reply: FastifyReply){
        const { estoqueId, produtoId } = request.params as {estoqueId: number, produtoId: number}
        const estoqueId_produtoId : IEstoqueIdProdutoId = {estoqueId, produtoId}
        
        const produtoEstoque =  await produtoEstoqueService.obterPorId(estoqueId_produtoId);
        return reply.status(200).send(produtoEstoque);
    },
    
    async atualizarQuantidade(request: FastifyRequest, reply: FastifyReply){
        const { estoqueId, produtoId, quantidade } = request.body as {estoqueId: number, produtoId: number, quantidade:number}
        const estoqueId_produtoId : IEstoqueIdProdutoId = {estoqueId, produtoId}
        const produtoEstoque =  await produtoEstoqueService.atualizarQuantidade(estoqueId_produtoId, quantidade);
        return reply.status(200).send(produtoEstoque);
    },
    async apagar(request: FastifyRequest, reply: FastifyReply){
        // curl -X DELETE "http://localhost:3000/api/v1/produto_estoque?estoqueId=1&produtoId=1"
        const { estoqueId, produtoId } = request.query as {estoqueId: number, produtoId: number}
        const estoqueId_produtoId : IEstoqueIdProdutoId = {estoqueId: Number(estoqueId), produtoId: Number(produtoId)}
               
        const result =  await produtoEstoqueService.apagar(estoqueId_produtoId);
        if(!result.sucesso){
            return reply.status(404).send({menssagem: result.mensagem});
        }
        return reply.status(200).send(result) ;
    }
}