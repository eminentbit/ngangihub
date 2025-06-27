import  { model, Schema } from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const bodAttendanceSchema = new Schema(
  {
    bodMember: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.USER,
      required: true,
    },
    meetingId: {
      type: Schema.Types.ObjectId,
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

const BODAttendance = model(
  MODEL_NAMES.BODATTENDANCE,
  bodAttendanceSchema
);

export default BODAttendance;
