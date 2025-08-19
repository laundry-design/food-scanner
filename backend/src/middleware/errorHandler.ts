import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let { statusCode = 500, message, code } = error;

  // Log error
  logger.error('Error occurred:', {
    error: {
      message: error.message,
      stack: error.stack,
      code: error.code,
      statusCode: error.statusCode,
    },
    request: {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    },
  });

  // Handle Sequelize validation errors
  if (error.name === 'SequelizeValidationError') {
    statusCode = 400;
    code = 'VAL_001';
    message = 'Validation error';
  }

  // Handle Sequelize unique constraint errors
  if (error.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
    code = 'DB_001';
    message = 'Resource already exists';
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    code = 'AUTH_002';
    message = 'Invalid token';
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    code = 'AUTH_002';
    message = 'Token expired';
  }

  // Handle file upload errors
  if (error.message.includes('File too large')) {
    statusCode = 400;
    code = 'FILE_001';
    message = 'File size too large';
  }

  if (error.message.includes('Invalid file type')) {
    statusCode = 400;
    code = 'FILE_001';
    message = 'Invalid file type';
  }

  // Handle OpenAI API errors
  if (error.message.includes('OpenAI API')) {
    statusCode = 503;
    code = 'AI_001';
    message = 'AI service temporarily unavailable';
  }

  // Default error response
  const errorResponse = {
    success: false,
    error: {
      code: code || 'INTERNAL_ERROR',
      message: message || 'Internal server error',
      ...(process.env['NODE_ENV'] === 'development' && { stack: error.stack }),
    },
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(errorResponse);
};

export const createError = (message: string, statusCode: number = 500, code?: string): AppError => {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  error.isOperational = true;
  return error;
};

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  const error = createError(`Route ${req.originalUrl} not found`, 404, 'NOT_FOUND');
  next(error);
};
