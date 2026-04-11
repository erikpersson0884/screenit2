import express from "express";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import healthRoutes from "./routes/health.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import dbGuard from "./middleware/dbGuard.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", dbGuard, authRoutes);
app.use("/api/user", dbGuard, userRoutes);
app.use("/api/event", dbGuard, eventRoutes);
app.use("/api/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(errorHandler);

export default app;