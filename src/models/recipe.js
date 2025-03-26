const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rhum: { type: mongoose.Schema.Types.ObjectId, ref: "Rhum", required: true },
  ingredients: [
    {
      ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredients", required: true },
      quantity: { type: String, required: true },
    },
  ],
  instructions: { type: String, required: true },
  visibility: { type: String, enum: ["public", "private"], default: "private" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("recipes", recipeSchema);