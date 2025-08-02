const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoutes");
const taskRoute = require("./routes/taskRoutes");
const verifyToken = require("./middleware/verifyToken");

dotenv.config();

const app = express();

const corsOptions = {
  origin: [process.env.DEVELOPMENT_URL, process.env.PRODUCTION_URL, 'http://localhost:5173'],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

console.log('CORS enabled for:', [process.env.DEVELOPMENT_URL, process.env.PRODUCTION_URL, 'http://localhost:5173']);

app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware for debugging
app.use((req, res, next) => {
  if (req.method === 'POST' && req.path.includes('/api/auth/register')) {
    console.log('Registration request received:', {
      body: req.body,
      headers: {
        'content-type': req.headers['content-type'],
        'origin': req.headers['origin']
      }
    });
  }
  next();
});

app.use("/api/auth", userRoute);
app.use("/api/route", verifyToken, taskRoute);

app.get("/", (req, res) => {
  res.json({
    message: `Welcome to the Todo List API. This server powers the backend of the Todo List application, handling data and logic. For a stylish and interactive frontend, please visit the corresponding Todo List frontend application. ${process.env.PRODUCTION_URL}`,
  });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Something went wrong" });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    console.log("MongoDB connection URL:", process.env.MONGO_URL.replace(/:([^:@]{4,}@)/g, ':****@'));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    console.error("MongoDB connection string may be invalid or MongoDB server is not running");
    console.error("Check your .env file and ensure MONGO_URL is correctly set");
  });

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = server;
