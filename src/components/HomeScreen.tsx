import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Settings,
  ArrowRightLeft,
  FileText,
  Smartphone,
  FileCheck,
  HandCoins,
  TrendingUp,
  Receipt,
  Shield,
  Lock,
  Send,
  Smartphone as MobileIcon,
  MoreHorizontal,
  LogOut,
  Eye,
  EyeOff,
  Home,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export const HomeScreen: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-teal-700 to-teal-800">
      {/* Header */}
      <div className="bg-teal-700 px-6 pt-12 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-xl font-semibold">Home</h1>
          <div className="flex items-center gap-3">
            <button className="text-white hover:bg-teal-600 p-2 rounded-full transition-colors">
              <Settings className="w-6 h-6" />
            </button>
            <button
              onClick={handleLogout}
              className="text-white hover:bg-teal-600 p-2 rounded-full transition-colors"
              title="Logout"
            >
              <LogOut className="w-6 h-6" />
            </button>
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Account Balance Section */}
        <div className="bg-white/10 rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm font-medium">Total Balance</p>
              <h2 className="text-white text-3xl font-bold">
                {showBalance ? "$12,847.52" : "••••••"}
              </h2>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-white/80 hover:text-white transition-colors"
            >
              {showBalance ? (
                <Eye className="w-6 h-6" />
              ) : (
                <EyeOff className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Quick Account Summary */}
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-white/80 text-xs">Checking</p>
              <p className="text-white text-sm font-semibold">
                {showBalance ? "$8,247.52" : "••••••"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-white/80 text-xs">Savings</p>
              <p className="text-white text-sm font-semibold">
                {showBalance ? "$4,600.00" : "••••••"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-white/80 text-xs">Credit</p>
              <p className="text-white text-sm font-semibold">
                {showBalance ? "$2,350.00" : "••••••"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="flex-1 bg-gray-50 overflow-y-auto pb-20">
        {/* Account Services Section */}
        <div className="bg-white mb-2">
          <button className="w-full px-6 py-3 flex items-center justify-between border-b border-gray-200">
            <h2 className="text-gray-700 font-semibold">Account Services</h2>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div className="grid grid-cols-2 gap-px bg-gray-200">
            <button
              onClick={() => navigate("/transfer-funds")}
              className="bg-white px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <ArrowRightLeft className="w-5 h-5 text-teal-700" />
                <span className="text-sm text-gray-700 font-medium">
                  Transfer Funds
                </span>
              </div>
            </button>
            <button className="bg-white px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-teal-700" />
                <span className="text-sm text-gray-700 font-medium">
                  Statements
                </span>
              </div>
            </button>
            <button className="bg-white px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-teal-700" />
                <span className="text-sm text-gray-700 font-medium">
                  Mobile Deposit
                </span>
              </div>
            </button>
            <button className="bg-white px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <FileCheck className="w-5 h-5 text-teal-700" />
                <span className="text-sm text-gray-700 font-medium">
                  Order Checks
                </span>
              </div>
            </button>
          </div>

          <button className="w-full bg-white px-6 py-4 hover:bg-gray-50 transition-colors border-t border-gray-200">
            <div className="flex items-center gap-3">
              <HandCoins className="w-5 h-5 text-teal-700" />
              <span className="text-sm text-gray-700 font-medium">
                Stop a Payment
              </span>
            </div>
          </button>
        </div>

        {/* Financial Wellness Section */}
        <div className="bg-white mb-2">
          <button className="w-full px-6 py-3 flex items-center justify-between border-b border-gray-200">
            <h2 className="text-gray-700 font-semibold">Financial Wellness</h2>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div className="grid grid-cols-2 gap-px bg-gray-200">
            <button className="bg-white px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-teal-700" />
                <span className="text-sm text-gray-700 font-medium">
                  Credit Score
                </span>
              </div>
            </button>
            <button
              onClick={() => navigate("/tax-payment")}
              className="bg-white px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Receipt className="w-5 h-5 text-teal-700" />
                <span className="text-sm text-gray-700 font-medium">
                  Tax Payment
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Disclosures Section */}
        <div className="bg-white mb-2">
          <button className="w-full px-6 py-3 flex items-center justify-between border-b border-gray-200">
            <h2 className="text-gray-700 font-semibold">Disclosures</h2>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div className="grid grid-cols-2 gap-px bg-gray-200">
            <button className="bg-white px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-teal-700" />
                <span className="text-sm text-gray-700 font-medium">
                  Privacy Notice
                </span>
              </div>
            </button>
            <button className="bg-white px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-teal-700" />
                <span className="text-sm text-gray-700 font-medium">
                  Digital Privacy Disclosure
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* ANB Logo Box */}
        <div className="mx-6 my-6">
          <div className="bg-teal-700 rounded-lg p-6 flex items-center justify-center shadow-lg">
            <svg className="w-16 h-12" viewBox="0 0 48 32" fill="none">
              <path
                d="M0 32L12 0L24 32H16L12 20L8 32H0Z"
                fill="white"
                opacity="0.9"
              />
              <path d="M16 32L28 0L40 32H32L28 20L24 32H16Z" fill="white" />
              <path d="M32 32L44 0L48 8L40 32H32Z" fill="white" opacity="0.9" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 rounded-b-[48px]">
        <div className="grid grid-cols-5 gap-1">
          <button className="flex flex-col items-center py-2 text-teal-700 transition-colors">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button
            onClick={() => navigate("/transfer-funds")}
            className="flex flex-col items-center py-2 text-gray-400 hover:text-teal-700 transition-colors"
          >
            <Send className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Transfer</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-400 hover:text-teal-700 transition-colors">
            <MobileIcon className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Deposit</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-400 hover:text-teal-700 transition-colors">
            <CreditCard className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Bill Pay</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-400 hover:text-teal-700 transition-colors">
            <MoreHorizontal className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </div>
    </div>
  );
};
