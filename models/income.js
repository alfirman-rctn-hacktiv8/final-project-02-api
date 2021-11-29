const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  total: { type: Number, required: true },
  products: {
    type: [
      {
        productId: String,
        name: String,
        price: Number,
        category: String,
        sold: Number,
        total: Number,
      },
    ],
  },
});

module.exports = mongoose.model("Income", incomeSchema);
