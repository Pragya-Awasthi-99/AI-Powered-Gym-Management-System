import express from "express";
import {
  getUserDashboardStats,
  getTrainerDashboardStats,
  getAdminDashboardStats,
} from "../controllers/dashboardController.js";

import { protect } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * USER dashboard stats
 * Accessible by USER and ADMIN
 */
router.get(
  "/user",
  protect,
  restrictTo("USER", "ADMIN"),
  getUserDashboardStats
);

/**
 * TRAINER dashboard stats
 * Accessible by TRAINER and ADMIN
 */
router.get(
  "/trainer",
  protect,
  restrictTo("TRAINER", "ADMIN"),
  getTrainerDashboardStats
);

/**
 * ADMIN dashboard stats
 * Accessible by ADMIN only
 */
router.get(
  "/admin",
  protect,
  restrictTo("ADMIN"),
  getAdminDashboardStats
);

export default router;
