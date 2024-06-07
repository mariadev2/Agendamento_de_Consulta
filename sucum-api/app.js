import  app  from "./src/config/express.js";

const appInstance = app();

const port = appInstance.get('port');

// RUNNING OUR APPLICATION ON THE SET PORT
appInstance.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});