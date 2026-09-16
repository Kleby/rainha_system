import type {FastifyInstance} from "fastify";
import { produtoEstoqueController } from "./produtoEstoque.controller";

export const produtoEstoqueRoutes = async (app: FastifyInstance)=>{
    app.post("/", produtoEstoqueController.criar);
    app.get("/", produtoEstoqueController.listarTodos);
    app.delete("/", produtoEstoqueController.apagar);
    app.patch("/", produtoEstoqueController.atualizarQuantidade);
    app.get("/:id",  produtoEstoqueController.obterPorId);
}