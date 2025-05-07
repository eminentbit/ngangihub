import express from "express";
import ConnectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import createNjangiRoutes from "./routes/create.njangi.route.js";
import validationRoutes from "./routes/validation.js";
import approveNjangiRoutes from "./routes/bod.approve.njangi.route.js"; 

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // allow cross-origin requests
app.use(cookieParser()); // allow cookie parsing

//routes
app.use("/api/create-njangi", createNjangiRoutes);
app.use("/api/approve-njangi", approveNjangiRoutes); // handles BOD approval of njangi
app.use("/api", validationRoutes); // validates upon filling form

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
