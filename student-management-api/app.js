const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const logger = require("./middleware/logger");

const app = express();
const PORT = 3000;

// Body parser middleware
app.use(express.json());

// Custom logger middleware
app.use(logger);

// Base route
app.get("/", (req, res) => {
  res.send("Student Management API is running");
});

// Mount student routes
app.use("/students", studentRoutes);

// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});