const express = require("express");
const { createRecipe } = require("../controllers/recipeController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createRecipe);

module.exports = router;