const Patient = require("../models/patient");
const { assessRisk } = require("../utils/riskAssessment");

exports.createPatient = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      heartRate,
      bloodPressureSystolic,
      bloodPressureDiastolic,
      oxygenSaturation,
      temperature,
    } = req.body;

    const vitals = {
      heartRate: parseInt(heartRate),
      bloodPressureSystolic: parseInt(bloodPressureSystolic),
      bloodPressureDiastolic: parseInt(bloodPressureDiastolic),
      oxygenSaturation: parseInt(oxygenSaturation),
      temperature: parseFloat(temperature),
    };

    const risk = assessRisk(vitals);

    const newPatient = new Patient({
      name,
      age: age || undefined,
      gender: gender || undefined, // This will allow undefined gender
      vitalHistory: [vitals],
      risk,
    });

    const savedPatient = await newPatient.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(400).render("error", { message: error.message });
  }
};

// exports.getAllPatients = async (req, res) => {
//   try {
//     const patients = await Patient.find().sort({ updatedAt: -1 });
//     res.json(patients);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getPatient = async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id);
//     if (!patient) return res.status(404).json({ message: "Patient not found" });
//     res.json(patient);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// exports.updatePatient = async (req, res) => {
//   try {
//     const {
//       name,
//       age,
//       gender,
//       heartRate,
//       bloodPressureSystolic,
//       bloodPressureDiastolic,
//       oxygenSaturation,
//       temperature,
//     } = req.body;

//     const vitals = {
//       heartRate: parseInt(heartRate),
//       bloodPressureSystolic: parseInt(bloodPressureSystolic),
//       bloodPressureDiastolic: parseInt(bloodPressureDiastolic),
//       oxygenSaturation: parseInt(oxygenSaturation),
//       temperature: parseFloat(temperature),
//     };

//     const risk = assessRisk(vitals);

//     const patient = await Patient.findByIdAndUpdate(
//       req.params.id,
//       {
//         name,
//         age: age || undefined,
//         gender: gender || undefined,
//         $push: { vitalHistory: vitals },
//         risk,
//       },
//       { new: true }
//     );

//     if (!patient) return res.status(404).json({ message: "Patient not found" });
//     res.json(patient);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.deletePatient = async (req, res) => {
//   try {
//     const patient = await Patient.findByIdAndDelete(req.params.id);
//     if (!patient) return res.status(404).json({ message: "Patient not found" });
//     res.json({ message: "Patient deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
