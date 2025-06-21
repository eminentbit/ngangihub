import mongoose from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const notificationSchema = new mongoose.Schema(
  {
    recipients: [
      {
        type: mongoose.Schema.Types.ObjectId,
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
    //     type: mongoose.Schema.Types.ObjectId,
    //     refPath: "relatedItem.itemType",
    //   },
    //   itemType: {
    //     type: String,
    //     enum: ["Post", "Comment", "User"],
    //   },
    // },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.USER,
    },
  },
  {
    timestamps: true,
  }
);

const NjangiNotification = mongoose.model(
  MODEL_NAMES.NOTIFICATION,
  notificationSchema
);

export default NjangiNotification;
