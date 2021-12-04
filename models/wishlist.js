const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
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
        sold: String,
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
