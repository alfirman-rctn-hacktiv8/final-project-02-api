const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  items: {
    type: [
      {
        productId: String,
        name: String,
        price: Number,
        category: String,
        description: String,
        image: String,
        sold: Number,
        stock: Number,
        rating: { rate: Number, count: Number },
        quantity: Number,
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
