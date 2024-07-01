require("dotenv").config({ path: "./configs/.env" });
const connectDB = require("./configs/database");
const mongoose = require("mongoose");
const {
  createModel,
  prepareTrainingData,
  trainModel,
} = require("./service/healthModel");
const Patient = require("./models/patient");

async function getTrainingData() {
  // Fetch all patients from the database
  const patients = await Patient.find();

  // Prepare training data from patient records
  return patients.flatMap((patient) =>
    patient.vitalHistory.map((vitals) => ({
      vitals: vitals,
      risk: patient.risk,
    }))
  );
}

async function trainAndSaveModel() {
  try {
    // Connect to the database
    await connectDB();

    // Get training data
    const rawTrainingData = await getTrainingData();

    // Prepare training data
    const preparedTrainingData = prepareTrainingData(rawTrainingData);

    // Create and train the model
    const model = createModel();
    const trainingResult = trainModel(model, preparedTrainingData);

    console.log("Training completed:", trainingResult);

    // Serialize the model to JSON
    const modelJson = model.toJSON();

    // Save the model to a file
    const fs = require("fs");
    fs.writeFileSync("trained_model.json", JSON.stringify(modelJson));

    console.log("Model training completed and saved to trained_model.json");
  } catch (error) {
    console.error("Error training model:", error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  }
}

// Run the training process
trainAndSaveModel();
