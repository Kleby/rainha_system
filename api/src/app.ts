import Fastify from "fastify";
import { produtoRoutes } from "@/modules/produto/produto.route"
import { estoqueRoutes } from "@/modules/estoque/estoque.route"
import { registerErrorHandler } from "@/shared/middlewares/errorHandle.middleware"
import { produtoEstoqueRoutes } from "./modules/produtoEstoque/produtoEstoque.route";


export async function  buildApp(){
    const app = await Fastify({
        logger: true
    });

    registerErrorHandler(app);
    app.register(produtoRoutes, { prefix: "/api/v1/produtos"});
    app.register(estoqueRoutes, { prefix: "/api/v1/estoques"});
    app.register(produtoEstoqueRoutes, { prefix: "/api/v1/produto_estoque"})
    app.get("/health", async() => {
        return ({ "Status": "OK"});
    });

    return app;
}

