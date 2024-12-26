import logger from '../utils/logger.js';
import prisma from '../config/database.js';
import { APP_CONSTANTS } from '../config/constants.js';

export const initializeServer = async (app) => {
  try {
    // Database connection
    await prisma.$connect();
    logger.info('Database connected successfully');

    // Start server
    app.listen(APP_CONSTANTS.PORT, '0.0.0.0', () => {
      logger.info(`Server running on http://localhost:${APP_CONSTANTS.PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
    });

    // Graceful shutdown handler
    setupGracefulShutdown(app);
  } catch (error) {
    logger.error('Server initialization failed:', error);
    process.exit(1);
  }
};

const setupGracefulShutdown = (app) => {
  const shutdown = async (signal) => {
    logger.info(`${signal} received. Starting graceful shutdown`);
    
    try {
      await prisma.$disconnect();
      logger.info('Database disconnected successfully');
      process.exit(0);
    } catch (error) {
      logger.error('Error during shutdown:', error);
      process.exit(1);
    }
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};