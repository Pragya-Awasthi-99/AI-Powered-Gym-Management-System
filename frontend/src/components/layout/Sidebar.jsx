import { useLocation, useNavigate } from "react-router-dom";

const sidebarMenus = {
  user: [
    "Dashboard",
    "Attendance",
    "AI Chat",
    "Trainers",
    "Diet Plan",
    "Settings",
  ],
  trainer: [
    "Dashboard",
    "My Clients",
    "Schedule",
    "Attendance",
    "Progress",
    "Settings",
  ],
  admin: [
    "Dashboard",
    "Users",
    "Trainers",
    "Subscriptions",
    "Reports",
    "Settings",
  ],
};

export default function Sidebar({
  role = "user",
  sidebarOpen = false,
  setSidebarOpen,
}) {
  const menuItems = sidebarMenus[role] || sidebarMenus.user;
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };
  const pathMap = {
    Dashboard: `/${role}/dashboard`,
    Attendance: `/${role}/attendance`,
    "AI Chat": "/user/chat",
    Trainers: role === "admin" ? "/admin/trainers" : "/user/trainers",
    "Diet Plan": "/user/diet",
    "My Clients": "/trainer/clients",
    Schedule: "/trainer/schedule",
    Progress: "/trainer/progress",
    Users: "/admin/users",
    Subscriptions: "/admin/subscriptions",
    Reports: "/admin/reports",
    Settings: `/${role}/settings`,
  };

  return (
    <>
      {/* Mobile Overlay (CLICK TO CLOSE) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          h-screen w-64 fixed left-0 top-0 z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          transition-transform duration-300 ease-in-out
          bg-gradient-to-b from-slate-900/90 via-slate-800/80 to-slate-900/90
          backdrop-blur-2xl
          border-r border-white/10
          shadow-2xl
          p-6
        `}
      >
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            FX<span className="text-purple-400">-FIT</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 capitalize">{role} panel</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === pathMap[item];

            return (
              <button
                key={item}
                onClick={() => navigate(pathMap[item])}
                className={`
    w-full text-left px-4 py-3 rounded-xl transition
    ${
      isActive
        ? "bg-purple-500/20 text-white border border-purple-400/40"
        : "text-slate-400 hover:text-white hover:bg-white/10"
    }
  `}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="
    w-full px-4 py-3 rounded-xl
    bg-gradient-to-r from-purple-500 to-indigo-600
    text-white font-medium
    hover:opacity-90 transition  "
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
