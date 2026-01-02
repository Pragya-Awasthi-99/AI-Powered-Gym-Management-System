import { Link } from "react-router-dom";

export default function ForgotPassword() {
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

      {/* ================= FORGOT PASSWORD ================= */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/img1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Card */}
        <div className="relative z-10 w-full max-w-md mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-2 text-center">
              Forgot Password
            </h2>
            <p className="text-slate-300 text-center mb-8">
              Enter your registered email and we’ll send a reset link
            </p>

            <form className="space-y-5">
              <div>
                <label className="text-sm text-slate-300">Email</label>
                <input
                  type="email"
                  placeholder="you@gym.com"
                  className="
                    mt-1 w-full px-4 py-3 rounded-xl
                    bg-slate-900/70
                    border border-white/10
                    text-white
                    focus:outline-none focus:border-purple-400
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  w-full py-3 rounded-xl
                  bg-gradient-to-r from-purple-500 to-indigo-600
                  font-semibold
                  hover:bg-white hover:text-slate-900
                  transition
                "
              >
                Send Reset Link
              </button>
            </form>

            <p className="text-slate-400 text-sm text-center mt-6">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="text-purple-400 hover:underline"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
