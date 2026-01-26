import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ChevronRight } from "lucide-react";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6 ">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Email Field */}
        <div className="relative group">
          <input
            type="email"
            className="w-full h-15 pl-13 pr-4 bg-gray-50 border border-gray-100 rounded-[22px] focus:ring-2 focus:ring-blue-600 focus:bg-white focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-semibold text-sm"
            placeholder="Work Email Address"
          />
          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
        </div>

        {/* Password Field */}
        <div className="relative group">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full h-15 pl-13 pr-13 bg-gray-50 border border-gray-100 rounded-[22px] focus:ring-2 focus:ring-blue-600 focus:bg-white focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-semibold text-sm"
            placeholder="Account Password"
          />
          <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end pt-1">
          <Link to="/forgot" className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest">
            Forgot Password?
          </Link>
        </div>

        {/* Action Button */}
        <button className="w-full h-15 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-[22px] shadow-[0_15px_35px_-10px_rgba(37,99,235,0.5)] transition-all active:scale-[0.97] flex items-center justify-center gap-2 group">
          Sign In
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      {/* Social Integration */}
      <div className="relative flex items-center py-4">
        <div className="flex-grow border-t border-gray-100"></div>
        <span className="flex-shrink mx-4 text-[9px] font-black text-gray-300 tracking-[0.3em] uppercase">Quick Connect</span>
        <div className="flex-grow border-t border-gray-100"></div>
      </div>
    </div>
  );
}