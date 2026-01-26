import React, { useState } from "react";
import {
  Shield,
  Cloud,
  Cpu,
  BarChart3,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ChevronRight,
  ArrowLeft, // back icon
} from "lucide-react";

export default function VentexaAuth() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-0 sm:p-6 lg:p-10 selection:bg-blue-500/30 font-sans antialiased">
      <div
        className="
          w-full max-w-[990px]
          h-auto
          lg:h-[min(86vh,760px)]
          bg-white
          sm:rounded-[50px]
          overflow-hidden
          shadow-2xl
          flex flex-col lg:flex-row
          relative
        "
      >
        {/* LEFT SIDE */}
        <div className="w-full lg:w-[48%] flex flex-col bg-white overflow-y-auto relative">
          {/* Back Button */}
          <button
            type="button"
            className="absolute top-5 left-5 text-gray-500 hover:text-gray-700 z-10"
            onClick={() => window.history.back()} // ✅ go back in browser
          >
            <ArrowLeft size={24} />
          </button>

          <div className="flex-1 flex flex-col justify-center items-center px-5 py-6 sm:px-6 sm:py-8 lg:px-10">
            {/* Branding */}
            <div className="w-full flex flex-col items-center mb-12">
              <h1 className="text-4xl font-black tracking-tighter text-gray-900">
                Ventexa
              </h1>
              <p className="text-[11px] font-bold text-blue-600 tracking-[0.4em] uppercase mt-2">
                IT Consulting
              </p>
            </div>

            {/* Form */}
            <div className="w-full max-w-[360px] space-y-5">
              {/* Email Input */}
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full h-16 pl-14 pr-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none font-medium"
                />
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600" />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full h-16 pl-14 pr-14 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none font-medium"
                />
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Sign In Button */}
              <button className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 text-lg">
                Sign In <ChevronRight size={20} />
              </button>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between px-2 text-xs font-bold uppercase tracking-widest">
                <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded-sm border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                  Remember
                </label>
                <button className="text-blue-600">Forgot?</button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex lg:w-[55%] relative m-6 rounded-[50px] overflow-hidden shadow-inner">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-blue-900/40 to-transparent" />

          <div className="relative h-full w-full flex flex-col justify-end p-16">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 p-10 rounded-[40px] max-w-[500px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-10 bg-blue-500 rounded-full" />
                <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">
                  Services
                </span>
              </div>

              <h2 className="text-4xl font-bold text-white leading-tight mb-6">
                Redefining the <span className="text-blue-400">IT Landscape.</span>
              </h2>

              <div className="grid grid-cols-2 gap-4 text-white/80">
                <div className="flex items-center gap-2 text-xs font-bold uppercase">
                  <Shield size={14} /> Cyber Security
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase">
                  <Cloud size={14} /> Cloud Infrastructure
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase">
                  <Cpu size={14} /> AI Development
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase">
                  <BarChart3 size={14} /> Digital Strategy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
