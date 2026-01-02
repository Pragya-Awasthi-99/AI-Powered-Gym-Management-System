import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔐 Read role from persisted auth
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase() || "user";

  return (
    <>
      <Sidebar
        role={role}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <main className="pt-16 md:ml-64 min-h-screen bg-slate-950">
        {children}
      </main>
    </>
  );
}
