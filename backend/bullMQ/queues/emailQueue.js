// bullMQ/queues/emailQueue.js
import { Queue } from "bullmq";
import { createRedisClient } from "../../redisClient.js";

const emailQueue = new Queue("emailQueue", {
  connection: createRedisClient(),
});

export default emailQueue;
