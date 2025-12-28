import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/StatCard";
import { getTrainerDashboardStats } from "../../services/dashboard";
import { getAssignedUsers } from "../../services/trainer";

const TrainerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getTrainerDashboardStats().then(res => setStats(res.data));
    getAssignedUsers().then(res => setUsers(res.data.users));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Trainer Panel</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard title="Assigned Users" value={users.length} />
        <StatCard title="Attendance Today" value={stats.attendanceToday} />
      </div>

      {/* Assigned Users */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">My Users</h3>

        {users.length === 0 ? (
          <p className="text-gray-500">No users assigned yet</p>
        ) : (
          <ul className="divide-y">
            {users.map((user) => (
              <li key={user.id} className="py-3">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TrainerDashboard;
