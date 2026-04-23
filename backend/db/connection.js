const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting MongoDB...");

    await mongoose.connect(
      "mongodb://shahabsyifa30_db_user:matchaaa30@ac-ohkmjqv-shard-00-00.dn26mg8.mongodb.net:27017,ac-ohkmjqv-shard-00-01.dn26mg8.mongodb.net:27017,ac-ohkmjqv-shard-00-02.dn26mg8.mongodb.net:27017/resepApp?ssl=true&replicaSet=atlas-edo8vv-shard-0&authSource=admin&retryWrites=true"
    );

    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

module.exports = connectDB;