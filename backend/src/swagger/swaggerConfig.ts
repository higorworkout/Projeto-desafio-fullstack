import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Tarefas',
    version: '1.0.0',
    description: 'Documentação da API para gerenciamento de tarefas',
  },
  servers: [
    {
      url: 'http://localhost:3000', // atualize para seu ambiente
      description: 'Servidor local',
    },
  ],
   components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
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
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'], // Caminho para os arquivos TypeScript com anotações JSDoc
};

export const swaggerSpec = swaggerJSDoc(options);