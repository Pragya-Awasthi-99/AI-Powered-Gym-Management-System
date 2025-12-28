import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/roleMiddleware.js";
import { getUserDashboardStats } from "../controllers/userController.js";

const router = express.Router();

/**
 * Protected Routes Examples:
 * 
 * 1. protect - Requires authentication (any logged-in user)
 * 2. protect + restrictTo(...roles) - Requires authentication + specific role(s)
 * 
 * Usage patterns:
 * - Public route: no middleware
 * - Protected route (all authenticated users): protect
 * - Admin only: protect, restrictTo('ADMIN')
 * - Admin or Trainer: protect, restrictTo('ADMIN', 'TRAINER')
 * - All roles: protect, restrictTo('ADMIN', 'TRAINER', 'USER')
 */

// Get current user profile (any authenticated user)
router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    message: "Current user profile",
    data: {
      user: req.user,
    },
  });
});

// User dashboard (accessible by USER and ADMIN)
router.get(
  "/dashboard",
  protect,
  restrictTo("USER", "ADMIN"),
  getUserDashboardStats
);

// Get all users (ADMIN only)
router.get(
  "/",
  protect,
  restrictTo("ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "All users (Admin access)",
      data: {
        user: req.user,
        note: "This would typically fetch all users from database",
      },
    });
  }
);

// Update user profile (any authenticated user can update their own)
router.put(
  "/profile",
  protect,
  (req, res) => {
    res.json({
      success: true,
      message: "Update user profile",
      data: {
        userId: req.user.id,
        note: "User can update their own profile",
      },
    });
  }
);

export default router;
