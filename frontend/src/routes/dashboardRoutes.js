import express from "express";
import {
  getUserDashboardStats,
  getTrainerDashboardStats,
  getAdminDashboardStats,
} from "../controllers/dashboard.controller.js";

import { protect } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * USER dashboard stats
 */
router.get(
  "/user",
  protect,
  restrictTo("USER", "ADMIN"),
  getUserDashboardStats
);

/**
 * TRAINER dashboard stats
 */
router.get(
  "/trainer",
  protect,
  restrictTo("TRAINER", "ADMIN"),
  getTrainerDashboardStats
);

/**
 * ADMIN dashboard stats
 */
router.get(
  "/admin",
  protect,
  restrictTo("ADMIN"),
  getAdminDashboardStats
);

export default router;
