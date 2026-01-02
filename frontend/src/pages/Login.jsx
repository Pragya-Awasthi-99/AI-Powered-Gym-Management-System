import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
  
      const { user, token } = res.data.data;
  
      //persist auth state
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      // 🔀 Role-based redirect
      if (user.role === "ADMIN") navigate("/admin/dashboard");
      else if (user.role === "TRAINER") navigate("/trainer/dashboard");
      else navigate("/user/dashboard");
  
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  

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

      {/* ================= LOGIN SECTION ================= */}
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

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-md mx-auto px-6 pt-20">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-2 text-center">
              Welcome Back
            </h2>
            <p className="text-slate-300 text-center mb-6">
              Login to continue your fitness journey
            </p>

            {error && (
              <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="text-sm text-slate-300">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@gym.com"
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 focus:border-purple-400 outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-slate-300">Password</label>

                <div className="relative mt-1">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-900/70 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition"
                    // title={showPassword ? "Hide password" : "Show password"}
                  >
                    <img
                      src="/images/eye.gif"
                      alt="Toggle password visibility"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <p className="text-right text-sm">
                <Link
                  to="/forgotpassword"
                  className="text-purple-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            {/* Signup */}
            <p className="text-slate-400 text-sm text-center mt-6">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-purple-400 hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
