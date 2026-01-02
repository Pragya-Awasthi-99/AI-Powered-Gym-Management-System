import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getUserChartData } from "../../services/chart";

/* ------------------ Fallback Data (SAFE) ------------------ */
const fallbackWeeklyProgress = [
  { day: "Mon", calories: 400 },
  { day: "Tue", calories: 520 },
  { day: "Wed", calories: 610 },
  { day: "Thu", calories: 480 },
  { day: "Fri", calories: 700 },
  { day: "Sat", calories: 820 },
  { day: "Sun", calories: 650 },
];

const fallbackActivityData = [
  { name: "HIIT Workout", value: 5 },
  { name: "Yoga", value: 2 },
  { name: "Cardio", value: 4 },
  { name: "Strength Training", value: 3 },
];

/* ------------------ Component ------------------ */
export default function UserDashboard() {
  const [weeklyProgress, setWeeklyProgress] = useState(
    fallbackWeeklyProgress
  );
  const [activityData, setActivityData] = useState(fallbackActivityData);

  useEffect(() => {
    getUserChartData()
      .then((res) => {
        const data = res?.data;
        if (data?.weeklyProgress) {
          setWeeklyProgress(data.weeklyProgress);
        }
        if (data?.activityBreakdown) {
          setActivityData(data.activityBreakdown);
        }
      })
      .catch(() => {
        // Silent fallback (NO CRASH)
      });
  }, []);

  return (
    <DashboardLayout >
      <div
        className="min-h-screen w-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/img2.jpg')" }}
      >
        <div className="max-w-7xl mx-auto px-4 pb-24">
          {/* ================= HEADER ================= */}
          <div className="mb-8 pt-6">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back 👋
            </h1>
            <p className="text-purple-300 text-lg">
              Here's your fitness overview
            </p>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <StatItem
              title="Attendance"
              value="86%"
              gradient="from-blue-500 to-blue-600"
            />
            <StatItem
              title="Streak 🔥"
              value="12 Days"
              gradient="from-orange-500 to-red-500"
            />
            <StatItem
              title="Calories"
              value="3450 kcal"
              gradient="from-purple-500 to-pink-500"
            />
            <StatItem
              title="Workouts"
              value="18"
              gradient="from-green-500 to-emerald-600"
            />
          </div>

          {/* ================= CHARTS ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Weekly Progress */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl">
              <h3 className="text-white text-xl font-semibold mb-4">
                Weekly Progress
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyProgress}>
                  <XAxis dataKey="day" stroke="#e2e8f0" />
                  <YAxis stroke="#e2e8f0" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Line
                    dataKey="calories"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Activity Breakdown */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl">
              <h3 className="text-white text-xl font-semibold mb-4">
                Activity Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <XAxis dataKey="name" stroke="#e2e8f0" />
                  <YAxis stroke="#e2e8f0" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="value" fill="#22c55e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================= TRAINER ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl flex flex-col items-center text-center">
              <h3 className="text-white text-xl font-semibold mb-4">
                Your Current Trainer
              </h3>

              <img
                src="/images/tr1.jpg"
                alt="Trainer"
                className="w-28 h-28 rounded-full object-cover border-4 border-purple-400 mb-4"
              />

              <p className="text-white text-lg font-semibold">John Doe</p>
              <p className="text-purple-300 text-sm mb-4">Cardio Trainer</p>

              <button className="mt-auto px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium hover:opacity-90 transition">
                View / Change Trainer
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl flex items-center justify-center">
              <p className="text-purple-300 text-lg italic">Coming Soon ✨</p>
            </div>
          </div>
        </div>

        {/* ================= CHATBOT ================= */}
        <button
          className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-2xl hover:scale-110 transition-transform"
          title="Chat with AI"
        >
          <img src="/images/chatbot.png" alt="Chatbot" className="w-14 h-14" />
        </button>
      </div>
    </DashboardLayout>
  );
}

/* ------------------ Stat Item ------------------ */
function StatItem({ title, value, gradient }) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1`}
    >
      <div className="text-white/80 text-sm font-medium mb-1">{title}</div>
      <div className="text-white text-3xl font-bold">{value}</div>
    </div>
  );
}
