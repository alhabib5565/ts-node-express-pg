// swagger.ts
import swaggerAutogen from 'swagger-autogen';
import path from 'path';
import { successSchema, ref, array } from '../utils/swaggerSuccessSchema';
const doc = {
  info: {
    title: 'My PERN API',
    version: '1.0.0',
    description: 'PERN Stack API Documentation',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  components: {
    schemas: {
      // ════════════════════════════════════════
      //  BASE MODELS (raw data shape)
      // ════════════════════════════════════════
      User: {
        $id: 1,
        $name: 'Rahim Uddin',
        $email: 'rahim@gmail.com',
        $password: 'hashed_password',
        $role: 'admin',
        created_at: '2023-07-01T10:00:00.000Z',
        updated_at: '2023-07-01T10:00:00.000Z',
      },

      Category: {
        $id: 1,
        $name: 'Web Development',
        created_at: '2023-07-01T10:00:00.000Z',
        updated_at: '2023-07-01T10:00:00.000Z',
      },

      CategoryList: [
        {
          $id: 1,
          $name: 'Web Development',
          created_at: '2023-07-01T10:00:00.000Z',
          updated_at: '2023-07-01T10:00:00.000Z',
        },
      ],

      Faq: {
        $id: 1,
        $question: 'What is your return policy?',
        $answer: 'You can return within 7 days.',
        $is_active: true,
        created_at: '2023-07-01T10:00:00.000Z',
        updated_at: '2023-07-01T10:00:00.000Z',
      },

      Notice: {
        $id: 1,
        $title: 'Notice Title',
        $description: 'Notice Description',
        created_at: '2023-07-01T10:00:00.000Z',
        updated_at: '2023-07-01T10:00:00.000Z',
      },

      Batch: {
        $id: 1,
        $name: 'Batch A',
        $description: 'Morning batch',
        $day: ['Monday', 'Wednesday'],
        $time: '09:00 AM',
        $is_active: true,
        created_at: '2023-07-01T10:00:00.000Z',
        updated_at: '2023-07-01T10:00:00.000Z',
      },

      // ════════════════════════════════════════
      //  REQUEST BODIES (create/update payload)
      // ════════════════════════════════════════

      CreateUser: {
        $name: 'Rahim Uddin',
        $email: 'rahim@gmail.com',
        $password: '12345678',
        $role: 'user',
      },

      CreateCategory: {
        $name: 'Web Development',
      },

      CreateFaq: {
        $question: 'What is your return policy?',
        $answer: 'You can return within 7 days.',
      },

      CreateNotice: {
        $title: 'Notice Title',
        $description: 'Notice Description',
      },

      CreateBatch: {
        $name: 'Batch A',
        $description: 'Morning batch',
        $day: ['Monday', 'Wednesday'],
        $time: '09:00 AM',
        $is_active: true,
      },

      // User responses
      UserResponse: successSchema(ref('User')),
      UsersResponse: successSchema(array('User'), true),

      // Category responses
      CategoryResponse: successSchema(ref('Category')),
      CategoriesResponse: successSchema(array('Category'), true),

      // Faq responses
      FaqResponse: successSchema(ref('Faq')),
      FaqsResponse: successSchema(array('Faq'), true),

      // Notice responses
      NoticeResponse: successSchema(ref('Notice')),
      NoticesResponse: successSchema(array('Notice'), true),

      // Batch responses
      BatchResponse: successSchema(ref('Batch')),
      BatchesResponse: successSchema(array('Batch'), true),
    },
  },

  tags: [
    { name: 'Auth', description: 'Authentication APIs' },
    { name: 'Users', description: 'User management APIs' },
    { name: 'Course Categories', description: 'Course category APIs' },
    { name: 'Batches', description: 'Batch management APIs' },
    { name: 'Courses', description: 'Course management APIs' },
    { name: 'FAQs', description: 'FAQ management APIs' },
    { name: 'Notice Categories', description: 'Notice category APIs' },
    { name: 'Notices', description: 'Notice management APIs' },
  ],
};

const outputFile = path.resolve(process.cwd(), 'swagger-output.json');
const routes = ['../app.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
