import rateLimit from 'express-rate-limit';
import { config } from '../config/environment';


export const createRateLimiter = (
  windowMs: number = config.RATE_LIMIT_WINDOW_MS,
  max: number = config.RATE_LIMIT_MAX_REQUESTS,
  message?: string | object
) => {
  return rateLimit({
    windowMs,
    max,
    message: message || {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests from this IP, please try again later.',
      },
      timestamp: new Date().toISOString(),
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
      res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests from this IP, please try again later.',
          retryAfter: Math.ceil(windowMs / 1000),
        },
        timestamp: new Date().toISOString(),
      });
    },
    skip: (req) => {
      // Skip rate limiting for health checks
      return req.path === '/health';
    },
    keyGenerator: (req) => {
      // Use IP address as key, but consider X-Forwarded-For header for proxies
      return req.headers['x-forwarded-for'] as string || req.ip || req.connection.remoteAddress || 'unknown';
    },
  });
};

// Specific rate limiters for different endpoints
export const authRateLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // 5 attempts
  {
    success: false,
    error: {
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts, please try again later.',
    },
    timestamp: new Date().toISOString(),
  }
);

export const foodScanRateLimiter = createRateLimiter(
  60 * 1000, // 1 minute
  10, // 10 scans per minute
  {
    success: false,
    error: {
      code: 'FOOD_SCAN_RATE_LIMIT_EXCEEDED',
      message: 'Too many food scans, please try again later.',
    },
    timestamp: new Date().toISOString(),
  }
);

export const generalApiRateLimiter = createRateLimiter(
  config.RATE_LIMIT_WINDOW_MS,
  config.RATE_LIMIT_MAX_REQUESTS
);
