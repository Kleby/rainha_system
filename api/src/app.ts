import Fastify from "fastify";

export async function  buildApp(){
    const app = await Fastify({
        logger: true
    });

    app.get("/health", async() => {
        return ({ "Status": "OK"});
    });

    return app;
}

