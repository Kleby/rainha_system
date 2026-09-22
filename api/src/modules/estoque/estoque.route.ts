import type {FastifyInstance} from "fastify";
import { estoqueController } from "./estoque.controller"

export const estoqueRoutes = async(app: FastifyInstance) =>{
    app.post("/", estoqueController.criar);
    app.get("/", estoqueController.listarTodos);
    app.get("/id/:id", estoqueController.obterPorId);
    app.get("/nome/:nome", estoqueController.obterPorNome)
    app.put("/", estoqueController.atualizar);
}