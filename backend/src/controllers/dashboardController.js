import prisma from "../config/db.js";

/**
 * USER DASHBOARD STATS
 * - Total attendance
 * - Attendance this month
 */
export const getUserDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Total attendance
    const totalAttendance = await prisma.attendance.count({
      where: { userId },
    });

    // Start of current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Monthly attendance
    const monthlyAttendance = await prisma.attendance.count({
      where: {
        userId,
        date: {
          gte: startOfMonth,
        },
      },
    });

    res.status(200).json({
      totalAttendance,
      monthlyAttendance,
    });
  } catch (error) {
    console.error("User dashboard stats error:", error);
    res.status(500).json({
      message: "Failed to fetch user dashboard stats",
    });
  }
};

/**
 * TRAINER DASHBOARD STATS
 * - Assigned users (placeholder for now)
 * - Attendance today
 */
export const getTrainerDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendanceToday = await prisma.attendance.count({
      where: {
        date: {
          gte: today,
        },
      },
    });

    res.status(200).json({
      assignedUsers: 0, // will be implemented when trainer-user mapping is added
      attendanceToday,
    });
  } catch (error) {
    console.error("Trainer dashboard stats error:", error);
    res.status(500).json({
      message: "Failed to fetch trainer dashboard stats",
    });
  }
};

/**
 * ADMIN DASHBOARD STATS
 * - Total users
 * - Total trainers
 * - Attendance today
 */
export const getAdminDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalUsers = await prisma.user.count({
      where: { role: "USER" },
    });

    const totalTrainers = await prisma.user.count({
      where: { role: "TRAINER" },
    });

    const attendanceToday = await prisma.attendance.count({
      where: {
        date: {
          gte: today,
        },
      },
    });

    res.status(200).json({
      totalUsers,
      totalTrainers,
      attendanceToday,
    });
  } catch (error) {
    console.error("Admin dashboard stats error:", error);
    res.status(500).json({
      message: "Failed to fetch admin dashboard stats",
    });
  }
};
