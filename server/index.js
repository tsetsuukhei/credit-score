import express from "express";
import cors from "cors";

import { healthCheck } from "./controllers/health.controller.js";

const app = express();
const port = 8000;

app.use(express.json()); // Middleware to parse JSON requests

app.use(cors());

app.get("/api/health", healthCheck);

const server = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

server();
