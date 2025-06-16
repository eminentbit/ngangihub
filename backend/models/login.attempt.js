import mongoose, { Schema } from "mongoose";

const lastLoginSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },
    ipAddress: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const LastLogin = mongoose.model("LastLogin", lastLoginSchema);

export default LastLogin;
