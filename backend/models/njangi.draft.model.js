// models/NjangiDraft.js
import mongoose from "mongoose";
import User from "./user.model.js";

const njangiDraftSchema = new mongoose.Schema(
  {
    // accountSetup: {
    //   firstName: String,
    //   lastName: String,
    //   email: String,
    //   phoneNumber: String,
    //   password: String,
    //   profilePicUrl: String,
    //   passwordHash: String,
    //   verificationToken: String,
    //   verificationTokenExpireAt: Date,
    // },
    groupDetails: {
      groupName: String,
      contributionAmount: Number,
      contributionFrequency: String,
      payoutMethod: String,
      startDate: Date,
      endDate: Date,
      numberOfMember: Number,
      adminEmail: String,
      rules: String,
      state: {
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("NjangiDraft", njangiDraftSchema);
