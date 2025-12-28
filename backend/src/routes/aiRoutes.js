import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * AI Routes with Role-Based Access Control
 * 
 * - ADMIN: Full access to all AI features
 * - TRAINER: Access to trainer-specific AI features
 * - USER: Limited access to user-facing AI features
 */

// Get AI workout recommendations (any authenticated user)
router.get("/workout-recommendations", protect, (req, res) => {
  res.json({
    success: true,
    message: "Get AI workout recommendations",
    data: {
      userId: req.user.id,
      user: req.user,
      note: "All authenticated users can get workout recommendations",
    },
  });
});

// Get personalized workout plan (any authenticated user)
router.get("/workout-plan", protect, (req, res) => {
  res.json({
    success: true,
    message: "Get personalized AI workout plan",
    data: {
      userId: req.user.id,
      user: req.user,
    },
  });
});

// Generate nutrition plan (USER and TRAINER)
router.post(
  "/nutrition-plan",
  protect,
  restrictTo("USER", "TRAINER", "ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Generate AI nutrition plan",
      data: {
        user: req.user,
        note: "Users, trainers, and admins can generate nutrition plans",
      },
    });
  }
);

// Get client insights (TRAINER and ADMIN only)
router.get(
  "/client-insights",
  protect,
  restrictTo("TRAINER", "ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Get AI client insights",
      data: {
        user: req.user,
        note: "Only trainers and admins can access client insights",
      },
    });
  }
);

// Admin AI analytics (ADMIN only)
router.get(
  "/analytics",
  protect,
  restrictTo("ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Get AI analytics dashboard",
      data: {
        user: req.user,
        note: "Only admins can access AI analytics",
      },
    });
  }
);

// Generate trainer report (ADMIN only)
router.post(
  "/trainer-report",
  protect,
  restrictTo("ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Generate AI trainer report",
      data: {
        user: req.user,
      },
    });
  }
);

export default router;

