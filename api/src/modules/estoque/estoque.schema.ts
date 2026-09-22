import { string, boolean, object, type output, number, date } from "zod"

const criarEstoqueSchema = object({
    nome: string().min(2, "Nome do estoque está muito curto"),
    status: boolean(),
    
});
const atualizarEstoque = object({
    id: number().int(),
    nome: string().min(2, "Nome do estoque está muito curto"),
    status: boolean(),
    // updatedAt: date()
})

const estoqueSchema = object({
    id: number(),
    nome: string(),
    status: boolean(),
    createdAt: date(),
    updatedAt: date(),
});


export type CriarEstoqueSchema = output<typeof criarEstoqueSchema>
export type EstoqueSchema = output<typeof estoqueSchema>
export type AtualizarEstoqueSchema = output<typeof atualizarEstoque>