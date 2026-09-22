import { estoqueRepository} from "./estoque.repository"
import { AppError } from "@/shared/errors/AppError"
import type { AtualizarEstoqueSchema, CriarEstoqueSchema, EstoqueSchema } from "./estoque.schema";

export const estoqueService = {
    async criar(estoque: CriarEstoqueSchema): Promise< CriarEstoqueSchema | AppError>{
        const existente = await estoqueRepository.obterPorNome(estoque.nome.trim().toUpperCase());        
        if(existente){
            throw new AppError("Estoque já Cadastrado", 409)
        }
        const result =  await estoqueRepository.criar({...estoque, nome: estoque.nome.trim().toUpperCase()} )
        return result;
    },
    async listarTodos(): Promise<EstoqueSchema[]>{
        return await estoqueRepository.listarTodos()
    },
    async obterPorNome(nome: string): Promise<EstoqueSchema | AppError>{
        const existentes = await estoqueRepository.obterPorNome(nome);
        if(!existentes){
            throw new AppError("Nenhum estoque encontrado", 404);
        }
        return existentes;
    },
    async obterPorId(id: number): Promise<EstoqueSchema | AppError>{
        const existente = await estoqueRepository.obterPorId(id);
        if(!existente){
            throw new AppError("Nenhum estoque encontrado", 404);
        }
        return existente;
    },
    async atualizar(id: number, estoque: AtualizarEstoqueSchema): Promise<AtualizarEstoqueSchema | AppError>{
        const existente = await estoqueRepository.obterPorId(id);
        if(!existente){
            throw new AppError("Estoque não encontrado", 404);
        }
        
        const existeNome = await estoqueRepository.obterPorNome(estoque.nome.trim());
        if(existeNome && existeNome!.nome === estoque.nome){
            throw new AppError("Estoque já cadastrado", 409);
        }
        return await estoqueRepository.atualizar(id, estoque);

    }
}