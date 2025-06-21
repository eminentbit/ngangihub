import { Worker } from "bullmq";
import { createRedisClient } from "../../redisClient.js";
import loadModels from "../../utils/loadModels.js";
import CACHE_NAMES from "../../utils/cache.names.js";
import connectDB from "../../config/db.js";

const redis = createRedisClient();

const modelsPromise = loadModels();

export const dbWorker = new Worker(
  CACHE_NAMES.DBQUEUE,
  async (job) => {
    await connectDB();
    const { tableName, data } = job.data;
    const models = await modelsPromise;

    const table = models[tableName.toLowerCase()];
    if (!table) throw new Error(`Unknown table: ${tableName}`);

    try {
      await table.create(data);
      console.log(`✅ DB write to ${tableName} successful:`, data);
    } catch (err) {
      console.error(`❌ DB write to ${tableName} failed:`, err);
      throw err;
    }
  },
  { connection: redis }
);
