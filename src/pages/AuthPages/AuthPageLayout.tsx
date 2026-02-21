import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
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
    <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-gray-900 overflow-hidden font-sans">
      
      <div className="w-full max-w-[1000px] h-full max-h-[550px] flex flex-col lg:flex-row items-stretch overflow-hidden">
        
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-gray-900">
          <div className="mb-6 flex justify-center lg:justify-start">
            <img
              src="logo-3 (2).png"
              alt="Logo Light"
              className="dark:hidden"
              style={{ width: "125px" }}
            />
            <img
              src="ventexa_new_logo.png"
              alt="Logo Dark"
              className="hidden dark:block"
              style={{ width: "125px" }}
            />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Access your digital workspace.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase tracking-[0.15em]">
                Work Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all
                    ${email && !emailValid
                      ? "border-red-500 bg-red-50/20"
                      : "border-gray-200 dark:border-gray-700 focus:border-indigo-600"
                    } bg-transparent text-gray-900 dark:text-white`}
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase tracking-[0.15em]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  maxLength={8}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm outline-none transition-all
                    ${password && !passwordValid
                      ? "border-red-500 bg-red-50/20"
                      : "border-gray-200 dark:border-gray-700 focus:border-indigo-600"
                    } bg-transparent text-gray-900 dark:text-white`}
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                  {passwordValid ? (
                    <Unlock className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Lock className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full py-3 mt-4 font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] text-sm
                ${isFormValid
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 dark:shadow-none"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800"
                }`}
            >
              Continue
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-50 dark:bg-gray-800/50">
          <div className="w-full h-full">
            <img 
              src="gif.gif" 
              alt="Visual Illustration" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;