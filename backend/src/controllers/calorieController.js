import prisma from "../config/db.js";

export const logCalories = async (req, res) => {
  try {
    const { food, calories, mealType } = req.body;

    const log = await prisma.calorieLog.create({
      data: {
        userId: req.user.id,
        food,
        calories,
        mealType,
      },
    });

    res.json({ message: "Calories logged", log });
  } catch (error) {
    res.status(500).json({ message: "Failed to log calories" });
  }
};
