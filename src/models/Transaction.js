import mongoose from "mongoose";
import { productItemSchema } from "./ProductItem.js";

const transactionSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["sale", "purchase"], required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
    products: [productItemSchema],
    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model("Transaction", transactionSchema);

export default transactionModel;
