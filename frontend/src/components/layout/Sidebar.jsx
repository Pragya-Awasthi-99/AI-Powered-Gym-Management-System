import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gradient-to-b from-purple-700 to-indigo-700 text-white">
      <div className="p-6 text-2xl font-bold">FX Gym AI</div>

      <nav className="space-y-2 px-4">
        <Link className="block px-4 py-2 rounded hover:bg-white/20" to="/dashboard">
          Dashboard
        </Link>
        <Link className="block px-4 py-2 rounded hover:bg-white/20" to="/attendance">
          Attendance
        </Link>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="w-full text-left px-4 py-2 rounded hover:bg-white/20"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
