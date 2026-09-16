import type { IProdutoPromocao } from "../produtoPromocao/produtoPromocao.model";

export interface IProduto {
 nome: string;
 sku: string;
 preco: number;
 custoReal: number;
 custoOperacional: number;
 custoUnitario: number;
 emPromocao: boolean;
 estoqueId: number;
 produtoPromocoes?: IProdutoPromocao[];
}