require("dotenv").config({ path: "./configs/.env" });
const mongoose = require("mongoose");
const Patient = require("./models/patient");

// This is the sample data. You can also move this to a separate file if you prefer.
const sampleData = [
  {
    name: "Quentin Gray",
    age: 52,
    gender: "Male",
    vitalHistory: [
      {
        heartRate: 84,
        bloodPressureSystolic: 142,
        bloodPressureDiastolic: 92,
        oxygenSaturation: 95,
        temperature: 37.1,
      },
    ],
    risk: true,
  },
  {
    name: "Rachel Silver",
    age: 45,
    gender: "Female",
    vitalHistory: [
      {
        heartRate: 78,
        bloodPressureSystolic: 130,
        bloodPressureDiastolic: 84,
        oxygenSaturation: 97,
        temperature: 36.8,
      },
    ],
    risk: false,
  },

  {
    name: "John Doe",
    age: 45,
    gender: "Male",
    vitalHistory: [
      {
        heartRate: 72,
        bloodPressureSystolic: 120,
        bloodPressureDiastolic: 80,
        oxygenSaturation: 98,
        temperature: 36.6,
      },
    ],
    risk: false,
  },
  {
    name: "Jane Smith",
    age: 62,
    gender: "Female",
    vitalHistory: [
      {
        heartRate: 88,
        bloodPressureSystolic: 145,
        bloodPressureDiastolic: 95,
        oxygenSaturation: 94,
        temperature: 37.2,
      },
    ],
    risk: true,
  },
  {
    name: "Bob Johnson",
    age: 30,
    gender: "Male",
    vitalHistory: [
      {
        heartRate: 68,
        bloodPressureSystolic: 118,
        bloodPressureDiastolic: 75,
        oxygenSaturation: 99,
        temperature: 36.5,
      },
    ],
    risk: false,
  },
  {
    name: "Alice Brown",
    age: 55,
    gender: "Female",
    vitalHistory: [
      {
        heartRate: 92,
        bloodPressureSystolic: 160,
        bloodPressureDiastolic: 100,
        oxygenSaturation: 93,
        temperature: 37.8,
      },
    ],
    risk: true,
  },
  {
    name: "Charlie Wilson",
    age: 40,
    gender: "Male",
    vitalHistory: [
      {
        heartRate: 75,
        bloodPressureSystolic: 130,
        bloodPressureDiastolic: 85,
        oxygenSaturation: 97,
        temperature: 36.7,
      },
    ],
    risk: false,
  },
  {
    name: "Diana Miller",
    age: 70,
    gender: "Female",
    vitalHistory: [
      {
        heartRate: 95,
        bloodPressureSystolic: 170,
        bloodPressureDiastolic: 105,
        oxygenSaturation: 91,
        temperature: 38.2,
      },
    ],
    risk: true,
  },
  {
    name: "Edward Davis",
    age: 35,
    gender: "Male",
    vitalHistory: [
      {
        heartRate: 110,
        bloodPressureSystolic: 150,
        bloodPressureDiastolic: 95,
        oxygenSaturation: 92,
        temperature: 38.5,
      },
    ],
    risk: true,
  },
  {
    name: "Fiona Taylor",
    age: 50,
    gender: "Female",
    vitalHistory: [
      {
        heartRate: 82,
        bloodPressureSystolic: 140,
        bloodPressureDiastolic: 90,
        oxygenSaturation: 95,
        temperature: 37.0,
      },
    ],
    risk: true,
  },
  {
    name: "George White",
    age: 65,
    gender: "Male",
    vitalHistory: [
      {
        heartRate: 78,
        bloodPressureSystolic: 135,
        bloodPressureDiastolic: 88,
        oxygenSaturation: 96,
        temperature: 36.8,
      },
    ],
    risk: false,
  },
  {
    name: "Hannah Green",
    age: 28,
    gender: "Female",
    vitalHistory: [
      {
        heartRate: 65,
        bloodPressureSystolic: 110,
        bloodPressureDiastolic: 70,
        oxygenSaturation: 99,
        temperature: 36.5,
      },
    ],
    risk: false,
  },
];

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
