import mongoose from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const bodAttendanceSchema = new mongoose.Schema(
  {
    bodMember: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.USER,
      required: true,
    },
    meetingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.BODMEETING,
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Excused"],
      required: true,
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const BODAttendance = mongoose.model(
  MODEL_NAMES.BODATTENDANCE,
  bodAttendanceSchema
);

export default BODAttendance;
