export default function Topbar({ onMenuClick }) {
  return (
    <header
      className="
          h-16 fixed top-0 left-0 md:left-64 right-0 z-30
          bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90
          backdrop-blur-2xl
          border-b border-white/10
          shadow-lg
          px-6 flex items-center justify-between
        "
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button (ADDED) */}
        <button className="md:hidden text-slate text-2xl" onClick={onMenuClick}>
          ☰
        </button>

        {/* Page Title */}
        <h2 className="text-white text-lg font-semibold tracking-wide">
          Dashboard
        </h2>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <button
          className="
              text-slate-300 hover:text-white
              text-xl transition
            "
          title="Notifications"
        >
          🔔
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="/images/tr2.jpg"
            alt="User"
            className="w-9 h-9 rounded-full object-cover border-2 border-purple-400"
          />
          <span className="text-white text-sm font-medium">Khushi</span>
        </div>
      </div>
    </header>
  );
}
