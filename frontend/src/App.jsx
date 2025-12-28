import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Attendance from "./pages/Attendance";
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardRedirect from "./pages/DashboardRedirect";
import UserDashboard from "./pages/dashboards/UserDashboard";
import TrainerDashboard from "./pages/dashboards/TrainerDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardRedirect />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trainer/dashboard"
          element={
            <ProtectedRoute>
              <TrainerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
