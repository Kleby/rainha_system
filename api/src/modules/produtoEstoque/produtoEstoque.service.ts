import type { IProdutoEstoque } from "./produtoEstoque.model";
import {produtoEstoqueRepository} from "./produtoEstoque.repository";
import { AppError } from "@/shared/errors/AppError";

export const produtoEstoqueService = {
    async criar(produtoEstoque: IProdutoEstoque){
        const {estoqueId, produtoId, quantidade} = produtoEstoque;
        if(quantidade <= 0 ){
            throw new AppError("A quantidade não menor ou igual a 0.00", 400);
        }

        const existente = await produtoEstoqueRepository.buscarPorIdComposto({estoqueId, produtoId});
        if(existente){
            throw new AppError("Erro ao tentar definir o estoque ou produto");
        }
        return produtoEstoqueRepository.criar(produtoEstoque);
    },

    async listarTodos(){
        return await produtoEstoqueRepository.listarTodos();
    },

    async obterPorId(estoqueId_produtoId: {estoqueId: number, produtoId: number}){
        return await produtoEstoqueRepository.buscarPorIdComposto(estoqueId_produtoId);
    },    
    async atualizarQuantidade({ estoqueId, produtoId }:{estoqueId: number, produtoId: number}, quantidade: number){
        if(quantidade <= 0 ){
            throw new AppError("A quantidade não devd ser menor ou igual a zero", 404);
        }

        if(!estoqueId || !produtoId){
            throw new AppError("Nenhum registro encontrado", 404);
        }
        
        const produtoEstoqueDb = await produtoEstoqueRepository.buscarPorIdComposto({estoqueId, produtoId});
        if(!produtoEstoqueDb){
            throw new AppError("Nenhum registro encontrado", 404);
        }
        return await produtoEstoqueRepository.atualizarQuantidade(estoqueId, produtoId, quantidade)
    },
    async apagar(estoqueId_produtoId: {estoqueId: number, produtoId: number}){
        const produtoEstoqueDb = await produtoEstoqueRepository.buscarPorIdComposto(estoqueId_produtoId);
        if(!produtoEstoqueDb){
            throw new AppError("Nenhum registro encontardo", 404);
        }         
        return await produtoEstoqueRepository.apagar(estoqueId_produtoId);
    }
}
