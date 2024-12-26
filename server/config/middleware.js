import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from '../middleware/error.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

export const configureMiddleware = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));
  app.use('/api', apiLimiter);
  app.use(errorHandler);
};