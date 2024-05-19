import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation - SUCUM',
      version: '1.0.0',
      description: 'Documentação da API - SUCUM',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          in: 'header',
          name: 'Authorization',
          description: 'Bearer token to access these api endpoints',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/api/routes/pacienteRoute.js', 
        './src/api/routes/supervisorRoute.js', 
        './src/api/routes/medicoRoute.js',
        './src/api/routes/consultaRoute.js'
      ], // Arquivos que contêm as rotas da API
};

const specs = swaggerJSDoc(options);

export default specs;