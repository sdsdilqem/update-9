import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { APP_CONSTANTS } from './constants.js';
import { errorHandler } from '../middleware/error.js';
import { apiLimiter } from '../middleware/rateLimiter.js';
import apiRoutes from '../routes/api.routes.js';

const createApp = () => {
  const app = express();

  // Security middleware
  app.use(cors({
    origin: APP_CONSTANTS.CORS.ORIGIN,
    credentials: true
  }));
  
  app.use(helmet());
  app.use(express.json());
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
  
  // Rate limiting
  app.use('/api', apiLimiter);

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API routes
  app.use('/api', apiRoutes);

  // Error handling
  app.use(errorHandler);

  return app;
};

export default createApp;