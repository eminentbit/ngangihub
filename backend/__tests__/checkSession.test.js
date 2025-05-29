import request from "supertest";
import express from "express";
import { checkSession } from "../controllers/auth.controller";
import User from "../models/user.model";

jest.mock("../models/user.model");

describe("checkSession Controller", () => {
  let app;
  let server;

  beforeAll((done) => {
    app = express();
    app.use(express.json());
    app.get("/session", (req, res) => {
      // Simulate the presence of req.user
      req.user = req.hasOwnProperty("user") ? req.user : undefined;
      checkSession(req, res);
    });
    // Start the server once before all tests
    server = app.listen(3001, done);
  });

  afterAll((done) => {
    if (server) {
      server.close((err) => {
        if (err) {
          console.error("Error closing server:", err);
          return done(err);
        }
        done();
      });
    } else {
      done();
    }
  });

  it("should return 401 if req.user is not defined", async () => {
    const response = await request(app).get("/session");
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Unauthorized: No session found");
  });

  it("should return 401 if req.user.id is not defined", async () => {
    const response = await request(app)
      .get("/session")
      .use((req, res, next) => {
        req.user = {}; // Simulate req.user without id
        next();
      });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Unauthorized: No session found");
  });

  it("should return 401 if user is not found", async () => {
    User.findById.mockResolvedValue(null);

    const response = await request(app)
      .get("/session")
      .use((req, res, next) => {
        req.user = { id: "user123" };
        next();
      });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Unauthorized: User not found");
    expect(User.findById).toHaveBeenCalledWith("user123");
  });

  it("should return 200 and the user data if found", async () => {
    const mockUser = { id: "user123", email: "test@example.com" };
    User.findById.mockResolvedValue(mockUser);

    const response = await request(app)
      .get("/session")
      .use((req, res, next) => {
        req.user = { id: "user123" };
        next();
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual(mockUser);
    expect(User.findById).toHaveBeenCalledWith("user123");
  });

  it("should return 500 if there is an internal server error", async () => {
    User.findById.mockRejectedValue(new Error("Database error"));

    const response = await request(app)
      .get("/session")
      .use((req, res, next) => {
        req.user = { id: "user123" };
        next();
      });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe("Internal server error");
    expect(User.findById).toHaveBeenCalledWith("user123");
  });
});
