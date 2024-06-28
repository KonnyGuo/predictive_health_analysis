const mongoose = require("mongoose");

const vitalSchema = new mongoose.Schema({
  heartRate: Number,
  bloodPressureSystolic: Number,
  bloodPressureDiastolic: Number,
  oxygenSaturation: Number,
  temperature: Number,
  timestamp: { type: Date, default: Date.now },
});

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other", ""],
  },
  vitalHistory: [vitalSchema],
  risk: {
    type: Boolean,
    default: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
