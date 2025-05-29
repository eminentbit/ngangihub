import mongoose from "mongoose";

const lastLoginSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    ipAddress: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const LastLogin = mongoose.model("LastLogin", lastLoginSchema);

export default LastLogin;
