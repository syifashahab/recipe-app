const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connection");

const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/recipes", recipeRoutes);

app.listen(5000, () => {
  console.log("Server jalan di http://localhost:5000");
});