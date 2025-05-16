const express = require('express');
const { createRecipe, getRecipes, searchRecipes, getPublicRecipes, updateRecipe } = require('../controllers/recipeController');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

console.log("Routes")

router.post('/', authMiddleware, createRecipe);
router.get('/', getRecipes);
router.get('/search', searchRecipes);
router.get('/public', getPublicRecipes);
router.put("/:id", authMiddleware, updateRecipe);

module.exports = router;
