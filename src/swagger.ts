import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import env from './configs/env.config';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Contract SIMS PPOB',
      version: '1.0.0',
      description: 'Documentation for Take Home Test API',
      contact: {
        name: 'Irwanto',
        url: 'https://github.com/irwantsiregar',
      },
      externalDocs: {
        description: 'Find out more about Swagger',
        url: 'https://swagger.io',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      termsOfService: 'https://swagger.io/terms/',
      tags: [
        {
          name: 'Services',
          description: 'Service related endpoints',
        },
        {
          name: 'Banner',
          description: 'Banner related endpoints',
        },
      ],
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
      },
    ],
  },
  apis: ['./src/swagger/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
