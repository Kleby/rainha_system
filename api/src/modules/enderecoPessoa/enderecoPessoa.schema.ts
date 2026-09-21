import { number, enum as enum_ ,object, type output} from "zod";
import { TipoResidencial} from "@prisma/client";

 export const criarEnderecoPessoaSchema = object({
    enderecoId: number(),
    pessoaId: number(),
    tipo: enum_(TipoResidencial),
});

 const obterEnderecoPessoaUnicoSchema = object({
    enderecoId_pessoaId: object({
        enderecoId: number(),
        pessoaId: number()
    }),
    tipo: enum_(TipoResidencial),
});

export type EnderecoPessoaSchema = output<typeof criarEnderecoPessoaSchema>

export type ObterEnderecoPessoaUnicoSchema = output<typeof obterEnderecoPessoaUnicoSchema>