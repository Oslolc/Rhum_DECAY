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

exports.getRecipes = async (req, res) => {
  try {
      const { page = 1, limit = 10 } = req.query;
      const recipes = await Recipe.find()
          .populate('rhum', 'name')
          .populate('ingredients', 'name')
          .skip((page - 1) * limit)
          .limit(parseInt(limit));

      res.json(recipes);
  } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};


exports.searchRecipes = async (req, res) => {
  try {
      const { name } = req.query;
      if (!name) return res.status(400).json({ message: "Veuillez fournir un nom" });

      const recipes = await Recipe.find({ name: new RegExp(name, 'i') })
          .populate('rhum', 'name')
          .populate('ingredients', 'name');

      res.json(recipes);
  } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
