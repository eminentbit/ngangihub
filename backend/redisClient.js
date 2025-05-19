//redisClient.js
import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export const createRedisClient = () => {
  const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null, // Required by BullMQ
  });

  // Log successful connection
  redis.on("connect", () => {
    console.log("✅ Redis connected successfully");
  });

  // Log errors
  redis.on("error", (err) => {
    console.error("❌ Redis connection error:", err.message);
  });

  return redis;
};
