const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      minLength: [5, "Product name must be atleast 5 characters"],
      trim: true,
    },
    description: {
      type: String,
      minLength: [5, "Product Description must be atleast 5 characters"],
    },
    productImage: {
      type: String,
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      default: 10,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    category: {
      type: String,
      enum: ["veg", "non-veg", "drinks", "sides"],
      default: "veg",
    },
    inStock: {
      type: Boolean,
      required: [true, "In stock status is required"],
      default: true,
    },
    // discount: {
    //     type: Number,
    //     default: 0,
    //     min: 0,
    //     max: 100,
    // }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
