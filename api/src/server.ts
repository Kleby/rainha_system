import  {buildApp}  from "./app"

const app = await buildApp();

app.listen({
    port: 3000, host: "0.0.0.0"
}).then(()=> console.log("Servidor rodando em http://localhost:3000"))
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  })  
