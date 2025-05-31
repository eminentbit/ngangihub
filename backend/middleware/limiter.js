import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1000,
  handler: (req, res) => {
    res.status(429).json({
      message: "Too many requests, please try again later.",
      success: false,
    });
  },
});

export default limiter;
