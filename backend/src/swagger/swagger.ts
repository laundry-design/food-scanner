import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FoodScanner API',
      version: '1.0.0',
      description: 'AI-powered food recognition and nutritional analysis API for the FoodScanner mobile app',
      contact: {
        name: 'FoodScanner Team',
        email: 'support@foodscanner.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://api.foodscanner.com',
        description: 'Production server',
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
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            error: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  example: 'AUTH_001',
                },
                message: {
                  type: 'string',
                  example: 'Invalid credentials',
                },
                details: {
                  type: 'object',
                },
              },
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
            },
            plan: {
              type: 'string',
              enum: ['basic', 'premium', 'pro'],
            },
            age: {
              type: 'integer',
              minimum: 16,
              maximum: 100,
            },
            weight: {
              type: 'number',
              minimum: 0,
            },
            weightUnit: {
              type: 'string',
              enum: ['KG', 'LB'],
            },
            height: {
              type: 'integer',
              minimum: 100,
              maximum: 250,
            },
            heightUnit: {
              type: 'string',
              enum: ['CM', 'IN'],
            },
            gender: {
              type: 'string',
              enum: ['male', 'female', 'other'],
            },
            fitnessGoal: {
              type: 'string',
            },
            gymActivity: {
              type: 'string',
            },
            dietFocus: {
              type: 'string',
            },
            isOnboardingCompleted: {
              type: 'boolean',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        FoodItem: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            name: {
              type: 'string',
            },
            imageUrl: {
              type: 'string',
            },
            aiAnalysis: {
              type: 'object',
            },
            calories: {
              type: 'integer',
            },
            protein: {
              type: 'number',
            },
            carbs: {
              type: 'number',
            },
            fat: {
              type: 'number',
            },
            fiber: {
              type: 'number',
            },
            sugar: {
              type: 'number',
            },
            sodium: {
              type: 'number',
            },
            mealType: {
              type: 'string',
              enum: ['breakfast', 'lunch', 'dinner', 'snack'],
            },
            consumedAt: {
              type: 'string',
              format: 'date-time',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        NutritionData: {
          type: 'object',
          properties: {
            calories: {
              type: 'integer',
            },
            protein: {
              type: 'number',
            },
            carbs: {
              type: 'number',
            },
            fat: {
              type: 'number',
            },
            fiber: {
              type: 'number',
            },
            sugar: {
              type: 'number',
            },
            sodium: {
              type: 'number',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './src/routes/*.ts',
    './src/swagger/*.swagger.ts',
  ],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'FoodScanner API Documentation',
  }));
  
  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};
