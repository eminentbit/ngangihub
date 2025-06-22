import { Schema, model } from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const notificationSchema = new Schema(
  {
    recipients: [
      {
        type: Schema.Types.ObjectId,
        ref: MODEL_NAMES.USER,
        required: true,
      },
    ],
    type: {
      type: String,
      required: true,
      enum: [
        "message",
        "follow",
        "like",
        "comment",
        "mention",
        "system",
        "payment",
        "loan",
        "reminder",
      ],
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    // relatedItem: {
    //   itemId: {
    //     type: Schema.Types.ObjectId,
    //     refPath: "relatedItem.itemType",
    //   },
    //   itemType: {
    //     type: String,
    //     enum: ["Post", "Comment", "User"],
    //   },
    // },
    sender: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.USER,
    },
  },
  {
    timestamps: true,
  }
);

const NjangiNotification = model(
  MODEL_NAMES.NOTIFICATION,
  notificationSchema
);

export default NjangiNotification;
