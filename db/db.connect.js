const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGO_URI;

const initializeDatabase = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
    });
};

module.exports = { initializeDatabase };
