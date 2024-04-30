import express from 'express';
import get from './default.json' assert { type: "json" };


import userRoute from '../api/routes/userRoute.js'

export default  () => {
  const app = express();
  

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || get.server.port);

  // MIDDLEWARES
  app.use(express.json());

  //ROUTES
  userRoute(app)

  return app;
};



