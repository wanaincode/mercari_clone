import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    seller: { type: String, required: true },
    sold: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;