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

const growthData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 180 },
  { month: "Mar", users: 240 },
  { month: "Apr", users: 310 },
];

const roleData = [
  { role: "Users", count: 260 },
  { role: "Trainers", count: 24 },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout >
      <div
        className="min-h-screen w-screen bg-cover bg-center "
        style={{ backgroundImage: "url('/images/img2.jpg')" }}
      >
        <div className="min-h-screen w-full bg-black/60 py-8">
          {/* MASTER CONTENT CONTAINER */}
          <div className="max-w-7xl mx-auto px-6 space-y-8">
            {/*Header*/}
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-slate-300">Platform overview & control</p>
            </div>
            {/*Stats*/}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                <div className="text-blue-100 text-sm font-medium mb-1">
                  Total Users
                </div>
                <div className="text-white text-3xl font-bold">260</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                <div className="text-orange-100 text-sm font-medium mb-1">
                  Total Trainers
                </div>
                <div className="text-white text-3xl font-bold">24</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                <div className="text-purple-100 text-sm font-medium mb-1">
                  Active Subscriptions
                </div>
                <div className="text-white text-3xl font-bold">182</div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                <div className="text-green-100 text-sm font-medium mb-1">
                  Monthly Revenue
                </div>
                <div className="text-white text-3xl font-bold">₹1.2L</div>
              </div>
            </div>
            {/*Charts*/}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <GlassCard title="User Growth">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={growthData}>
                    <XAxis dataKey="month" stroke="#cbd5f5" />
                    <YAxis stroke="#cbd5f5" />
                    <Tooltip />
                    <Line dataKey="users" stroke="#a855f7" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </GlassCard>

              <GlassCard title="Platform Roles">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={roleData}>
                    <XAxis dataKey="role" stroke="#cbd5f5" />
                    <YAxis stroke="#cbd5f5" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#38bdf8" />
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>
            </div>
            {/* Recent Users Table */}
            <GlassCard title="Recent Users">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-300">
                  <thead className="text-xs uppercase text-slate-400 border-b border-white/10">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Aman",
                        role: "User",
                        status: "Active",
                        date: "12 Dec",
                      },
                      {
                        name: "Riya",
                        role: "Trainer",
                        status: "Active",
                        date: "10 Dec",
                      },
                      {
                        name: "Karan",
                        role: "User",
                        status: "Inactive",
                        date: "05 Dec",
                      },
                    ].map((user, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >
                        <td className="px-4 py-3 text-white">{user.name}</td>
                        <td className="px-4 py-3">{user.role}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              user.status === "Active"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">{user.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
function Stat({ title, value }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-xl">
      <p className="text-slate-300 text-sm">{title}</p>
      <p className="text-white text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}

function GlassCard({ title, children }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-xl">
      <h3 className="text-white text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}
