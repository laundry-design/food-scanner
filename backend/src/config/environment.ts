import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server Configuration
  NODE_ENV: process.env['NODE_ENV'] || 'development',
  PORT: parseInt(process.env['PORT'] || '3002'),
  API_VERSION: process.env['API_VERSION'] || 'v1',

  // Database Configuration
  DATABASE_URL: process.env['DATABASE_URL'],
  DB_USER: process.env['DB_USER'] || 'postgres',
  DB_PASSWORD: process.env['DB_PASSWORD'] || 'password',
  DB_NAME: process.env['DB_NAME'] || 'foodscanner_dev',
  DB_HOST: process.env['DB_HOST'] || 'localhost',
  DB_PORT: parseInt(process.env['DB_PORT'] || '5432'),

  // JWT Configuration
  JWT_SECRET: process.env['JWT_SECRET'] || 'your-super-secret-jwt-key-change-in-production',
  JWT_REFRESH_SECRET: process.env['JWT_REFRESH_SECRET'] || 'your-super-secret-refresh-key-change-in-production',
  JWT_EXPIRES_IN: process.env['JWT_EXPIRES_IN'] || '15m',
  JWT_REFRESH_EXPIRES_IN: process.env['JWT_REFRESH_EXPIRES_IN'] || '7d',

  // OAuth Configuration
  GOOGLE_CLIENT_ID: process.env['GOOGLE_CLIENT_ID'] || '367581443449-o1du4aq6gk2n27gqu8oleas1j130aoul.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: process.env['GOOGLE_CLIENT_SECRET'] || '',
  APPLE_CLIENT_ID: process.env['APPLE_CLIENT_ID'] || 'com.vinayakaryahey.real-app',
  APPLE_TEAM_ID: process.env['APPLE_TEAM_ID'] || '',
  APPLE_KEY_ID: process.env['APPLE_KEY_ID'] || '',

  // AI Service Configuration
  OPENAI_API_KEY: process.env['OPENAI_API_KEY'],
  AI_MODEL: process.env['AI_MODEL'] || 'gpt-4-vision-preview',

  // File Storage Configuration
  STORAGE_TYPE: process.env['STORAGE_TYPE'] || 'local',
  AWS_ACCESS_KEY_ID: process.env['AWS_ACCESS_KEY_ID'],
  AWS_SECRET_ACCESS_KEY: process.env['AWS_SECRET_ACCESS_KEY'],
  AWS_REGION: process.env['AWS_REGION'] || 'us-east-1',
  AWS_S3_BUCKET: process.env['AWS_S3_BUCKET'],

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000'),
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100'),

  // Logging
  LOG_LEVEL: process.env['LOG_LEVEL'] || 'info',
  LOG_FILE_PATH: process.env['LOG_LEVEL'] || 'logs/app.log',

  // CORS
  CORS_ORIGIN: process.env['CORS_ORIGIN'] || 'http://localhost:3000,http://localhost:3002,http://localhost:8081',

  // Security
  BCRYPT_SALT_ROUNDS: parseInt(process.env['BCRYPT_SALT_ROUNDS'] || '12'),
};
