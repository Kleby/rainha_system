import type { FastifyInstance } from  "fastify";
import {ZodError} from "zod"
import { AppError } from "@/shared/errors/AppError";

export function registerErrorHandler(app: FastifyInstance){
    app.setErrorHandler((error, request, reply) => {
        if(error instanceof ZodError){
            return reply.status(400).send({
                message: "Dados inválidos.",
                issues: error.issues.map((i)=> ({campo: i.path.join("."), erro: i.message}))
            })
        }
        if (error instanceof AppError){
            return reply.status(error.statusCode).send({message: error.message});
        }

        request.log.error(error);
        return reply.status(500).send({ message: "Erro Interno no servidor"});
    });
}