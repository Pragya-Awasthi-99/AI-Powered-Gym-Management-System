import prisma from "../config/db.js";
export const aiChat = async (req, res) => {
    try {
      const { message } = req.body;
  
      if (!message) {
        return res.status(400).json({
          success: false,
          message: "Message is required",
        });
      }
  
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: message }],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("Gemini API error:", data);
        return res.status(500).json({
          success: false,
          message: "AI service unavailable",
          error: data,
        });
      }
  
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from AI";
  
      return res.status(200).json({
        success: true,
        reply,
      });
    } catch (error) {
      console.error("AI ERROR:", error);
      return res.status(500).json({
        success: false,
        message: "AI service unavailable",
      });
    }
  };
  export const getDashboardInsight = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const totalAttendance = await prisma.attendance.count({
        where: { userId },
      });
  
      const todayCalories = await prisma.calorieLog.aggregate({
        where: {
          userId,
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
        _sum: { calories: true },
      });
  
      const prompt = `
  Generate a short fitness insight (2 lines max).
  
  Context:
  - Total attendance: ${totalAttendance}
  - Calories today: ${todayCalories._sum.calories || 0}
  
  Rules:
  - Motivational
  - Safe
  - No medical advice
  `;
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    console.error("Gemini API error:", data);
    throw new Error("Gemini insight failed");
  }
  const insight =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Stay consistent and keep pushing ";
      return res.status(200).json({
        success: true,
        insight,
      });
  } catch (error) {
    console.error("Dashboard AI insight error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate AI insight",
    });
  }
};
  