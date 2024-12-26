import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errors.js';
import logger from '../utils/logger.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      throw new AppError('Authentication required', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    
    next();
  } catch (error) {
    logger.error('Authentication failed:', error);
    next(new AppError('Authentication failed', 401));
  }
};

export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError('Unauthorized access', 403);
    }
    next();
  };
};