import express from "express";
import ConnectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import createNjangiRoutes from "./routes/create.njangi.route.js";
import validationRoutes from "./routes/validation.routes.js";
import actionNjangiRoutes from "./routes/bod.njangi.route.js";
import authRoutes from "./routes/auth.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import acceptInvite from "./routes/accept.invite.member.route.js";
import limiter from "./middleware/limiter.js";
import helmet from "helmet";
import ValidateInviteToken from "./routes/validate.invite.token.route.js";
import validateDraftId from "./routes/validate.draft.id.route.js";
import adminRoutes from "./routes/admin.routes.js";
import pkg from "lusca";
import session from "express-session";
const { csrf } = pkg;

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
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    name: "njangi_session",
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    },
  })
);
app.use(csrf());

app.use("/", limiter);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
//routes
app.use("/api/create-njangi", createNjangiRoutes);
app.use("/api/bod", actionNjangiRoutes);
app.use("/api", validationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/member", acceptInvite);
app.use(helmet());

app.use("/api/invites", ValidateInviteToken);
app.use("/api/admin", validateDraftId);
app.use("/api/admin", adminRoutes);

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
