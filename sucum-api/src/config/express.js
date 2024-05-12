import express from 'express';
import get from './default.json' assert { type: "json" };
import userRoute from '../api/routes/userRoute.js'
import createTable from '../config/create_tables_if_not_exists.js'


export default  () => {
  const app = express();
  
  // SET VARIABLES
  app.set('port', process.env.PORT || get.server.port);

  // MIDDLEWARES
  app.use(express.json());
  

  //CREATE INIT TABLES
  createTable();

  //ROUTES
  userRoute(app)

  return app;
};



