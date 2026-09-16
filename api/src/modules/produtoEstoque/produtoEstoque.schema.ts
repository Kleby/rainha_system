import { z } from "zod";


export const criarProdutoEstoqueSchema = z.object({
    quantidade: z.number().int().positive("A quantidade deve ser positiva"),
    estoqueId: z.number().int(),
    produtoId: z.number().int(),
});

export type CriarProdutoEstoqueInput = z.infer<typeof criarProdutoEstoqueSchema>;