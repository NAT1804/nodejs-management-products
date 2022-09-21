import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: String,
  category: String,
  freshness: String,
  price: Number,
  comment: String,
  date: {
    type: Date,
    default: new Date(),
  },
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
