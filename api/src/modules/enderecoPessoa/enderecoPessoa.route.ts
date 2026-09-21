import type{ FastifyInstance } from "fastify";
import { enderecoPessoaController } from "./enderecoPessoa.controller";

export const enderecoPessoaRoutes = async (app: FastifyInstance) =>{
    app.get("/", enderecoPessoaController.listarTodos);
    app.post("/", enderecoPessoaController.criar);
}