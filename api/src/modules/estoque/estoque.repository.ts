import { prismaClient as orm } from "@/shared/database/prisma";
import type { AtualizarEstoqueSchema, CriarEstoqueSchema, EstoqueSchema } from "./estoque.schema";

export const estoqueRepository = {
    async criar(data: CriarEstoqueSchema): Promise<CriarEstoqueSchema> {
        const result = await orm.estoque.create({ data }) 
        return result;
    },
    async listarTodos(): Promise<EstoqueSchema[]> {
        const result =  await orm.estoque.findMany({ orderBy: { id: "asc" } })
        return result
        
    },
    async obterPorId(id: number): Promise<EstoqueSchema | null> {
        return await orm.estoque.findUnique({where: { id }})
    },
    async obterPorNome(nome: string): Promise<EstoqueSchema | null> {
        return await orm.estoque.findUnique({where: { nome} });
    },
    async atualizar(id: number, estoque: AtualizarEstoqueSchema): Promise<AtualizarEstoqueSchema> {
        return await orm.estoque.update({ where: { id },data: estoque});
    },

    async apagar(id: number): Promise<EstoqueSchema>{
        return  await orm.estoque.delete({where: {id}}); 
    }

}  
