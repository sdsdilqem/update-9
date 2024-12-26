import { AppError } from '../utils/errors.js';
import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  // Prisma error handling
  if (err.code) {
    switch (err.code) {
      case 'P2002':
        return res.status(409).json({
          status: 'error',
          message: 'This record already exists'
        });
      case 'P2025':
        return res.status(404).json({
          status: 'error',
          message: 'Record not found'
        });
    }
  }

  // Default error
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};