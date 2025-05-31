import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["message", "follow", "like", "comment", "mention", "system"],
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
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
