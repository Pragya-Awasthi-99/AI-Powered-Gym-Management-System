import prisma from "../config/db.js";

/**
 * Get User Dashboard Stats
 * Route: GET /api/users/dashboard
 * Access: USER, ADMIN
 */
export const getUserDashboardStats = async (req, res) => {
  try {
    // req.user is set by protect middleware
    const userId = req.user.id;

    // Total attendance count
    const totalAttendance = await prisma.attendance.count({
      where: {
        userId: userId,
      },
    });

    // Start of current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Monthly attendance count
    const monthlyAttendance = await prisma.attendance.count({
      where: {
        userId: userId,
        date: {
          gte: startOfMonth,
        },
      },
    });

    return res.status(200).json({
      success: true,
      data: {
        totalAttendance,
        monthlyAttendance,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Dashboard stats error",
    });
  }
};
