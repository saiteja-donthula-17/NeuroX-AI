import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import path from "path";
import connect from "./config/db.js";
import { rootDir } from "./utils/pathUtils.js";
import chatRoutes from "./routes/chatRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userChatsRoutes from "./routes/userChatsRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

// Initialize express app
const port = process.env.PORT || 3000;
const app = express();

// Log environment variables (for debugging)
console.log("Environment variables loaded:");
console.log("CLIENT_URL:", process.env.CLIENT_URL);
console.log("MONGO connection string exists:", !!process.env.MONGO);
console.log("CLERK_SECRET_KEY exists:", !!process.env.CLERK_SECRET_KEY);

// Middleware
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json());

// Add a health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// API Routes
app.use("/api/chats", chatRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/userchats", userChatsRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    // Start server even if MongoDB connection fails
    app.listen(port, () => {
      console.log(`Server running on port ${port} (without MongoDB connection)`);
    });
  });

// Catch-all route for SPA
app.get("/", (req, res) => {
  res.send("API is running...");
});

