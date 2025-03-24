const express = require("express");
const router = express.Router();
const { addIngredient, getIngredients, searchIngredients } = require("../controllers/ingredientController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addIngredient); // Ajouter un ingrédient
router.get("/", getIngredients); // Lister tous les ingrédients
router.get("/search", searchIngredients); // Rechercher par nom/type

module.exports = router;