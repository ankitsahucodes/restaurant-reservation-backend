const Restaurant_Table = require("../models/table.model");
const tablesData = require("../data/tablesData.json");

async function seedData() {
  try {
    for (const table of tablesData) {
      const newTable = new Restaurant_Table(table);
      await newTable.save();
    }

    console.log("Tables seeded successfully.");
  } catch (error) {
    console.log("Error seeding tables:", error);
  }
}

module.exports = seedData;
