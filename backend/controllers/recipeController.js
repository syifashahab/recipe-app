const Recipe = require("../models/Recipe");

// GET
const getRecipes = async (req, res) => {
  const data = await Recipe.find();
  res.json(data);
};

// POST
const createRecipe = async (req, res) => {
  try {
    const data = await Recipe.create(req.body);

    console.log("DATA MASUK DB:", data);

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
const deleteRecipe = async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// UPDATE
const updateRecipe = async (req, res) => {
    try {
        const data = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Update error", error: err.message });
  }
};
  
module.exports = {
  getRecipes,
  createRecipe,
  deleteRecipe,
  updateRecipe,
};