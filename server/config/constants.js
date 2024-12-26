export const APP_CONSTANTS = {
  PORT: process.env.PORT || 5000,
  JWT_EXPIRES: '24h',
  RATE_LIMIT: {
    WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || 900000,
    MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS || 100
  },
  CORS: {
    ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
  }
};