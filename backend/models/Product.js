import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/300x300?text=Plant"
    },
    description: { type: String },
    category: { type: String },
    countInStock: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
