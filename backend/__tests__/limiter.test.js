import request from "supertest";
import express from "express";
import limiter from "../middleware/limiter";

describe("Rate Limiter Middleware", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    // Apply the rate limiter to a specific route for testing
    app.use("/protected", limiter, (req, res) => {
      res.status(200).json({ message: "Protected resource accessed!" });
    });
  });

  it("should allow requests within the rate limit", async () => {
    for (let i = 0; i < 10; i++) {
      // Send multiple requests within the limit
      const response = await request(app).get("/protected");
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Protected resource accessed!");
      expect(response.headers["x-ratelimit-remaining"]).toBeDefined();
      expect(
        parseInt(response.headers["x-ratelimit-remaining"])
      ).toBeGreaterThan(90 - i); // Assuming initial max is 100
    }
  });

  it("should return 429 Too Many Requests when the limit is exceeded", async () => {
    // Make initial requests to exhaust the limit (plus one)
    for (let i = 0; i < 100; i++) {
      await request(app).get("/protected");
    }

    const response = await request(app).get("/protected");
    expect(response.statusCode).toBe(429);
    expect(response.body.message).toBe(
      "Too many requests, please try again later."
    );
    expect(response.headers["retry-after"]).toBeDefined();
    expect(response.headers["x-ratelimit-remaining"]).toBe("0");
  });

  it(
    "should reset the limit after the windowMs period",
    async () => {
      // Exhaust the limit
      for (let i = 0; i < 100; i++) {
        await request(app).get("/protected");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for the windowMs

      // Now a new request should be allowed
      const response = await request(app).get("/protected");
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Protected resource accessed!");
      expect(
        parseInt(response.headers["x-ratelimit-remaining"])
      ).toBeGreaterThanOrEqual(99); // Limit should be reset
    },
    16 * 60 * 1000
  ); // Increase timeout to accommodate the waiting period
});
