import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import prisma from "./config/db.js";

await prisma.$connect();
console.log("MongoDB connected");
