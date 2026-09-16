import { z } from   "zod"
import { criarProdutoPromocao } from "../produtoPromocao/produtoPromocao.schema";

export const criarProdutoSchema = z.object({
    nome: z.string().min(2, "O Nome está muito curto, deve ter mais de 2 carateres"),
    sku: z.string().min(1, "SKU é Obrigatório"),
    preco: z.number().positive("Preço deve ser positivo"),
    custoReal: z.number().positive("Custo Real deve ser positivo"),
    custoOperacional: z.number().positive("Custo Operacional deve ser positivo"),
    custoUnitario: z.number().positive("Custo Unitário deve ser positivo"),
    emPromocao: z.boolean().default(false),
    estoqueId: z.number().int().nonnegative(),
});

export type CriarProdutoInput = z.infer<typeof criarProdutoPromocao>;