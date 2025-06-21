import { Schema, model } from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const paymentMethodSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: MODEL_NAMES.USER,
    required: true,
  },
  type: {
    type: String,
    enum: ["card", "mobile_money"],
    required: true,
  },
  paymentMode: {
    type: String,
    enum: ["free", "starter", "enterprise"],
    default: "free",
  },
  // Card specific fields
  cardNumber: {
    type: String,
    sparse: true,
    validate: {
      validator: function (v) {
        return this.type === "card" ? v && v.length >= 13 : true;
      },
    },
  },
  cardExpiry: {
    type: String,
    sparse: true,
  },
  cardHolder: {
    type: String,
    sparse: true,
  },
  // Mobile money specific fields
  phoneNumber: {
    type: String,
    sparse: true,
    validate: {
      validator: function (v) {
        return this.type === "mobile_money" ? v && v.length >= 9 : true;
      },
    },
  },
  provider: {
    type: String,
    enum: ["MTN", "Orange", "Airtel"],
    sparse: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PaymentMethod = model(MODEL_NAMES.PAYMENTMETHOD, paymentMethodSchema);

export default PaymentMethod;
