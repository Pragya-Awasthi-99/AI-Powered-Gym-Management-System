import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/DashboardRedirect";
import AIChat from "./pages/AIChat";
import Attendance from "./pages/Attendance";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import TrainerDashboard from "./pages/dashboards/TrainerDashboard";
import UserDashboard from "./pages/dashboards/UserDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/ai" element={<AIChat />} />
      <Route path="/attendance" element={<Attendance />} />
    </Routes>
  );
}

export default App;
