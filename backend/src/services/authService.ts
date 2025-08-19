import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { models } from '../models';
import { config } from '../config/environment';
import { createError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';
import { 
  LoginRequest, 
  RegisterRequest, 
  RefreshTokenRequest,
  LoginResponse,
  RegisterResponse,
  RefreshTokenResponse,
  LogoutResponse,
  VerifyTokenResponse,
  TokenPayload,
  RefreshTokenPayload
} from '../types/auth';

export class AuthService {
  /**
   * Register a new user
   */
  static async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      // Check if user already exists
      const existingUser = await models.User.findOne({
        where: { email: userData.email }
      });

      if (existingUser) {
        throw createError('User with this email already exists', 409, 'USER_EXISTS');
      }

      // Hash password
      const saltRounds = config.BCRYPT_SALT_ROUNDS;
      const passwordHash = await bcrypt.hash(userData.password, saltRounds);

      // Create user
      const user = await models.User.create({
        name: userData.name,
        email: userData.email,
        passwordHash,
        plan: 'basic',
        weightUnit: 'KG',
        heightUnit: 'CM',
        isOnboardingCompleted: false,
      });

      // Generate tokens
      const { accessToken, refreshToken } = await this.generateTokens(user.id, user.email, user.name);

      // Store refresh token
      await this.storeRefreshToken(user.id, refreshToken);

      logger.info('User registered successfully', { userId: user.id, email: user.email });

      return {
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            isOnboardingCompleted: user.isOnboardingCompleted,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
          },
          accessToken,
          refreshToken,
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      logger.error('Registration failed:', error);
      throw error;
    }
  }

  /**
   * Login user
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      // Find user by email
      const user = await models.User.findOne({
        where: { email: credentials.email }
      });

      if (!user) {
        throw createError('Invalid credentials', 401, 'AUTH_001');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);
      if (!isPasswordValid) {
        throw createError('Invalid credentials', 401, 'AUTH_001');
      }

      // Generate tokens
      const { accessToken, refreshToken } = await this.generateTokens(user.id, user.email, user.name);

      // Store refresh token
      await this.storeRefreshToken(user.id, refreshToken);

      logger.info('User logged in successfully', { userId: user.id, email: user.email });

      return {
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            plan: user.plan,
            age: user.age || undefined,
            weight: user.weight || undefined,
            weightUnit: user.weightUnit,
            height: user.height || undefined,
            heightUnit: user.heightUnit,
            gender: user.gender || undefined,
            fitnessGoal: user.fitnessGoal || undefined,
            gymActivity: user.gymActivity || undefined,
            dietFocus: user.dietFocus || undefined,
            isOnboardingCompleted: user.isOnboardingCompleted,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
          },
          accessToken,
          refreshToken,
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      logger.error('Login failed:', error);
      throw error;
    }
  }

  /**
   * Refresh access token
   */
  static async refreshToken(tokenData: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    try {
      // Verify refresh token
      const decoded = jwt.verify(tokenData.refreshToken, config.JWT_REFRESH_SECRET) as RefreshTokenPayload;

      // Check if refresh token exists and is valid
      const storedToken = await models.RefreshToken.findOne({
        where: {
          id: decoded.tokenId,
          userId: decoded.userId,
          expiresAt: { [Op.gt]: new Date() }
        }
      });

      if (!storedToken) {
        throw createError('Invalid or expired refresh token', 401, 'AUTH_002');
      }

      // Get user
      const user = await models.User.findByPk(decoded.userId);
      if (!user) {
        throw createError('User not found', 401, 'AUTH_003');
      }

      // Generate new tokens
      const { accessToken, refreshToken } = await this.generateTokens(user.id, user.email, user.name);

      // Update refresh token in database
      await storedToken.update({
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });

      logger.info('Token refreshed successfully', { userId: user.id });

      return {
        success: true,
        data: {
          accessToken,
          refreshToken,
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      logger.error('Token refresh failed:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  static async logout(userId: string): Promise<LogoutResponse> {
    try {
      // Remove all refresh tokens for the user
      await models.RefreshToken.destroy({
        where: { userId }
      });

      logger.info('User logged out successfully', { userId });

      return {
        success: true,
        message: 'Logged out successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      logger.error('Logout failed:', error);
      throw error;
    }
  }

  /**
   * Verify access token
   */
  static async verifyToken(token: string): Promise<VerifyTokenResponse> {
    try {
      // Verify token
      const decoded = jwt.verify(token, config.JWT_SECRET) as TokenPayload;

      // Get user
      const user = await models.User.findByPk(decoded.userId);
      if (!user) {
        throw createError('User not found', 401, 'AUTH_003');
      }

      return {
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            plan: user.plan,
            age: user.age || undefined,
            weight: user.weight || undefined,
            weightUnit: user.weightUnit,
            height: user.height || undefined,
            heightUnit: user.heightUnit,
            gender: user.gender || undefined,
            fitnessGoal: user.fitnessGoal || undefined,
            gymActivity: user.gymActivity || undefined,
            dietFocus: user.dietFocus || undefined,
            isOnboardingCompleted: user.isOnboardingCompleted,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
          },
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      logger.error('Token verification failed:', error);
      throw error;
    }
  }

  /**
   * Generate access and refresh tokens
   */
  private static async generateTokens(userId: string, email: string, name: string) {
    const tokenId = uuidv4();
    
    const accessToken = (jwt as any).sign(
      { userId, email, name } as TokenPayload,
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );

    const refreshToken = (jwt as any).sign(
      { userId, tokenId } as RefreshTokenPayload,
      config.JWT_REFRESH_SECRET,
      { expiresIn: config.JWT_REFRESH_EXPIRES_IN }
    );

    return { accessToken, refreshToken };
  }

  /**
   * Store refresh token in database
   */
  private static async storeRefreshToken(userId: string, token: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await models.RefreshToken.create({
      token,
      userId,
      expiresAt,
    });
  }

  /**
   * Clean up expired refresh tokens
   */
  static async cleanupExpiredTokens() {
    try {
      const deletedCount = await models.RefreshToken.destroy({
        where: {
          expiresAt: { [Op.lt]: new Date() }
        }
      });

      if (deletedCount > 0) {
        logger.info(`Cleaned up ${deletedCount} expired refresh tokens`);
      }
    } catch (error) {
      logger.error('Failed to cleanup expired tokens:', error);
    }
  }
}
