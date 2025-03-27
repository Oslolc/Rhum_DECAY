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

exports.getPublicRecipes = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const recipes = await Recipe.find({ visibility: "public" })
      .populate("rhum")
      .populate("ingredients")
      .populate("user", "name email")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Recipe.countDocuments({ visibility: "public" });

    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
      recipes,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes publiques :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rhum, ingredients, instructions, visibility } = req.body;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recette non trouvée" });
    }

    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Action non autorisée" });
    }

    recipe.name = name || recipe.name;
    recipe.rhum = rhum || recipe.rhum;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.visibility = visibility || recipe.visibility;

    await recipe.save();
    res.json({ message: "Recette mise à jour avec succès", recipe });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la recette :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};