require("dotenv").config({ path: "./configs/.env" });
const mongoose = require("mongoose");
const Patient = require("./models/patient");

// This is the sample data. You can also move this to a separate file if you prefer.
const sampleData = require("./sampleData.json");

async function insertSampleData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Patient.deleteMany({}); // Clear existing data
    console.log("Cleared existing patient data");

    await Patient.insertMany(sampleData);
    console.log("Sample data inserted successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

// Call this function after insertSampleData
insertSampleData();
