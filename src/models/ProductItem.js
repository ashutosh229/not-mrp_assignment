import mongoose from "mongoose";

const productItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const productItemModel = mongoose.model("Product Item", productItemSchema);

export default productItemModel;
