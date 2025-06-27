// bullMQ/workers/emailWorker.js

/**
 * Worker for sending emails.
 * Start with: node bullMQ/workers/emailWorker.js
 */

import { Worker } from "bullmq";
import { createRedisClient } from "../../redisClient.js";
import {
  sendNjangiCreatedPendingEmail,
  sendPasswordChangedEmail,
  sendPasswordResetEmail,
  sendSigninAttemptEmail,
} from "../../mail/emails.js";
import CACHE_NAMES from "../../utils/cache.names.js";

const redis = createRedisClient();

const worker = new Worker(
  CACHE_NAMES.EMAILQUEUE,
  async (job) => {
    const { name: jobName, data } = job;

    console.log(`🚀 [${jobName}] Sending email...`);
    console.log("Job data:", data);

    switch (jobName) {
      case CACHE_NAMES.LOGINALERT: {
        const {
          to,
          device,
          browser,
          lastName,
          firstName,
          city,
          region,
          country_name,
          ip,
        } = data;

        await sendSigninAttemptEmail(
          to,
          device,
          browser,
          lastName,
          firstName,
          city,
          region,
          country_name,
          ip
        );
        break;
      }

      case CACHE_NAMES.PASSWORDCHANGE: {
        const { to, lastName, firstName, redirectURL } = job.data;
        await sendPasswordChangedEmail(to, lastName, firstName, redirectURL);
        break;
      }

      case CACHE_NAMES.PASSWORDRESET: {
        const { to, token } = job.data;
        await sendPasswordResetEmail(to, token);
        break;
      }

      case CACHE_NAMES.SENDPENDINGEMAIL: {
        const {
          email,
          userName,
          groupName,
          creationDate,
          memberCount,
          contributionAmount,
          viewURL,
        } = data;

        await sendNjangiCreatedPendingEmail(
          email,
          userName,
          groupName,
          creationDate,
          memberCount,
          contributionAmount,
          viewURL
        );
        break;
      }

      default:
        console.warn(`⚠️ Unrecognized job type: ${jobName}`);
    }

    console.log(
      `✅ Email job [${jobName}] completed for ${data.email || data.to}`
    );
  },
  { connection: redis }
);

// Optional logging
worker.on("completed", (job) => {
  console.log(`✅ Job ${job.name} [${job.id}] completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.name} [${job?.id}] failed:`, err);
});
