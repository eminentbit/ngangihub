import mongoose from "mongoose";
const { Schema, model } = mongoose;

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
      ref: "Njangi", // or whatever your Njangi model is called
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User", // or whatever your User model is called
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

export default model("Message", messageSchema);
