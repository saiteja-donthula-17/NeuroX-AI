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

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

// API Routes
app.use("/api/chats", chatRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/userchats", userChatsRoutes);

// Error handling middleware
app.use(errorHandler);

// Production setup - Serve static files
app.use(express.static(path.join(rootDir, "../client/dist")));

// Catch-all route for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(rootDir, "../client/dist", "index.html"));
});

// Start server
app.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});