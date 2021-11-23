const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  items: { type: Array, required: true },
});

module.exports = mongoose.model("Cart", cartSchema);
