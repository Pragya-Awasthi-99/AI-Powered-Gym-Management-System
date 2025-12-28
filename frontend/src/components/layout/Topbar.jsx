import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="text-sm text-gray-600">
        {user?.name} ({user?.role})
      </div>
    </header>
  );
};

export default Topbar;
