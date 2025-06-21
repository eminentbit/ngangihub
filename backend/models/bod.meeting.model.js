import { Schema, model } from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const meetingSchema = new Schema(
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
        type: Schema.Types.ObjectId,
        ref: MODEL_NAMES.USER,
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
            type: Schema.Types.ObjectId,
            ref: MODEL_NAMES.USER,
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

const Meeting = model(MODEL_NAMES.BODMEETING, meetingSchema);

export default Meeting;
