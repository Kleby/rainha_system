import type{ FastifyInstance } from "fastify";
import { enderecoController } from "./endereco.controller";

export const enderecoRoutes = async (app: FastifyInstance)=>{
    app.get("/", enderecoController.listarTodos);
    app.post("/", enderecoController.criar);
    app.put("/", enderecoController.atualizar);
    app.get("/id/:id", enderecoController.obterPorId);
    app.get("/rua/:rua", enderecoController.obterPorRua);
    app.get("/cidade/:cidade", enderecoController.obterPorCidade);
    app.get("/cep/:cep", enderecoController.obterPorCep);
    app.delete("/:id", enderecoController.apagar);
}