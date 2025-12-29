import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/StatCard";
import { getUserDashboardStats } from "../../services/dashboard";
import { getDashboardInsight } from "../../services/ai";

const UserDashboard = () => {
  const [stats, setStats] = useState(null);
  const [insight, setInsight] = useState(null);
  useEffect(() => {
    getUserDashboardStats().then((res) => {
      setStats(res.data);
    });
    getDashboardInsight().then((res) => {
      setInsight(res.data);
    });
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Welcome Back 💪</h2>

      {!stats ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Attendance" value={stats.totalAttendance} />
          <StatCard title="This Month" value={stats.monthlyAttendance} />
          <StatCard title="Current Streak" value="Coming Soon" />
        </div>
      )}
      {insight ? (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">AI Insight</h3>
          <p className="text-gray-600">{insight}</p>
        </div>
      ) : null}
    </DashboardLayout>
  );
};

export default UserDashboard;
