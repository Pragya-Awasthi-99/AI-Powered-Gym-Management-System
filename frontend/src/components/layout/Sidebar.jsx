import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gradient-to-b from-purple-700 to-indigo-700 text-white min-h-screen">
      {/* Logo */}
      <div className="p-6 text-2xl font-bold tracking-wide">
        FX Gym AI
      </div>

      {/* Navigation */}
      <nav className="space-y-2 px-4">
        <Link
          to="/dashboard"
          className="block px-4 py-2 rounded hover:bg-white/20 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/attendance"
          className="block px-4 py-2 rounded hover:bg-white/20 transition"
        >
          Attendance
        </Link>

        <Link
          to="/ai"
          className="block px-4 py-2 rounded hover:bg-white/20 transition"
        >
          AI Assistant 🤖
        </Link>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="w-full text-left px-4 py-2 rounded hover:bg-white/20 transition"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
