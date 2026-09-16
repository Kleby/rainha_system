import type { IProduto } from "./produto.model";
import {produtoRepository} from "./produto.repository";
import { AppError } from "@/shared/errors/AppError";

export const produtoService = {
    async criar(produto: IProduto){
        if(produto.preco <= 0){
            throw new AppError("Preço deve ser maior que zero.", 400);
        }

        const ProdutoExistente = await produtoRepository.buscarPorNome(produto.nome);
        console.log("existente");
        console.log(ProdutoExistente);
        
        if(ProdutoExistente[0]){
            throw new AppError("Já Existe o produto com o mesmo sku");
        } 

        return produtoRepository.criar(produto);
    },

    async listarTodos(){
        return await produtoRepository.listarTodos()
    },

    async buscarPorId(id: number){
        const existsProduto = await produtoRepository.buscarPorId(id);
        if(existsProduto){
            throw new AppError("Produto não encontrado", 404);
        }
        return existsProduto;
    },
    async remover(id: number){
        const existente = produtoRepository.buscarPorId(id);
        if(!existente) {
            throw new AppError("Produto não encontardo", 404);
        }
        return await produtoRepository.remover(id);
    },
    async atualizar(id: number, produto:IProduto){
        const existente = await produtoRepository.buscarPorId(id);
        if(!existente){
            throw new AppError("Produto não encontrado!", 404);
        }
        return produtoRepository.atualizar(id, produto);
    }
}