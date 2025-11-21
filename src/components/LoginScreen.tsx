import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Fingerprint } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export const LoginScreen: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [saveUserId, setSaveUserId] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(userId, password);
      if (success) {
        navigate("/home");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-200 to-white">
      {/* Hero Image Section */}
      <div className="relative h-[280px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Login Form Section */}
      <div className="flex-1 px-8 -mt-10 relative z-10">
        {/* Logo */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 justify-center mb-8">
            <svg className="w-12 h-8" viewBox="0 0 48 32" fill="none">
              <path d="M0 32L12 0L24 32H16L12 20L8 32H0Z" fill="#B8860B" />
              <path d="M16 32L28 0L40 32H32L28 20L24 32H16Z" fill="#DAA520" />
              <path d="M32 32L44 0L48 8L40 32H32Z" fill="#B8860B" />
            </svg>
            <span className="text-3xl font-bold text-gray-900">CADECO</span>
          </div>

          {/* User ID Field */}
          <div className="mb-4">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2">
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="flex-1 text-base text-gray-700 outline-none bg-transparent placeholder-gray-400"
              />
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Save</span>
                <button
                  onClick={() => setSaveUserId(!saveUserId)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    saveUserId ? "bg-teal-600" : "bg-gray-300"
                  } relative`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      saveUserId ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-2">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 text-base text-gray-700 outline-none bg-transparent placeholder-gray-400"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="mb-6">
            <button className="text-blue-600 text-sm hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading || !userId || !password}
            className="w-full bg-teal-700 hover:bg-teal-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg mb-4 transition-colors"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {/* Face ID */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                <Fingerprint className="w-6 h-6 text-gray-400" />
              </div>
              <span className="text-sm text-blue-600">Face ID</span>
            </div>
            <button className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center hover:bg-teal-800 transition-colors">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 bg-white px-8 py-4">
        <div className="flex justify-between items-center">
          <button className="text-sm text-teal-700 font-medium hover:text-teal-800">
            Sign Up
          </button>
          <button className="text-sm text-teal-700 font-medium hover:text-teal-800">
            More
          </button>
        </div>
      </div>
    </div>
  );
};
