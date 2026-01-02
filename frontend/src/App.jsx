import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AIChat from "./pages/AIChat";
import Attendance from "./pages/Attendance";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import TrainerDashboard from "./pages/dashboards/TrainerDashboard";
import UserDashboard from "./pages/dashboards/UserDashboard";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import DietPlan from "./pages/DietPlan";
import ProtectedRoute from "./components/auth/ProtectedRoute";


function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminDashboard />
    </ProtectedRoute>} />
      <Route path="/trainer/dashboard" element={
        <ProtectedRoute allowedRoles={["TRAINER"]}>
      <TrainerDashboard />
    </ProtectedRoute>} />
      <Route path="/user/dashboard" element={
        <ProtectedRoute allowedRoles={["USER"]}>
      <UserDashboard />
    </ProtectedRoute>} />
      <Route path="/ai" element={<AIChat />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/user/diet" element={<DietPlan />} />
    </Routes>
  );
}
export default App;
