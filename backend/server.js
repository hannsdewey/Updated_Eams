import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Use the userRoutes for "/users" endpoint
app.use("/users", userRoutes);

// Homepage route
app.get("/", (req, res) => res.send("HELLO FROM HOMEPAGE"));

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
