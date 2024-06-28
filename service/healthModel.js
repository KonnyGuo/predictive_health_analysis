const brain = require("brain.js");

function createModel() {
  return new brain.NeuralNetwork({
    hiddenLayers: [10, 5],
  });
}

function normalizeData(data) {
  return {
    heartRate: data.heartRate / 200,
    bloodPressureSystolic: data.bloodPressureSystolic / 200,
    bloodPressureDiastolic: data.bloodPressureDiastolic / 150,
    oxygenSaturation: data.oxygenSaturation / 100,
    temperature: (data.temperature - 35) / 5,
  };
}

function prepareTrainingData(rawData) {
  return rawData.map((item) => ({
    input: normalizeData(item.vitals),
    output: { highRisk: item.risk ? 1 : 0 },
  }));
}

function trainModel(model, trainingData) {
  return model.train(trainingData);
}

function predict(model, inputData) {
  const normalizedInput = normalizeData(inputData);
  return model.run(normalizedInput);
}

module.exports = { createModel, prepareTrainingData, trainModel, predict };
