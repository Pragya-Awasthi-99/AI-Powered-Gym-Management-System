import express from "express";
import { getMyUsers } from "../controllers/trainerController.js";
import { protect } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/users", protect, restrictTo("TRAINER"), getMyUsers);

export default router;
