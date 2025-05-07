// models/NjangiDraft.js
import mongoose from 'mongoose';

const njangiDraftSchema = new mongoose.Schema({
  accountSetup: {
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    passwordHash: String,
    verificationToken: String,
    verificationTokenExpireAt: Date,
  },
  groupDetails: {
    name: String,
    contributionAmount: Number,
    contributionFrequency: String,
    payoutMethod: String,
    startDate: Date,
    endDate: Date,
    expectedMembers: Number,
    rules: String,
  },
  inviteMembers: [
    {
      contact: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model("NjangiDraft", njangiDraftSchema);
