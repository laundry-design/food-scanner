# FoodScanner Backend Plan

## Overview
This document outlines the complete Node.js TypeScript backend architecture for the FoodScanner app, a React Native application that provides AI-powered food recognition and nutritional analysis.

## Tech Stack
- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.0+
- **Framework**: Express.js 4.18+
- **Database**: PostgreSQL 15+ with Sequelize ORM
- **Authentication**: JWT with bcrypt
- **File Storage**: AWS S3 or local storage for food images
- **AI Integration**: OpenAI API for food recognition
- **Validation**: Zod for request/response validation
- **API Documentation**: Swagger/OpenAPI 3.0
- **Testing**: Jest + Supertest
- **Logging**: Winston

## Project Structure
```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── environment.ts
│   │   └── ai.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   ├── nutritionController.ts
│   │   ├── foodController.ts
│   │   └── analyticsController.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   ├── errorHandler.ts
│   │   └── rateLimiter.ts
│   ├── models/
│   │   ├── index.ts
│   │   ├── User.ts
│   │   ├── Nutrition.ts
│   │   ├── FoodItem.ts
│   │   └── Analytics.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── nutrition.ts
│   │   ├── food.ts
│   │   └── analytics.ts
│   ├── services/
│   │   ├── authService.ts
│   │   ├── nutritionService.ts
│   │   ├── aiService.ts
│   │   ├── analyticsService.ts
│   │   └── emailService.ts
│   ├── types/
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   ├── nutrition.ts
│   │   └── common.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── helpers.ts
│   │   └── constants.ts
│   ├── swagger/
│   │   ├── swagger.ts
│   │   ├── auth.swagger.ts
│   │   ├── users.swagger.ts
│   │   ├── nutrition.swagger.ts
│   │   ├── food.swagger.ts
│   │   └── analytics.swagger.ts
│   └── app.ts
├── database/
│   ├── migrations/
│   └── seeders/
├── tests/
├── package.json
├── tsconfig.json
├── .sequelizerc
├── .env.example
└── README.md
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  plan VARCHAR(50) DEFAULT 'basic',
  age INTEGER CHECK (age >= 16 AND age <= 100),
  weight DECIMAL(5,2) CHECK (weight > 0),
  weight_unit VARCHAR(2) DEFAULT 'KG',
  height INTEGER CHECK (height >= 100 AND height <= 250),
  height_unit VARCHAR(2) DEFAULT 'CM',
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
  fitness_goal VARCHAR(100),
  gym_activity VARCHAR(50),
  diet_focus VARCHAR(100),
  is_onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Food Items Table
```sql
CREATE TABLE food_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  image_url VARCHAR(500),
  ai_analysis JSONB,
  calories INTEGER,
  protein DECIMAL(5,2),
  carbs DECIMAL(5,2),
  fat DECIMAL(5,2),
  fiber DECIMAL(5,2),
  sugar DECIMAL(5,2),
  sodium DECIMAL(5,2),
  meal_type VARCHAR(20) CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  consumed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Daily Nutrition Table
```sql
CREATE TABLE daily_nutrition (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_calories INTEGER DEFAULT 0,
  total_protein DECIMAL(5,2) DEFAULT 0,
  total_carbs DECIMAL(5,2) DEFAULT 0,
  total_fat DECIMAL(5,2) DEFAULT 0,
  total_fiber DECIMAL(5,2) DEFAULT 0,
  total_sugar DECIMAL(5,2) DEFAULT 0,
  total_sodium DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, date)
);
```

### User Goals Table
```sql
CREATE TABLE user_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  target_calories INTEGER,
  target_protein DECIMAL(5,2),
  target_carbs DECIMAL(5,2),
  target_fat DECIMAL(5,2),
  target_fiber DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/register` | User registration | `{name, email, password}` | `{user, token}` |
| POST | `/login` | User login | `{email, password}` | `{user, token}` |
| POST | `/logout` | User logout | `{}` | `{message}` |
| POST | `/refresh` | Refresh token | `{refreshToken}` | `{token}` |
| GET | `/verify` | Verify token | Headers: `Authorization` | `{user}` |

### User Routes (`/api/users`)
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/profile` | Get user profile | Headers: `Authorization` | `{user}` |
| PUT | `/profile` | Update user profile | `{name, age, weight, height, gender, fitnessGoal, gymActivity, dietFocus}` | `{user}` |
| POST | `/onboarding/complete` | Complete onboarding | `{plan, age, weight, weightUnit, height, heightUnit, gender, fitnessGoal, gymActivity, dietFocus}` | `{user}` |
| PUT | `/goals` | Update user goals | `{targetCalories, targetProtein, targetCarbs, targetFat, targetFiber}` | `{goals}` |
| GET | `/goals` | Get user goals | Headers: `Authorization` | `{goals}` |

### Food Routes (`/api/food`)
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/scan` | Scan and analyze food | `FormData: {image, mealType}` | `{foodItem, nutrition}` |
| GET | `/history` | Get food history | Query: `{date, mealType, limit, offset}` | `{foodItems, pagination}` |
| GET | `/history/:id` | Get specific food item | Headers: `Authorization` | `{foodItem}` |
| DELETE | `/history/:id` | Delete food item | Headers: `Authorization` | `{message}` |
| PUT | `/history/:id` | Update food item | `{name, calories, protein, carbs, fat}` | `{foodItem}` |

### Nutrition Routes (`/api/nutrition`)
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/daily/:date` | Get daily nutrition | Headers: `Authorization` | `{nutrition}` |
| GET | `/daily` | Get daily nutrition for today | Headers: `Authorization` | `{nutrition}` |
| GET | `/weekly` | Get weekly nutrition | Query: `{startDate, endDate}` | `{nutrition}` |
| GET | `/monthly` | Get monthly nutrition | Query: `{year, month}` | `{nutrition}` |
| POST | `/manual-entry` | Add manual nutrition entry | `{name, calories, protein, carbs, fat, mealType}` | `{nutrition}` |

### Analytics Routes (`/api/analytics`)
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/trends` | Get nutrition trends | Query: `{timeRange, metric}` | `{trends}` |
| GET | `/macros` | Get macro distribution | Query: `{timeRange}` | `{macros}` |
| GET | `/progress` | Get goal progress | Query: `{timeRange}` | `{progress}` |
| GET | `/insights` | Get AI insights | Query: `{timeRange}` | `{insights}` |

## Swagger Documentation

### Swagger Configuration
- **Base URL**: `/api-docs`
- **API Version**: v1
- **Title**: FoodScanner API
- **Description**: AI-powered food recognition and nutritional analysis API
- **Contact**: FoodScanner Team
- **License**: MIT

### Swagger Features
- Interactive API documentation
- Request/response examples
- Authentication schemes (Bearer token)
- Model schemas for all data types
- Try-it-out functionality
- Export to OpenAPI 3.0 specification

## Request/Response Structures

### Authentication

#### Register Request
```typescript
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
```

#### Register Response
```typescript
interface RegisterResponse {
  success: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    isOnboardingCompleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}
```

#### Login Request
```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

#### Login Response
```typescript
interface LoginResponse {
  success: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    plan: string;
    age: number;
    weight: number;
    weightUnit: string;
    height: number;
    heightUnit: string;
    gender: string;
    fitnessGoal: string;
    gymActivity: string;
    dietFocus: string;
    isOnboardingCompleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}
```

### User Profile

#### Update Profile Request
```typescript
interface UpdateProfileRequest {
  name?: string;
  age?: number;
  weight?: number;
  weightUnit?: 'KG' | 'LB';
  height?: number;
  heightUnit?: 'CM' | 'IN';
  gender?: 'male' | 'female' | 'other';
  fitnessGoal?: string;
  gymActivity?: string;
  dietFocus?: string;
}
```

#### Onboarding Complete Request
```typescript
interface OnboardingCompleteRequest {
  plan: string;
  age: number;
  weight: number;
  weightUnit: 'KG' | 'LB';
  height: number;
  heightUnit: 'CM' | 'IN';
  gender: 'male' | 'female' | 'other';
  fitnessGoal: string;
  gymActivity: string;
  dietFocus: string;
}
```

### Food Analysis

#### Food Scan Request
```typescript
interface FoodScanRequest {
  image: File; // Multipart form data
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}
```

#### Food Scan Response
```typescript
interface FoodScanResponse {
  success: boolean;
  foodItem: {
    id: string;
    name: string;
    imageUrl: string;
    aiAnalysis: {
      confidence: number;
      detectedItems: string[];
      suggestions: string[];
    };
    nutrition: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      fiber: number;
      sugar: number;
      sodium: number;
    };
    mealType: string;
    consumedAt: string;
    createdAt: string;
  };
}
```

### Nutrition Data

#### Daily Nutrition Response
```typescript
interface DailyNutritionResponse {
  success: boolean;
  nutrition: {
    date: string;
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    totalFiber: number;
    totalSugar: number;
    totalSodium: number;
    goals: {
      targetCalories: number;
      targetProtein: number;
      targetCarbs: number;
      targetFat: number;
      targetFiber: number;
    };
    progress: {
      caloriesProgress: number;
      proteinProgress: number;
      carbsProgress: number;
      fatProgress: number;
      fiberProgress: number;
    };
    foodItems: Array<{
      id: string;
      name: string;
      imageUrl: string;
      mealType: string;
      nutrition: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
      };
      consumedAt: string;
    }>;
  };
}
```

### Analytics Data

#### Trends Response
```typescript
interface TrendsResponse {
  success: boolean;
  trends: {
    timeRange: string;
    metric: string;
    data: Array<{
      date: string;
      value: number;
      target: number;
    }>;
    chartData: {
      labels: string[];
      datasets: Array<{
        data: number[];
        color: string;
        label: string;
      }>;
    };
  };
}
```

#### Macro Distribution Response
```typescript
interface MacroDistributionResponse {
  success: boolean;
  macros: {
    timeRange: string;
    data: Array<{
      name: string;
      percentage: number;
      color: string;
      current: number;
      target: number;
    }>;
    totalCalories: number;
    targetCalories: number;
  };
}
```

## AI Integration

### Food Recognition Service
```typescript
interface AIService {
  analyzeFoodImage(imageBuffer: Buffer): Promise<{
    foodName: string;
    confidence: number;
    detectedItems: string[];
    nutritionEstimate: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      fiber: number;
      sugar: number;
      sodium: number;
    };
    suggestions: string[];
  }>;
  
  generateNutritionInsights(userData: User, nutritionHistory: Nutrition[]): Promise<{
    insights: string[];
    recommendations: string[];
    trends: string[];
  }>;
}
```

## Security Features

### Authentication & Authorization
- JWT tokens with refresh token rotation
- Password hashing with bcrypt (salt rounds: 12)
- Rate limiting (100 requests per 15 minutes per IP)
- CORS configuration for mobile app
- Input validation and sanitization

### Data Protection
- HTTPS only in production
- Environment variable management
- SQL injection prevention with Sequelize ORM
- XSS protection
- CSRF protection

## Error Handling

### Standard Error Response
```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}
```

### Error Codes
- `AUTH_001`: Invalid credentials
- `AUTH_002`: Token expired
- `AUTH_003`: Unauthorized access
- `VAL_001`: Validation error
- `DB_001`: Database error
- `AI_001`: AI service error
- `FILE_001`: File upload error

## Testing Strategy

### Unit Tests
- Controller functions
- Service layer functions
- Utility functions
- Middleware functions

### Integration Tests
- API endpoints
- Database operations
- Authentication flow
- File upload/processing

### Test Coverage Target: 90%+

## Deployment

### Environment Configuration
```bash
# Production
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:port/db
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
AI_API_KEY=your-openai-api-key
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=your-s3-bucket
```

### Docker Support
- Multi-stage Dockerfile
- Docker Compose for development
- Health checks
- Environment-specific configurations

## Performance Considerations

### Caching Strategy
- Redis for session storage
- Response caching for analytics data
- Database query optimization
- Image compression and optimization

### Scalability
- Horizontal scaling with load balancer
- Database connection pooling
- Async processing for AI analysis
- CDN for image delivery

## Monitoring & Logging

### Logging
- Structured logging with Winston
- Request/response logging
- Error tracking
- Performance metrics

### Health Checks
- Database connectivity
- AI service availability
- File storage accessibility
- Overall system status

## Development Workflow

### Code Quality
- ESLint + Prettier configuration
- Husky pre-commit hooks
- Conventional commit messages
- Code review process

### API Documentation
- Swagger/OpenAPI 3.0 specification
- Interactive API documentation
- Request/response examples
- Error code documentation

This backend plan provides a solid foundation for the FoodScanner app using Sequelize ORM and Swagger documentation, covering all the functionality needed to support the React Native frontend while maintaining security, scalability, and maintainability.
