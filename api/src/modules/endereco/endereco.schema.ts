import { number, string, z } from 'zod';

export const criarEnderecoSchema = z.object({
    ruas: z.string().trim().min(2, "a rua está muito curta"),
    cep: z.string().trim()
        .transform((valor: string) => valor.replace(/\D/g, ""))
        .pipe(z.string().length(8, "O CEP incorreto")),
    numero: z.string().trim(),
    pontoReferencia: z.string().trim().optional(),
    complemento: z.string().trim().optional(),
    cidade: z.string().trim().min(2, "O nome da Cidade está muito curta"),
    uf: z.string().trim().regex(/[A-Z]{2}/g, "UF inválido!"),
});