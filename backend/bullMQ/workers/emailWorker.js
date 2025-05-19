// bullMQ/workers/emailWorker.js

/**
 * Worker for sending emails
 * Run this file after Njangi is submitted to the database(draft)
 * do => node bullMQ/workers/emailWorker.js
 */
import { Worker } from "bullmq";
import { createRedisClient } from "../../redisClient.js";
import { sendNjangiCreatedPendingEmail } from "../../mailtrap/emails.js";

const redis = createRedisClient();

const worker = new Worker(
  "emailQueue",
  async (job) => {
    const {
      email,
      userName,
      groupName,
      creationDate,
      memberCount,
      contributionAmount,
      viewURL,
    } = job.data;

    console.log(`🚀 Sending email to ${email}...`);

    await sendNjangiCreatedPendingEmail(
      email,
      userName,
      groupName,
      creationDate,
      memberCount,
      contributionAmount,
      viewURL
    );

    console.log(`Email sent to ${email}`);
  },
  {
    connection: redis,
  }
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});
