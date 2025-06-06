import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);

module.exports = PaymentMethod;
