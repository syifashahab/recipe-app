const validateRecipe = (req, res, next) => {
  const { name, ingredients, steps } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Nama wajib" });
  }

  if (!ingredients || ingredients.length < 1) {
    return res.status(400).json({ message: "Minimal 1 bahan" });
  }

  if (!steps || steps.length < 1) {
    return res.status(400).json({ message: "Minimal 1 langkah" });
  }

  next();
};

module.exports = validateRecipe;