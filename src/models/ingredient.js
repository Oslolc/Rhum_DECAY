const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["fruits", "épices", "sucres", "autres"], required: true },
  storeAddress: { type: String, required: true }, 
  price: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Ingredient", ingredientSchema);