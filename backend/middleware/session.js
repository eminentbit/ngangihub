import session from "express-session";
import connectRedis from "connect-redis";
import { createRedisClient } from "./bullMQ/redisClient.js"; // adjust path

const RedisStore = connectRedis(session);
const redisClient = createRedisClient(); // returns an ioredis instance

export const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  name: "njangi_session",
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
});
