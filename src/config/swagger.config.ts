import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My PERN API',
      version: '1.0.0',
      description: 'PERN Stack API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: ['./src/modules/**/*.route.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
