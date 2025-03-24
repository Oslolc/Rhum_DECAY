const Ingredient = require("../models/ingredient");

// Ajouter un ingrédient
exports.addIngredient = async (req, res) => {
  try {
    const { name, type, storeAddress, price } = req.body;
    const newIngredient = new Ingredient({
      name,
      type,
      storeAddress,
      price,
      user: req.user.id,
    });
    await newIngredient.save();
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Récupérer tous les ingrédients (avec pagination)
exports.getIngredients = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const ingredients = await Ingredient.find()
      .populate("user", "name email")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Rechercher un ingrédient par nom ou type
exports.searchIngredients = async (req, res) => {
  try {
    const { name, type } = req.query;
    const query = {};
    if (name) query.name = new RegExp(name, "i");
    if (type) query.type = type;
    const ingredients = await Ingredient.find(query);
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};