import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD
});

redis.on('error', (err) => {
  console.error('Redis Client Error', err);
});

redis.on('connect', () => {
  console.log('Redis Client Connected');
});

export default redis;