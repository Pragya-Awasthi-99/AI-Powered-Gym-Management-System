import express from "express";
import { logCalories } from "../controllers/calorieController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/log", protect, logCalories);

export default router;
