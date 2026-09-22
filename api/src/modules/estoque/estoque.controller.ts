import type {FastifyRequest, FastifyReply} from "fastify";
import { estoqueService} from "./estoque.service";
import type { AtualizarEstoqueSchema, CriarEstoqueSchema, EstoqueSchema } from "./estoque.schema";

export const estoqueController = {
    async criar(request: FastifyRequest, reply: FastifyReply): Promise<CriarEstoqueSchema>{
        const dados: CriarEstoqueSchema = request.body as CriarEstoqueSchema;
        return await reply.status(201).send(estoqueService.criar(dados));
    },

    async listarTodos(_:FastifyRequest, reply: FastifyReply): Promise<EstoqueSchema[]>{
        const result = await estoqueService.listarTodos();
        console.log("result")
        console.log(result)
        return reply.status(200).send(result);
    },
    async obterPorId(request: FastifyRequest, reply: FastifyReply): Promise<EstoqueSchema>{
        const { id } = request.params as {id: number};
        return await reply.status(200).send(estoqueService.obterPorId(id));
    },
    async obterPorNome(request: FastifyRequest, reply: FastifyReply): Promise<EstoqueSchema>{
        const {nome} = request.params as {nome: string};
        return await reply.status(200).send(await estoqueService.obterPorNome(nome));
    },
    async atualizar(request: FastifyRequest, reply: FastifyReply):Promise<AtualizarEstoqueSchema>{
        const {id, estoqueAtualizado} = request.body as {id: number, estoqueAtualizado: EstoqueSchema};
        return await reply.status(204).send(estoqueService.atualizar(id, estoqueAtualizado));
    }
}