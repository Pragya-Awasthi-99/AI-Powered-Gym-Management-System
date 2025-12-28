import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/StatCard";

import { useEffect, useState } from "react";
import { getAdminDashboardStats } from "../../services/dashboard";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getAdminDashboardStats().then(res => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Admin Control Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Trainers" value={stats.totalTrainers} />
        <StatCard title="Attendance Today" value={stats.attendanceToday} />
      </div>
    </DashboardLayout>
  );
};


export default AdminDashboard;
