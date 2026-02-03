import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Cloud,
  Cpu,
  BarChart3,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Unlock,
  ChevronRight,
} from "lucide-react";

import {
  isValidEmail,
  sanitizePassword,
  isValidPassword,
} from "../../store/validators/AuthForm";

const AuthForm: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailValid = isValidEmail(email);
  const passwordValid = isValidPassword(password);
  const isFormValid = emailValid && passwordValid;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizePassword(e.target.value);
    if (sanitized.length <= 8) {
      setPassword(sanitized);
    }
  };

  const handleSubmit = () => {
    if (!isFormValid) return;

    const users: any[] = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((u) => u.email === email);

    if (!existingUser) {
      users.push({
        email,
        password,
        loggedInAt: new Date().toISOString(),
      });
      localStorage.setItem("users", JSON.stringify(users));
    }

    localStorage.setItem("currentUser", JSON.stringify({ email }));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 font-sans">
      <div className="w-full max-w-[900px] bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Ventexa
            </h1>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Welcome back
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please enter your details.
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Work Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className={`w-full pl-11 pr-4 py-3 rounded-lg border text-sm outline-none transition
                    ${email && !emailValid
                      ? "border-red-500"
                      : "border-gray-200 dark:border-gray-700"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {email && !emailValid && (
                <p className="text-xs text-red-500">Invalid email address</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  maxLength={8}
                  placeholder="8 characters only"
                  className={`w-full pl-11 pr-11 py-3 rounded-lg border text-sm outline-none transition
                    ${password && !passwordValid
                      ? "border-red-500"
                      : "border-gray-200 dark:border-gray-700"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                  {passwordValid ? (
                    <Unlock className="h-4 w-4 text-green-500" />
                  ) : (
                    <Lock className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className={`text-xs mt-1 ${passwordValid ? "text-green-600" : "text-gray-400"}`}>
                {passwordValid ? "✓ Perfect length" : "Must be exactly 8 characters"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full py-3 mt-2 font-semibold rounded-lg flex items-center justify-center gap-2 transition
                ${isFormValid
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Continue
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center bg-gray-900">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')",
            }}
          />
          <div className="relative z-10 p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6 max-w-xs">
              Empowering businesses through <span className="text-indigo-400">digital intelligence.</span>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[Shield, Cloud, Cpu, BarChart3].map((Icon, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <Icon size={16} className="text-indigo-400" />
                  Feature
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
