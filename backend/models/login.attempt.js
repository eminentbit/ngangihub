import { Schema, model } from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const lastLoginSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.USER,
      required: true,
    },
    email: { type: String, required: true },
    ipAddress: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const LastLogin = model(MODEL_NAMES.LOGINATTEMPT, lastLoginSchema);

export default LastLogin;
