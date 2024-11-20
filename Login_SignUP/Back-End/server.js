const express = require("express");
const { connectDB } = require("./DataBase/dbconnection");
const { User } = require("./DataBase/user");
const cors = require("cors");
const app = express();

const port = 8000; // Keep backend running on port 8000

connectDB();

// Middleware for parsing JSON
app.use(express.json());

// CORS Middleware

app.use(cors());

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Registration Successful." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Registration Failed." });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid Username or Password!" });
    }

    res.status(200).json({ message: "Login Successful!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Login Failed: Internal Server Error." });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
