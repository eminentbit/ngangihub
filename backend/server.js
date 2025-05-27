import express from "express";
import ConnectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import createNjangiRoutes from "./routes/create.njangi.route.js";
import validationRoutes from "./routes/validation.js";
import actionNjangiRoutes from "./routes/bod.njangi.route.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
); // allow cross-origin requests
app.use(cookieParser()); // allow cookie parsing

//routes
app.use("/api/create-njangi", createNjangiRoutes);
app.use("/api/bod", actionNjangiRoutes); // handles BOD approval and rejection of njangi
app.use("/api", validationRoutes); // validates upon filling form
app.use("/api/auth", authRoutes);

const startServer = async () => {
  try {
    await ConnectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
