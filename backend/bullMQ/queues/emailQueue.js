// bullMQ/queues/emailQueue.js
import { Queue } from "bullmq";
import { createRedisClient } from "../../redisClient.js";
import CACHE_NAMES from "../../utils/cache.names.js";

const redis = createRedisClient();

const emailQueue = new Queue(CACHE_NAMES.EMAILQUEUE, {
  connection: redis,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
  },
});

redis.on("connect", () => {
  console.log("Connected to Redis successfully");
});

redis.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

export default emailQueue;
