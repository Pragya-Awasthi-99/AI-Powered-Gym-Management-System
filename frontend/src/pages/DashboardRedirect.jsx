import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;

  if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
  if (user.role === "TRAINER") return <Navigate to="/trainer/dashboard" replace />;

  return <Navigate to="/user/dashboard" replace />;
};

export default DashboardRedirect;
