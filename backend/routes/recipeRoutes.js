const express = require("express");
const router = express.Router();

const validateRecipe = require("../middlewares/validateRecipe");

const {
  getRecipes,
  createRecipe,
  deleteRecipe,
  updateRecipe,
} = require("../controllers/recipeController");

router.get("/", getRecipes);
router.post("/", validateRecipe, createRecipe);
router.delete("/:id", deleteRecipe);
router.put("/:id", updateRecipe);

module.exports = router;