import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { config } from '../config/environment';
import { createError } from './errorHandler';
import { models } from '../models';
import { UserContext } from '../types/common';

export interface AuthenticatedRequest extends Request {
  user?: UserContext;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next(createError('Access token required', 401, 'AUTH_003'));
    }

    try {
      const decoded = jwt.verify(token, config.JWT_SECRET) as any;
      
      // Check if user exists
      const user = await models.User.findByPk(decoded.userId);
      if (!user) {
        return next(createError('User not found', 401, 'AUTH_003'));
      }

      // Check if refresh token exists and is valid
      const refreshToken = await models.RefreshToken.findOne({
        where: {
          userId: decoded.userId,
          token: token,
          expiresAt: { [Op.gt]: new Date() }
        }
      });

      if (!refreshToken) {
        return next(createError('Invalid or expired token', 401, 'AUTH_002'));
      }

      req.user = {
        userId: user.id,
        email: user.email,
        name: user.name,
      };

      next();
    } catch (jwtError) {
      if (jwtError instanceof jwt.TokenExpiredError) {
        return next(createError('Token expired', 401, 'AUTH_002'));
      }
      return next(createError('Invalid token', 401, 'AUTH_002'));
    }
  } catch (error) {
    next(error);
  }
};

export const authenticateRefreshToken = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(createError('Refresh token required', 400, 'AUTH_001'));
    }

    try {
      const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET) as any;
      
      // Check if refresh token exists in database
      const storedToken = await models.RefreshToken.findOne({
        where: {
          id: decoded.tokenId,
          userId: decoded.userId,
          expiresAt: { [Op.gt]: new Date() }
        }
      });

      if (!storedToken) {
        return next(createError('Invalid or expired refresh token', 401, 'AUTH_002'));
      }

      // Check if user exists
      const user = await models.User.findByPk(decoded.userId);
      if (!user) {
        return next(createError('User not found', 401, 'AUTH_003'));
      }

      req.body.userId = decoded.userId;
      next();
    } catch (jwtError) {
      if (jwtError instanceof jwt.TokenExpiredError) {
        return next(createError('Refresh token expired', 401, 'AUTH_002'));
      }
      return next(createError('Invalid refresh token', 401, 'AUTH_002'));
    }
  } catch (error) {
    next(error);
  }
};

export const requireOnboarding = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError('Authentication required', 401, 'AUTH_003'));
    }

    const user = await models.User.findByPk(req.user.userId);
    if (!user) {
      return next(createError('User not found', 401, 'AUTH_003'));
    }

    if (!user.isOnboardingCompleted) {
      return next(createError('Onboarding must be completed first', 403, 'ONBOARDING_REQUIRED'));
    }

    next();
  } catch (error) {
    next(error);
  }
};
