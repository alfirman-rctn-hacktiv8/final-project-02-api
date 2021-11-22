const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: {
    type: { district: String, city: String, province: String },
    required: false,
  },
  number: { type: Number, required: false },
});

module.exports = mongoose.model("User", userSchema);
