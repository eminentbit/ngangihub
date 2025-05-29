// bullMQ/queues/emailQueue.js
import { Queue } from "bullmq";
import { createRedisClient } from "../../redisClient.js";

const redis = createRedisClient();

const emailQueue = new Queue("emailQueue", {
  connection: redis,
});

redis.on("connect", () => {
  console.log("Connected to Redis successfully");
});

redis.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

export default emailQueue;
