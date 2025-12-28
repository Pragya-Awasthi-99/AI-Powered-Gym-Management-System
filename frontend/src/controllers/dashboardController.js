import prisma from "../config/db.js";

/**
 * USER DASHBOARD STATS
 * - Total attendance
 * - This month attendance
 */
export const getUserDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalAttendance = await prisma.attendance.count({
      where: { userId },
    });

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyAttendance = await prisma.attendance.count({
      where: {
        userId,
        date: { gte: startOfMonth },
      },
    });

    res.json({
      totalAttendance,
      monthlyAttendance,
    });
  } catch (error) {
    console.error("User dashboard error:", error);
    res.status(500).json({ message: "User dashboard stats error" });
  }
};

/**
 * TRAINER DASHBOARD STATS
 * - Assigned users (placeholder)
 * - Attendance today
 */
export const getTrainerDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendanceToday = await prisma.attendance.count({
      where: {
        date: { gte: today },
      },
    });

    res.json({
      assignedUsers: 0, // will be wired later
      attendanceToday,
    });
  } catch (error) {
    console.error("Trainer dashboard error:", error);
    res.status(500).json({ message: "Trainer dashboard stats error" });
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
        date: { gte: today },
      },
    });

    res.json({
      totalUsers,
      totalTrainers,
      attendanceToday,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    res.status(500).json({ message: "Admin dashboard stats error" });
  }
};
