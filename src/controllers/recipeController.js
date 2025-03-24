const Recipe = require("../models/recipe");

exports.createRecipe = async (req, res) => {
  try {
    const { name, rum, ingredients, instructions, visibility } = req.body;

    const newRecipe = new Recipe({
      name,
      rum,
      ingredients,
      instructions,
      visibility,
      user: req.user.id,
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Erreur lors de la création de la recette :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};