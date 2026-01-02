import { useState } from "react";
import { Link } from "react-router-dom";
export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen w-screen bg-slate-950 text-white">
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide">
            RAOWL <span className="text-purple-400">FITNESS</span>
          </h1>
        </div>
      </header>

      {/* ================= SIGNUP SECTION ================= */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/img2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Signup Card */}
        <div className="relative z-10 w-full max-w-md mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-2 text-center">
              Create Account
            </h2>
            <p className="text-slate-300 text-center mb-8">
              Join RAOWL FITNESS today
            </p>

            <form className="space-y-5">
              <div>
                <label className="text-sm text-slate-300">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300">Phone</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXX"
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-slate-300">Password</label>

                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="
                      w-full px-4 py-3 pr-12
                      rounded-xl
                      bg-slate-900/70
                      border border-white/10
                      text-white
                      focus:outline-none focus:border-purple-400
                    "
                  />
                  {/* Eye Icon */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute right-4 top-1/2 -translate-y-1/2
                      bg-transparent p-0
                      opacity-70 hover:opacity-100
                      transition
                    "
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    <img
                      src="/images/eye.gif"
                      alt="Toggle password visibility"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-300">Role</label>
                <select
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                >
                  <option>User</option>
                  <option>Trainer</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 font-semibold hover:opacity-90 transition"
              >
                Create Account
              </button>
            </form>

            <p className="text-slate-400 text-sm text-center mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
