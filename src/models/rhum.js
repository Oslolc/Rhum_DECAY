const mongoose = require("mongoose");

const rhumSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rxid_number: String,
    pays: String,
    distillerie: String,
    ABV: String,
    categorie: String,
    vintage: String,
    fabriqueAvec: String,
    distillation: String,
    volume: String,
    age: String,
    type: String,
    degre: Number,
    imagePath: String,
    visible: Boolean
}, { timestamps: true });

module.exports = mongoose.model("Rhum", rhumSchema);