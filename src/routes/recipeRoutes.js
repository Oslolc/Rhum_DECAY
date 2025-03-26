const express = require('express');
const { createRecipe, getRecipes, searchRecipes } = require('../controllers/recipeController');
const router = express.Router();

router.post('/', createRecipe);
router.get('/', getRecipes);
router.get('/search', searchRecipes);

module.exports = router;
