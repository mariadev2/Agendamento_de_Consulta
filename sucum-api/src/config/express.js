import express from 'express';
import get from './default.json' assert { type: "json" };
import userRoute from '../api/routes/userRoute.js'
import createTable from '../config/create_tables_if_not_exists.js'
import pacienteRoute from '../api/routes/pacienteRoute.js';
import supervisorRoute from '../api/routes/supervisorRoute.js';
import medicoRoute from '../api/routes/medicoRoute.js';
import consultaRoute from '../api/routes/consultaRoute.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from '../../swaggerConfig.js'
import cors from 'cors'

export default  () => {
  const app = express();
  
  // SET VARIABLES
  app.set('port', process.env.PORT || get.server.port);

  // MIDDLEWARES
  app.use(express.json());

  //CORS
  app.use(cors());
  app.options('*', cors());

  //CREATE INIT TABLES
  createTable();

  //ROUTES
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
  userRoute(app);
  supervisorRoute(app);
  pacienteRoute(app);
  medicoRoute(app);
  consultaRoute(app);

  return app;
};



