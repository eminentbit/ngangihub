// bullMQ/redisClient.js
import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export const createRedisClient = () =>
  new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
  });
