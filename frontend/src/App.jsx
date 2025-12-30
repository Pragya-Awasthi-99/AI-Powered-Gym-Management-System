import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Attendance from "./pages/Attendance";
import AIChat from "./pages/AIChat";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai"
        element={
          <ProtectedRoute>
            <AIChat />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
