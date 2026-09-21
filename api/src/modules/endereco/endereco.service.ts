import { AppError } from "@/shared/errors/AppError";
import type { CriarAtualizarEnderecoSchema, EnderecoSchema } from "./endereco.schema";
import  { enderecoRepository} from "./endereco.repository"

export const enderecoService = {
    async criar(endereco: CriarAtualizarEnderecoSchema):Promise<CriarAtualizarEnderecoSchema | {sucesso: boolean, mensagem: string}>{
        const existente = await enderecoRepository.obterPorCep(endereco.cep);
        if(existente && existente.cidade === endereco.cidade && existente.rua === endereco.rua && existente.numero === endereco.numero){
            return {sucesso: true, mensagem: "Endereço inserido com sucesso"}
        }
        const result =  await enderecoRepository.criar(endereco);

        if(!result){
            throw new AppError("Não foi possível cadastrar o endereço", 404)
        }
        return result;
    },

    async listarTodos(): Promise<EnderecoSchema[]>{
        return await enderecoRepository.listarTodos();
    },
    async obterPorId(id: number):Promise<EnderecoSchema>{
        const endereco = await enderecoRepository.obterPorId(id);
        if(!endereco){
            throw new AppError("Endereço não encontrado", 404)
        }
        return endereco;
    },

    async obterPorRua(rua: string): Promise<EnderecoSchema[]>{
        return  await enderecoRepository.obterPorRua(rua);
    },

    async obterPorCidade(cidade: string):Promise<EnderecoSchema[]>{
        return await enderecoRepository.obterPorCidade(cidade);
    },

    async obterPorCep(cep: string):Promise<EnderecoSchema>{
        const endereco = await enderecoRepository.obterPorCep(cep);
        if(!endereco){
            throw new AppError(`Endereço não encontrado pelo o CEP ${cep}`, 404);
        }
        return endereco;
    },

    async atualizar(id: number, endereco: CriarAtualizarEnderecoSchema): Promise<EnderecoSchema>{
        const existente = await enderecoRepository.obterPorId(id);
        if(!existente){
            throw new AppError("Endereço não encontrado", 404);
        }
        return await enderecoRepository.atualizar(id, endereco);
    },

    async apagar(id: number): Promise<{sucesso: boolean, mensagem: string}>{
        const existente = await enderecoRepository.obterPorId(id);
        if(!existente){
            throw new AppError("Não foi possicel apagar! Endereçoa não encontrado", 404);
        }
        return await enderecoRepository.apagar(id);
    }
}