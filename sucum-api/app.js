import  app  from "./src/config/express.js";

const appInstance = app();

const port = appInstance.get('port');

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
appInstance.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});