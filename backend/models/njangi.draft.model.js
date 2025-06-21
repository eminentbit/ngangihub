// models/NjangiDraft.js
import mongoose from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const njangiDraftSchema = new mongoose.Schema(
  {
    accountSetup: {
      firstName: String,
      lastName: String,
      email: String,
      phoneNumber: String,
      password: String,
      profilePicUrl: String,
      passwordHash: String,
      verificationToken: String,
      verificationTokenExpireAt: Date,
      role: {
        type: String,
        enum: ["admin", "member", "bod"],
        default: "member",
      },
      status: {
        type: String,
        enum: ["active", "pending", "invited", "suspended"],
        default: "pending",
      },
    },
    groupDetails: {
      groupName: String,
      contributionAmount: Number,
      contributionFrequency: String,
      payoutMethod: String,
      startDate: Date,
      endDate: Date,
      numberOfMember: Number,
      // adminEmail: String,
      rules: String,
      status: {
        type: String,
        default: "pending",
      },
    },
    inviteMembers: [
      {
        type: {
          type: String,
          enum: ["email", "phone"],
        },
        value: String,
        contact: String,
      },
    ],
    njangiRouteId: {
      type: String,
      required: true,
      unique: true,
    },
    draftUserToken: { type: String, required: true }, //token to count user number of submmision
    createdAt: {
      type: Date,
      default: Date.now,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.USER,
      required: false,
    },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const NjangiDraft = mongoose.model(MODEL_NAMES.NJANGIDRAFT, njangiDraftSchema);

export default NjangiDraft;
