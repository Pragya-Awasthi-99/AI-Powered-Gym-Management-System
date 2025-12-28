import prisma from "../config/db.js";

// Mark attendance for today
export const markAttendance = async (req, res) => {
  try {
    const userId = req.user.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const alreadyMarked = await prisma.attendance.findFirst({
      where: {
        userId,
        date: today,
      },
    });

    if (alreadyMarked) {
      return res.status(400).json({ message: "Attendance already marked" });
    }

    const attendance = await prisma.attendance.create({
      data: {
        userId,
        date: today,
      },
    });

    res.status(201).json({ message: "Attendance marked", attendance });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get attendance for logged-in user
export const getMyAttendance = async (req, res) => {
  try {
    const userId = req.user.id;

    const attendance = await prisma.attendance.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    res.json({ attendance });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
