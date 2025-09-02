const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    minlength: [2, "Name must be at least 2 characters"]
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price can't be negative"]
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Customer ID is required"]
  }
});


const product = mongoose.model("Product", productSchema);
module.exports = product;
