# FoodScanner Backend

A Node.js TypeScript backend API for the FoodScanner app, providing AI-powered food recognition and nutritional analysis.

## 🚀 Features

- **User Authentication**: JWT-based authentication with refresh tokens
- **User Management**: Complete user profiles with onboarding flow
- **Food Recognition**: AI-powered food analysis using OpenAI
- **Nutrition Tracking**: Comprehensive nutrition data management
- **Analytics**: Nutrition trends and insights
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Security**: Rate limiting, CORS, input validation
- **Database**: PostgreSQL with Sequelize ORM

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.0+
- **Framework**: Express.js 4.18+
- **Database**: PostgreSQL 15+ with Sequelize ORM
- **Authentication**: JWT with bcrypt
- **Validation**: Zod for request/response validation
- **API Documentation**: Swagger/OpenAPI 3.0
- **Testing**: Jest + Supertest
- **Logging**: Winston

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- npm or yarn

## 🚀 Quick Start

### 1. Clone and Install

```bash
cd backend
npm install
```

### 2. Environment Setup

Copy the environment file and configure your variables:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```bash
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=foodscanner_dev
DB_HOST=localhost
DB_PORT=5432

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key

# AI Service Configuration
OPENAI_API_KEY=your-openai-api-key
```

### 3. Database Setup

Create the database:

```bash
npm run db:create
```

Run migrations:

```bash
npm run db:migrate
```

Seed the database (optional):

```bash
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start at `http://localhost:3000`

## 📚 API Documentation

Once the server is running, visit:

- **Swagger UI**: `http://localhost:3000/api-docs`
- **OpenAPI Spec**: `http://localhost:3000/api-docs.json`

## 🗄️ Database Schema

The backend includes the following main models:

- **Users**: User profiles and authentication
- **FoodItems**: Scanned food items with AI analysis
- **DailyNutrition**: Daily nutrition totals
- **UserGoals**: User nutrition goals
- **NutritionEntries**: Manual nutrition entries
- **RefreshTokens**: JWT refresh token management

## 🔐 Authentication

The API uses JWT tokens with the following flow:

1. **Register/Login**: Get access and refresh tokens
2. **API Calls**: Include `Authorization: Bearer <token>` header
3. **Token Refresh**: Use refresh token to get new access token
4. **Logout**: Invalidate refresh tokens

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── models/          # Sequelize models
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic
│   ├── swagger/         # API documentation
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── app.ts           # Main application file
├── database/            # Database migrations and seeders
├── tests/               # Test files
└── package.json         # Dependencies and scripts
```

## 🧪 Testing

Run tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Environment Variables for Production

Make sure to set appropriate production values:

```bash
NODE_ENV=production
DATABASE_URL=your-production-db-url
JWT_SECRET=your-production-jwt-secret
JWT_REFRESH_SECRET=your-production-refresh-secret
```

## 📊 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/verify` - Verify token

### Users
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile
- `POST /api/v1/users/onboarding/complete` - Complete onboarding
- `PUT /api/v1/users/goals` - Update user goals
- `GET /api/v1/users/goals` - Get user goals

### Food
- `POST /api/v1/food/scan` - Scan and analyze food
- `GET /api/v1/food/history` - Get food history
- `GET /api/v1/food/history/:id` - Get specific food item
- `DELETE /api/v1/food/history/:id` - Delete food item
- `PUT /api/v1/food/history/:id` - Update food item

### Nutrition
- `GET /api/v1/nutrition/daily` - Get daily nutrition
- `GET /api/v1/nutrition/weekly` - Get weekly nutrition
- `GET /api/v1/nutrition/monthly` - Get monthly nutrition
- `POST /api/v1/nutrition/manual-entry` - Add manual entry

### Analytics
- `GET /api/v1/analytics/trends` - Get nutrition trends
- `GET /api/v1/analytics/macros` - Get macro distribution
- `GET /api/v1/analytics/progress` - Get goal progress
- `GET /api/v1/analytics/insights` - Get AI insights

## 🔧 Development

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Database Operations

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Run migrations
npm run db:migrate

# Open database studio
npm run db:studio
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the API documentation at `/api-docs`

## 🔄 Changelog

### v1.0.0
- Initial release
- User authentication and management
- Food recognition with AI
- Nutrition tracking and analytics
- Complete API documentation
