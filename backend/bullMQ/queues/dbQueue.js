// queues/databaseQueue.js
import { Queue } from "bullmq";
import { createRedisClient } from "../../redisClient.js";
import CACHE_NAMES from "../../utils/cache.names.js";

const redis = createRedisClient();

const dbQueue = new Queue(CACHE_NAMES.DBQUEUE, {
  connection: redis,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
  },
});

export default dbQueue;
