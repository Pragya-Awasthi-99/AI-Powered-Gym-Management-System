import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="min-h-screen w-screen bg-slate-950 text-white">
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-xl font-bold tracking-wide">
            RAOWL <span className="text-purple-400">FITNESS</span>
          </h1>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-white rounded-lg text-sm bg-white/10 hover:bg-white/20 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-white rounded-lg text-sm bg-gradient-to-r from-purple-500 to-indigo-600 
              hover:bg-white hover:text-slate-900 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: "url('/images/img1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
            RISE WITH <span className="text-purple-400">RAOWL</span>
          </h2>
          <p className="text-slate-300 text-lg md:text-xl max-w-xl mb-8">
            Strength. Discipline. Transformation. Your journey to a stronger
            body starts here.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 text-white rounded-xl text-lg font-semibold
            bg-gradient-to-r from-purple-500 to-indigo-600 hover:bg-white hover:text-slate-900 transition">
            Join the Gym
          </Link>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-4">
              About <span className="text-purple-400">RAOWL FITNESS</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              RAOWL FITNESS is built for people who take their fitness
              seriously. From modern equipment to professional trainers, we
              focus on real results, consistency, and discipline. Whether you’re
              starting out or pushing limits — this is your space.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/img2.jpg"
              alt="Gym Interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= MEMBERSHIP PLANS ================= */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">
            Membership <span className="text-purple-400">Plans</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Monthly", price: "₹1,500" },
              { title: "Quarterly", price: "₹4,000" },
              { title: "Yearly", price: "₹14,000" },
            ].map((plan) => (
              <div
                key={plan.title}
                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:border-purple-400/40 transition"
              >
                <h4 className="text-xl font-semibold mb-2">{plan.title}</h4>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <button className="px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 transition">
                  Contact Gym
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LOCATION ================= */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h3 className="text-3xl font-bold">
              Find <span className="text-purple-400">Us</span>
            </h3>
            <img
              src="/images/address1.png"
              alt="Location"
              className="w-10 h-10 translate-y-1"
            />
          </div>
          <p className="text-slate-350 mb-4 leading-relaxed">
            Ashok Nagar, Birkona Road, Sarkanda
            <br />
            Bilaspur (CG) - 495006 <br />
            <span className="inline-flex items-center gap-2">
              <img src="/images/contact.gif" alt="Phone" className="w-5 h-5" />
              +91 XXXXX XXXX
            </span>
          </p>
          <p className="text-slate-400 mb-8">
            Google Maps integration coming soon
          </p>

          <div className="h-64 rounded-2xl bg-white/10 flex items-center justify-center text-slate-400">
            Map Placeholder
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} RAOWL FITNESS. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm">
            Designed for real-world deployment
          </p>
        </div>
      </footer>
      {/* ================= CHATBOT FLOATING ICON ================= */}
      <button
        className="
    fixed bottom-6 right-6 z-50
    rounded-full
    bg-gradient-to-br from-purple-500 to-indigo-600
    shadow-2xl hover:scale-110 transition-transform
  "
        title="Chat with AI"
      >
        <img src="/images/chatbot.png" alt="Chatbot" className="w-14 h-14" />
      </button>
    </div>
  );
}
