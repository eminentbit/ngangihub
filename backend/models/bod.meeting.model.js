import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    agenda: [
      {
        topic: String,
        description: String,
      },
    ],
    minutes: {
      type: [
        {
          title: String,
          date: String,
          summary: String,
          status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending",
          },
          assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          dueDate: Date,
        },
      ],
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;
