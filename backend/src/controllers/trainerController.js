import prisma from "../config/db.js";

export const getMyUsers = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const users = await prisma.user.findMany({
      where: {
        trainerId,
        role: "USER",
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
