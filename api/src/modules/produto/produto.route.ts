import type { FastifyInstance } from "fastify"
import { produtoController } from "./produto.controller"

export const produtoRoutes = async (app: FastifyInstance) => {
    app.post("/", produtoController.criar);
    app.get("/", produtoController.listarTodos);
    app.delete("/", produtoController.apagar)
    app.put("/", produtoController.atualizar)
    app.get("/:id", produtoController.buscarPorId);
}