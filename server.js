const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config({ path: "./configs/.env" });

const connectDB = require("./configs/database");
const patientRoutes = require("./routes/patientRoutes");
// const predictionRoutes = require("./routes/predictionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Connect to database
connectDB();

// Routes
app.use("/api/patients", patientRoutes);
// app.use("/api/predictions", predictionRoutes);
app.use("/dashboard", dashboardRoutes);

// Home route
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
