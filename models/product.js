const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: false },
  rating: { type: { rate: Number, count: Number }, required: true },
});

module.exports = mongoose.model("Product", productSchema);