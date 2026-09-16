import { prismaClient as orm } from "@/shared/database/prisma";
import { Prisma } from "@prisma/client";

export const produtoRepository = {

    async listarTodos(){
        return await orm.produto.findMany({orderBy: {nome: "asc"}})
    },
    async criar (data: Prisma.ProdutoCreateInput) {
        return await orm.produto.create({data})
    },
    async buscarPorId(id: number){
        return await orm.produto.findUnique({where: {id}});
    },
    async buscarPorNome(nome: string){
        return await orm.produto.findMany({where: {
            nome:{
                contains: nome,
            }
        }});
    },
    async atualizar(id: number, data:Prisma.ProdutoUpdateInput) {
        return await orm.produto.update({where:{id}, data});
    },
    async remover(id: number) {
        return await orm.produto.delete({where:{id}});
    }
}

