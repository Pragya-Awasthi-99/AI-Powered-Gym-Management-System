import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const sessionData = [
  { day: "Mon", sessions: 4 },
  { day: "Tue", sessions: 5 },
  { day: "Wed", sessions: 3 },
  { day: "Thu", sessions: 6 },
  { day: "Fri", sessions: 4 },
];

const attendanceData = [
  { name: "Present", value: 42 },
  { name: "Absent", value: 8 },
];

export default function TrainerDashboard() {
  return (
    <DashboardLayout >
      <div
        className="min-h-screen w-screen bg-cover bg-center "
        style={{ backgroundImage: "url('/images/img2.jpg')" }}
      >
        <div className="min-h-screen w-full bg-black/60 py-8">
          {/* MASTER CONTENT CONTAINER */}
          <div className="max-w-7xl mx-auto px-6 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-white">
                Trainer Dashboard
              </h1>
              <p className="text-slate-300">Manage your clients & sessions</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                <div className="text-blue-100 text-sm font-medium mb-1">
                  Assigned Clients
                </div>
                <div className="text-white text-3xl font-bold">18</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                <div className="text-orange-100 text-sm font-medium mb-1">
                  Today's Sessions
                </div>
                <div className="text-white text-3xl font-bold">5</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                <div className="text-purple-100 text-sm font-medium mb-1">
                  Attendance Rate
                </div>
                <div className="text-white text-3xl font-bold">84%</div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                <div className="text-green-100 text-sm font-medium mb-1">
                  Avg Progress
                </div>
                <div className="text-white text-3xl font-bold">76%</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <GlassCard title="Weekly Sessions">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sessionData}>
                    <XAxis dataKey="day" stroke="#cbd5f5" />
                    <YAxis stroke="#cbd5f5" />
                    <Tooltip />
                    <Line dataKey="sessions" stroke="#60a5fa" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </GlassCard>

              <GlassCard title="Client Attendance">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={attendanceData}>
                    <XAxis dataKey="name" stroke="#cbd5f5" />
                    <YAxis stroke="#cbd5f5" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>
            </div>
            <button
              className="
    fixed bottom-6 right-6 z-50
    rounded-full
    bg-gradient-to-br from-purple-500 to-indigo-600
    shadow-2xl hover:scale-110 transition-transform
  "
              title="Chat with AI"
            >
              <img
                src="/images/chatbot.png"
                alt="Chatbot"
                className="w-14 h-14"
              />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl text-white">
      <p className="text-slate-300 text-sm">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function GlassCard({ title, children }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
      <h3 className="text-white text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}
