import { model, Schema } from "mongoose";

const njangiActivityLogSchema = new Schema(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "NjangiGroup",
      required: false,
    },
    activityType: {
      type: String,
      required: true,
      enum: [
        "MEMBER_JOIN",
        "MEMBER_LEAVE",
        "CONTRIBUTION_MADE",
        "NJANGI_CREATION_SUCCESS",
        "NJANGI_CREATION_FAILURE",
        "LOAN_REQUEST",
        "LOAN_APPROVAL",
        "LOAN_REJECTION",
        "LOAN_REPAYMENT",
        "MEETING_SCHEDULED",
        "FINE_ISSUED",
        "FINE_PAYMENT",
        "NJANGI_CREATED",
        "BENEFICIARY_PAYOUT",
      ],
    },
    performedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    affectedMember: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    metadata: {
      type: Map,
      of: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

const NjangiActivityLog = model("NjangiActivityLog", njangiActivityLogSchema);

export default NjangiActivityLog;
