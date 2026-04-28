import swaggerAutogen from 'swagger-autogen';
import path from 'path';

const doc = {
  info: {
    title: 'My PERN API',
    version: '1.0.0',
    description: 'PERN Stack API Documentation',
  },
  host: 'http://localhost:3000',
  basePath: '',
  schemes: [],
  consumes: [],
  produces: [],
  tags: [
    { name: 'Users', description: 'User management APIs' },
    { name: 'Auth', description: 'Authentication APIs' },
    // { name: 'Batches', description: 'Batch management APIs' },
    // { name: 'Course Categories', description: 'Course category APIs' },
    { name: 'Courses', description: 'Course management APIs' },
    // { name: 'FAQ', description: 'FAQ management APIs' },
    // { name: 'Notice Categories', description: 'Notice category APIs' },
    // { name: 'Notices', description: 'Notice management APIs' },
    // { name: 'Contact Messages', description: 'Contact message APIs' },
    // { name: 'Branches', description: 'Branch management APIs' },
    // { name: 'Site Config', description: 'Website configuration APIs' },
  ],
  securityDefinitions: {},
  definitions: {},
};

const outputFile = path.resolve(process.cwd(), 'swagger-output.json');
const routes = ['../app.ts'];
swaggerAutogen()(outputFile, routes, doc);
// import swaggerJsdoc from 'swagger-jsdoc';

// const options: swaggerJsdoc.Options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'My PERN API',
//       version: '1.0.0',
//       description: 'PERN Stack API Documentation',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000/api/v1',
//       },
//     ],
//   },
//   apis: ['./src/modules/**/*.route.ts'],
// };

// export const swaggerSpec = swaggerJsdoc(options);
