const brain = require("brain.js");
const fs = require("fs");

let trainedModel;

function loadModel() {
  try {
    const modelData = fs.readFileSync("trained_model.json", "utf8");
    trainedModel = new brain.NeuralNetwork().fromJSON(JSON.parse(modelData));
    console.log("Trained model loaded successfully");
  } catch (error) {
    console.error("Error loading trained model:", error);
    initializeModel();
  }
}

function initializeModel() {
  console.log("Initializing a new model");
  trainedModel = new brain.NeuralNetwork();

  const trainingData = [
    {
      input: normalizeInput({
        heartRate: 70,
        bloodPressureSystolic: 120,
        bloodPressureDiastolic: 80,
        oxygenSaturation: 98,
        temperature: 37,
      }),
      output: { risk: 0 },
    },
    {
      input: normalizeInput({
        heartRate: 110,
        bloodPressureSystolic: 160,
        bloodPressureDiastolic: 100,
        oxygenSaturation: 92,
        temperature: 39,
      }),
      output: { risk: 1 },
    },
    {
      input: normalizeInput({
        heartRate: 55,
        bloodPressureSystolic: 85,
        bloodPressureDiastolic: 55,
        oxygenSaturation: 94,
        temperature: 35.5,
      }),
      output: { risk: 1 },
    },
    {
      input: normalizeInput({
        heartRate: 95,
        bloodPressureSystolic: 145,
        bloodPressureDiastolic: 95,
        oxygenSaturation: 96,
        temperature: 38.5,
      }),
      output: { risk: 1 },
    },
    {
      input: normalizeInput({
        heartRate: 75,
        bloodPressureSystolic: 130,
        bloodPressureDiastolic: 85,
        oxygenSaturation: 97,
        temperature: 36.8,
      }),
      output: { risk: 0 },
    },
  ];

  trainedModel.train(trainingData);
  console.log("New model trained with sample data");
}

function normalizeInput(vitals) {
  return {
    heartRate: vitals.heartRate / 200,
    bloodPressureSystolic: vitals.bloodPressureSystolic / 200,
    bloodPressureDiastolic: vitals.bloodPressureDiastolic / 150,
    oxygenSaturation: vitals.oxygenSaturation / 100,
    temperature: (vitals.temperature - 35) / 5,
  };
}

function assessRisk(vitals) {
  if (!trainedModel) {
    loadModel();
  }

  const normalizedInput = normalizeInput(vitals);
  const result = trainedModel.run(normalizedInput);

  console.log("Input vitals:", vitals);
  console.log("Normalized input:", normalizedInput);
  console.log("Model output:", result);

  // Define thresholds for each vital sign
  const thresholds = {
    heartRate: { low: 60, high: 100 },
    bloodPressureSystolic: { low: 90, high: 140 },
    bloodPressureDiastolic: { low: 60, high: 90 },
    oxygenSaturation: { low: 95 },
    temperature: { low: 36, high: 38 },
  };

  // Check if any vital sign is outside the normal range
  const isAnyVitalAbnormal = Object.keys(thresholds).some((key) => {
    if (thresholds[key].low && vitals[key] < thresholds[key].low) return true;
    if (thresholds[key].high && vitals[key] > thresholds[key].high) return true;
    return false;
  });

  // Combine model prediction with threshold-based check
  const modelRisk = result.risk > 0.5;
  const finalRisk = modelRisk || isAnyVitalAbnormal;

  console.log("Model risk:", modelRisk);
  console.log("Any vital abnormal:", isAnyVitalAbnormal);
  console.log("Final risk assessment:", finalRisk);

  return finalRisk;
}

// Load the model when this module is first required
loadModel();

module.exports = { assessRisk };
