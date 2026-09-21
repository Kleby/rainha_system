import { string, object, number, type output, date } from 'zod';

const criarEnderecoSchema = object({
    rua: string().trim().min(2, "a rua está muito curta"),
    cep: string().trim()
        .transform((valor: string) => valor.replace(/\D/g, ""))
        .pipe(string().length(8, "O CEP incorreto")),
    numero: string().trim(),
    pontoReferencia: string().trim(),
    complemento: string().trim(),
    cidade: string().trim().min(2, "O nome da Cidade está muito curta"),
    uf: string().trim().regex(/[A-Z]{2}/g, "UF inválido!"),
});

const enderecoSchema = object({
    id: number(),
        rua: string().trim().min(2, "a rua está muito curta"),
    cep: string().trim()
        .transform((valor: string) => valor.replace(/\D/g, ""))
        .pipe(string().length(8, "O CEP incorreto")),
    numero: string().trim(),
    pontoReferencia: string().trim(),
    complemento: string().trim(),
    cidade: string().trim().min(2, "O nome da Cidade está muito curta"),
    uf: string().trim().regex(/[A-Z]{2}/g, "UF inválido!"),
    createdAt: date(),
    updatedAt: date()
});

export type CriarAtualizarEnderecoSchema = output<typeof criarEnderecoSchema> 
export type EnderecoSchema = output<typeof enderecoSchema>