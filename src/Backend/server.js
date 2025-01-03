const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const EmpDetails = require("./routes/EmpDetails");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.ATLAS_URI;

// Log the MongoDB URI for debugging
console.log("Connecting to MongoDB URI:", uri);

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process if unable to connect
  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Route for testing
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.use("/empdetails", EmpDetails);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
