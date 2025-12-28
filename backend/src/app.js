import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "FX Gym API running" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/trainer", trainerRoutes);
export default app;
