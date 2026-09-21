import type { EnderecoPessoaSchema, ObterEnderecoPessoaUnicoSchema } from "./enderecoPessoa.schema";
import { prismaClient as orm } from "@/shared/database/prisma";

export const enderecoPessoaRepository = {
    async criar(data: EnderecoPessoaSchema): Promise<EnderecoPessoaSchema> {
        return await orm.enderecoPessoa.create({
            data: {
                enderecoId: data.enderecoId,
                pessoaId: data.pessoaId,
                tipo: data.tipo
            }
        })
    },

    async listarTodos(): Promise<EnderecoPessoaSchema[]> {
        return await orm.enderecoPessoa.findMany({include: {pessoa: true, endereco: true}});
    },


    async obterPorUnico(enderecoId_pessoaId: { enderecoId: number, pessoaId: number }){
        return await orm.enderecoPessoa.findUnique({
            where: { enderecoId_pessoaId }, 
            include: {
                endereco: true,
                pessoa: true
            }
        });
    },
    async obterPorPessoa(pessoaId: number ): Promise<EnderecoPessoaSchema[]>{
        return await orm.enderecoPessoa.findMany({
            where: {
                pessoaId
            }
        });
    },

    async obterPorEndereco(enderecoId: number): Promise<EnderecoPessoaSchema[]>{
        return await orm.enderecoPessoa.findMany({
            where:{
                enderecoId
            }
        });
    }

}