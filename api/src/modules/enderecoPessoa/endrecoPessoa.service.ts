import {AppError} from "@/shared/errors/AppError";
import { enderecoPessoaRepository } from "./enderecoPessoa.repository";
import type { EnderecoPessoaSchema } from "./enderecoPessoa.schema";

export const enderecoPessoaService = {
    async criar(pessoa: EnderecoPessoaSchema): Promise<EnderecoPessoaSchema>{
        const {enderecoId, pessoaId} = pessoa;
        const existente = await enderecoPessoaRepository.obterPorUnico({enderecoId, pessoaId});
        if(existente){
            throw new AppError("Endereço já cadastrador para essa pessoa", 409)
        }
        return await enderecoPessoaRepository.criar(pessoa);
    },
    async listarTodos():Promise<EnderecoPessoaSchema[]>{
        return await enderecoPessoaRepository.listarTodos()
    }
}