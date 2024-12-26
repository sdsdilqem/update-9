import rateLimit from 'express-rate-limit';
import { APP_CONSTANTS } from '../config/constants.js';

export const apiLimiter = rateLimit({
  windowMs: APP_CONSTANTS.RATE_LIMIT.WINDOW_MS,
  max: APP_CONSTANTS.RATE_LIMIT.MAX_REQUESTS,
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});