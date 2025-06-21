import { Schema, model } from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const inviteSchema = new Schema(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.GROUP,
      required: true,
    },
    email: { type: String, sparse: true },
    phone: { type: String, sparse: true },
    inviteToken: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "expired"],
      default: "pending",
    },
    invitedBy: String,
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

inviteSchema.index(
  { groupId: 1, email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $type: "string" } },
  }
);

inviteSchema.index(
  { groupId: 1, phone: 1 },
  {
    unique: true,
    partialFilterExpression: { phone: { $type: "string" } },
  }
);

// Compound unique indexes for group+email and group+phone
// inviteSchema.index({ groupId: 1, email: 1 }, { unique: true, sparse: true });
// inviteSchema.index({ groupId: 1, phone: 1 }, { unique: true, sparse: true });

const Invite = model(MODEL_NAMES.INVITE, inviteSchema);

export default Invite;
