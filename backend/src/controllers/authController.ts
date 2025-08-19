import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { logger } from '../utils/logger';
import { 
  LoginRequest, 
  RegisterRequest, 
  RefreshTokenRequest 
} from '../types/auth';

export class AuthController {
  /**
   * Register a new user
   */
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: RegisterRequest = req.body;
      
      logger.info('User registration attempt', { email: userData.email });
      
      const result = await AuthService.register(userData);
      
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login user
   */
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const credentials: LoginRequest = req.body;
      
      logger.info('User login attempt', { email: credentials.email });
      
      const result = await AuthService.login(credentials);
      
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Refresh access token
   */
  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenData: RefreshTokenRequest = req.body;
      
      logger.info('Token refresh attempt');
      
      const result = await AuthService.refreshToken(tokenData);
      
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Logout user
   */
  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.body.userId;
      
      logger.info('User logout attempt', { userId });
      
      const result = await AuthService.logout(userId);
      
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Verify access token
   */
    static async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'AUTH_003',
            message: 'Access token required',
          },
          timestamp: new Date().toISOString(),
        });
      }

      logger.info('Token verification attempt');

      const result = await AuthService.verifyToken(token);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}
