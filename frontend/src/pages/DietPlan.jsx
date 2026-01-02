import DashboardLayout from "../components/layout/DashboardLayout";

export default function DietPlan() {
  return (
    <DashboardLayout role="user">
        <div
  className="min-h-screen w-screen bg-cover bg-center text-white px-6 py-8"
  style={{ backgroundImage: "url('/images/img2.jpg')" }}
>

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Your <span className="text-purple-400">Diet Plan</span>
          </h1>
          <p className="text-slate-200 mt-1">
            General diet guidance. Consult your trainer for personalization.
          </p>
        </div>

        {/* ================= GOAL SELECTOR ================= */}
        <div className="flex gap-4 mb-10">
          {["Weight Loss", "Muscle Gain", "Maintenance"].map((goal) => (
            <button
              key={goal}
              className="
                px-5 py-2 rounded-xl
                bg-white/10 border border-white/10
                text-slate-300
                hover:text-white hover:border-purple-400/40
                transition
              "
            >
              {goal}
            </button>
          ))}
        </div>

        {/* ================= DAILY PLAN ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-6">
          {[
            {
              title: "Breakfast",
              items: [
                "Oats / Poha",
                "Boiled Eggs / Paneer",
                "1 Fruit",
              ],
            },
            {
              title: "Lunch",
              items: [
                "Roti / Rice",
                "Dal / Chicken Curry",
                "Vegetable Sabzi",
              ],
            },
            {
              title: "Snack",
              items: [
                "Roasted Chana",
                "Fruit Smoothie",
                "Green Tea",
              ],
            },
            {
              title: "Dinner",
              items: [
                "Light Roti / Salad",
                "Paneer / Fish",
                "Vegetables",
              ],
            },
          ].map((meal) => (
            <div
              key={meal.title}
              className="
                bg-white/10 backdrop-blur-xl
                border border-white/10
                rounded-2xl p-6
                hover:border-purple-400/40
                transition
              "
            >
              <h3 className="text-xl font-semibold mb-4">
                {meal.title}
              </h3>
              <ul className="space-y-2 text-slate-300">
                {meal.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ================= TIPS ================= */}
        <div className="mt-12 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Trainer Tips
          </h3>
          <ul className="space-y-2 text-slate-300">
            <li>• Drink at least 3–4 liters of water daily</li>
            <li>• Avoid junk food and sugary drinks</li>
            <li>• Maintain consistent meal timings</li>
            <li>• Consult your trainer before supplements</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
