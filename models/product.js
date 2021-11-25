const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  category: { type: String, required: true },
  image: { type: String, required: false },
  rating: { type: { rate: Number, count: Number }, required: true },
});

module.exports = mongoose.model("Product", productSchema);
