import { prismaClient as orm } from "@/shared/database/prisma";
import type { CriarAtualizarEnderecoSchema, EnderecoSchema } from "./endereco.schema";


export const enderecoRepository = {
    async criar(data: CriarAtualizarEnderecoSchema): Promise<CriarAtualizarEnderecoSchema | null> {
        return await orm.endereco.create({ data });
    },

    async listarTodos(): Promise<EnderecoSchema[]> {        
        return await orm.endereco.findMany({ orderBy: { rua: "asc" } });
    },

    async obterPorId(id: number): Promise<EnderecoSchema | null> {
        return await orm.endereco.findUnique({ where: { id } })
    },

    async obterPorRua(rua: string): Promise<EnderecoSchema[]> {
        return await orm.endereco.findMany({ where: { rua: { contains: rua } } });
    },

    async obterPorCidade(cidade: string): Promise<EnderecoSchema[]> {
        return await orm.endereco.findMany({ where: { cidade: { contains: cidade } } })
    },
    async obterPorCep(cep: string): Promise<EnderecoSchema | null> {
        return await orm.endereco.findUnique({ where: { cep } })
    },

    async atualizar(id: number, estoque: CriarAtualizarEnderecoSchema): Promise<EnderecoSchema> {
        return await orm.endereco.update({ where: { id }, data: { estoque } })
    },
    async apagar(id: number): Promise<{ sucesso: true, mensagem: string }> {
        await orm.endereco.delete({ where: { id } });
        return { sucesso: true, mensagem: "Endereço Deletado" }
    },
}