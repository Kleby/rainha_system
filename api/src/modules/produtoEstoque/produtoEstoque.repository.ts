import { Prisma } from "@prisma/client";
import { prismaClient as orm } from "@/shared/database/prisma";

export const produtoEstoqueRepository = {
    async criar(data: Prisma.ProdutoEstoqueUncheckedCreateInput) {
        return await orm.produtoEstoque.create({ data })
    },
    async listarTodos() {
        return await orm.produtoEstoque.findMany()
    },

    async buscarPorIdComposto(estoqueId_produtoId: { estoqueId: number, produtoId: number }) {
        //includes é como o join
        return await orm.produtoEstoque.findUnique({
            where: { estoqueId_produtoId }, include: {
                estoque: true,
                produto: true
            }
        });
    },

    async atualizarQuantidade(estoqueId: number, produtoId: number, quantidade: number) {
        return orm.produtoEstoque.update({
            where: {
                estoqueId_produtoId: { estoqueId, produtoId }
            },
            data: {
                quantidade
            }
        })
    },

    async apagar(estoqueId_produtoId: {estoqueId: number, produtoId: number}){
        await orm.produtoEstoque.delete({
            where:{
                estoqueId_produtoId
            }
        });
        return {
            sucesso: true,
            mensagem: "Registro deletado com sucesso!"
        }
    }
}