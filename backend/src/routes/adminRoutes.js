import express from "express";
import { assignTrainerToUser } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/assign-trainer",
  protect,
  restrictTo("ADMIN"),
  assignTrainerToUser
);

export default router;
