import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleGenerate } from "./routes/generate"; // Import the new handler

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.get("/api/demo", handleDemo);

  // Add the new route for your AI feature
  // Any POST request to "/api/generate" will now be handled by your new function
  app.post("/api/generate", handleGenerate);

  return app;
}