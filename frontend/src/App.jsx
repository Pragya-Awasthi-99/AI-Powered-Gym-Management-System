import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/DashboardRedirect";
import AIChat from "./pages/AIChat";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ai" element={<AIChat />} />
      <Route path="/attendance" element={<Attendance />} />
    </Routes>
  );
}

export default App;
