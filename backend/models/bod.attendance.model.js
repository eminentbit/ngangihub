import mongoose from "mongoose";

const bodAttendanceSchema = new mongoose.Schema(
  {
    bodMember: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BODMember",
      required: true,
    },
    meetingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
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

const Attendance = mongoose.model("BODAttendance", bodAttendanceSchema);

export default Attendance;
