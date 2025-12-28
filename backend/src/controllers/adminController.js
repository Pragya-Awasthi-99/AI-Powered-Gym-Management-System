import prisma from "../config/db.js";

export const assignTrainerToUser = async (req, res) => {
  try {
    const { userId, trainerId } = req.body;

    const trainer = await prisma.user.findUnique({
      where: { id: trainerId },
    });

    if (!trainer || trainer.role !== "TRAINER") {
      return res.status(400).json({ message: "Invalid trainer ID" });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { trainerId },
    });

    res.json({
      message: "Trainer assigned successfully",
      user,
    });
  } catch (error) {
    console.error("Assign trainer error:", error);
    res.status(500).json({ message: "Assignment failed" });
  }
};
