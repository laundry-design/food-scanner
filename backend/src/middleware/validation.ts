import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { createError } from './errorHandler';

export const validateRequest = (schema: z.ZodSchema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(createError('Validation error', 400, 'VAL_001'));
      }
      next(error);
    }
  };
};

// Validation schemas
export const authSchemas = {
  register: z.object({
    body: z.object({
      name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
      email: z.string().email('Invalid email format'),
      password: z.string().min(8, 'Password must be at least 8 characters').max(100, 'Password must be less than 100 characters'),
    }),
  }),

  login: z.object({
    body: z.object({
      email: z.string().email('Invalid email format'),
      password: z.string().min(1, 'Password is required'),
    }),
  }),

  refreshToken: z.object({
    body: z.object({
      refreshToken: z.string().min(1, 'Refresh token is required'),
    }),
  }),
};

export const userSchemas = {
  updateProfile: z.object({
    body: z.object({
      name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters').optional(),
      age: z.number().min(16, 'Age must be at least 16').max(100, 'Age must be less than 100').optional(),
      weight: z.number().min(0, 'Weight must be positive').optional(),
      weightUnit: z.enum(['KG', 'LB']).optional(),
      height: z.number().min(100, 'Height must be at least 100').max(250, 'Height must be less than 250').optional(),
      heightUnit: z.enum(['CM', 'IN']).optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      fitnessGoal: z.string().max(100, 'Fitness goal must be less than 100 characters').optional(),
      gymActivity: z.string().max(50, 'Gym activity must be less than 50 characters').optional(),
      dietFocus: z.string().max(100, 'Diet focus must be less than 100 characters').optional(),
    }),
  }),

  completeOnboarding: z.object({
    body: z.object({
      plan: z.string().min(1, 'Plan is required'),
      age: z.number().min(16, 'Age must be at least 16').max(100, 'Age must be less than 100'),
      weight: z.number().min(0, 'Weight must be positive'),
      weightUnit: z.enum(['KG', 'LB']),
      height: z.number().min(100, 'Height must be at least 100').max(250, 'Height must be less than 250'),
      heightUnit: z.enum(['CM', 'IN']),
      gender: z.enum(['male', 'female', 'other']),
      fitnessGoal: z.string().min(1, 'Fitness goal is required'),
      gymActivity: z.string().min(1, 'Gym activity is required'),
      dietFocus: z.string().min(1, 'Diet focus is required'),
    }),
  }),

  updateGoals: z.object({
    body: z.object({
      targetCalories: z.number().min(0, 'Target calories must be positive').optional(),
      targetProtein: z.number().min(0, 'Target protein must be positive').optional(),
      targetCarbs: z.number().min(0, 'Target carbs must be positive').optional(),
      targetFat: z.number().min(0, 'Target fat must be positive').optional(),
      targetFiber: z.number().min(0, 'Target fiber must be positive').optional(),
    }),
  }),
};

export const foodSchemas = {
  scanFood: z.object({
    body: z.object({
      mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
    }),
  }),

  getHistory: z.object({
    query: z.object({
      date: z.string().optional(),
      mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']).optional(),
      limit: z.string().transform(val => parseInt(val)).pipe(z.number().min(1).max(100)).optional(),
      offset: z.string().transform(val => parseInt(val)).pipe(z.number().min(0)).optional(),
    }),
  }),

  updateFoodItem: z.object({
    params: z.object({
      id: z.string().uuid('Invalid food item ID'),
    }),
    body: z.object({
      name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters').optional(),
      calories: z.number().min(0, 'Calories must be positive').optional(),
      protein: z.number().min(0, 'Protein must be positive').optional(),
      carbs: z.number().min(0, 'Carbs must be positive').optional(),
      fat: z.number().min(0, 'Fat must be positive').optional(),
    }),
  }),
};

export const nutritionSchemas = {
  getDailyNutrition: z.object({
    params: z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format').optional(),
    }),
  }),

  getWeeklyNutrition: z.object({
    query: z.object({
      startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in YYYY-MM-DD format'),
      endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'End date must be in YYYY-MM-DD format'),
    }),
  }),

  getMonthlyNutrition: z.object({
    query: z.object({
      year: z.string().regex(/^\d{4}$/, 'Year must be in YYYY format'),
      month: z.string().regex(/^\d{1,2}$/, 'Month must be 1-12').transform(val => parseInt(val)).pipe(z.number().min(1).max(12)),
    }),
  }),

  manualEntry: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters'),
      calories: z.number().min(0, 'Calories must be positive'),
      protein: z.number().min(0, 'Protein must be positive'),
      carbs: z.number().min(0, 'Carbs must be positive'),
      fat: z.number().min(0, 'Fat must be positive'),
      fiber: z.number().min(0, 'Fiber must be positive').optional(),
      sugar: z.number().min(0, 'Sugar must be positive').optional(),
      sodium: z.number().min(0, 'Sodium must be positive').optional(),
      mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
    }),
  }),
};

export const analyticsSchemas = {
  getTrends: z.object({
    query: z.object({
      timeRange: z.enum(['daily', 'weekly', 'monthly']),
      metric: z.enum(['calories', 'protein', 'carbs', 'fat', 'fiber']),
    }),
  }),

  getMacros: z.object({
    query: z.object({
      timeRange: z.enum(['daily', 'weekly', 'monthly']),
    }),
  }),

  getProgress: z.object({
    query: z.object({
      timeRange: z.enum(['daily', 'weekly', 'monthly']),
    }),
  }),

  getInsights: z.object({
    query: z.object({
      timeRange: z.enum(['daily', 'weekly', 'monthly']),
    }),
  }),
};
