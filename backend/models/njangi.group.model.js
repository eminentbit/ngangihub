// models/NjangiGroup.js
import mongoose from "mongoose";
import User from "./user.model.js";
import njangiDraftModel from "./njangi.draft.model.js";

const njangiGroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    draftId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NjangiDraft",
    },
    contributionAmount: { type: Number, required: true },
    contributionFrequency: {
      type: String,
      enum: ["Weekly", "Monthly", "Bi-weekly"],
      required: true,
    },
    payoutMethod: {
      type: String,
      enum: ["Rotation", "Lottery", "Bidding"],
      required: true,
    },
    groupMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    expectedMembers: { type: Number },
    rules: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    isPublic: { type: Boolean, default: false },
    description: { type: String },
  },
  { timestamps: true }
);

const NjangiGroup = mongoose.model("NjangiGroup", njangiGroupSchema);

export default NjangiGroup;
