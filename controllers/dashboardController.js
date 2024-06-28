const Patient = require("../models/patient");
const { assessRisk } = require("../utils/riskAssessment");

exports.getDashboard = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ updatedAt: -1 });

    const formattedPatients = patients.map((patient) => {
      const latestVitals =
        patient.vitalHistory[patient.vitalHistory.length - 1];
      const currentRisk = assessRisk(latestVitals);

      return {
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        heartRate: latestVitals.heartRate,
        bloodPressure: `${latestVitals.bloodPressureSystolic}/${latestVitals.bloodPressureDiastolic}`,
        oxygenSaturation: latestVitals.oxygenSaturation,
        temperature: latestVitals.temperature,
        risk: currentRisk ? "High" : "Low",
        updatedAt: patient.updatedAt.toLocaleString(),
      };
    });

    console.log(
      "Formatted patients:",
      JSON.stringify(formattedPatients, null, 2)
    );

    res.render("dashboard", { patients: formattedPatients });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).render("error", { message: "Error fetching patients" });
  }
};
