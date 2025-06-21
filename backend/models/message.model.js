import { Schema, model } from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const attachmentSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["image", "document"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const messageSchema = new Schema(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.GROUP,
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.USER,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    attachment: {
      type: attachmentSchema,
      required: false,
    },
  },
  {
    collection: "messages",
  }
);

export default model(MODEL_NAMES.MESSAGE, messageSchema);
