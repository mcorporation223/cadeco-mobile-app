import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Globe, ChevronDown, User, CreditCard } from "lucide-react";

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  accountNumber: string;
}

export const TransferFunds: React.FC = () => {
  const navigate = useNavigate();

  // Source Account
  const [fromAccount, setFromAccount] = useState("");

  // Beneficiary Details
  const [beneficiaryCountry, setBeneficiaryCountry] = useState("");
  const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");

  // Transfer Details
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [purpose, setPurpose] = useState("");
  const [reference, setReference] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Beneficiary, 2: Bank, 3: Transfer Details, 4: Review

  // Mock account data
  const accounts: Account[] = [
    {
      id: "1",
      name: "Checking Account",
      type: "Checking",
      balance: 8247.52,
      accountNumber: "****1234",
    },
    {
      id: "2",
      name: "Savings Account",
      type: "Savings",
      balance: 4600.0,
      accountNumber: "****5678",
    },
  ];

  const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF"];
  const countries = [
    "Rwanda",
    "Uganda",
    "Kenya",
    "United States",
    "Canada",
    "United Kingdom",
  ];

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);

      // Reset form after 2 seconds and go back
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }, 1500);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(value));
  };

  const selectedFromAccount = accounts.find((acc) => acc.id === fromAccount);

  const isStep1Valid =
    beneficiaryCountry &&
    beneficiaryAddress &&
    bankName &&
    bankAddress &&
    accountName &&
    accountNumber &&
    swiftCode;
  const isStep2Valid =
    fromAccount && amount && parseFloat(amount) > 0 && currency && purpose;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-teal-700 px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() =>
              currentStep > 1
                ? setCurrentStep(currentStep - 1)
                : navigate("/home")
            }
            className="text-white hover:bg-teal-600 p-2 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-white text-2xl font-semibold">Transfer</h1>
            <p className="text-white/80 text-xs mt-1">
              Step {currentStep} of 3
            </p>
          </div>
          <Globe className="w-8 h-8 text-white/80" />
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1 flex-1 rounded-full transition-colors ${
                step <= currentStep ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl shadow-2xl p-8 text-center w-[300px]">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Transfer Initiated!
          </h3>
          <p className="text-gray-600">
            Your international transfer is being processed
          </p>
        </div>
      )}

      {/* Form - Multi-Step */}
      <div className="flex-1 overflow-y-auto pb-36">
        <div className="p-6 space-y-6">
          {/* Step 1: Transfer Details */}
          {currentStep === 1 && (
            <>
              <div className="bg-white rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-5 h-5 text-teal-700" />
                  <h2 className="font-semibold text-gray-900">
                    Transfer Information
                  </h2>
                </div>
                <p className="text-sm text-gray-600">
                  Enter the transfer details
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Beneficiary Country *
                </label>
                <div className="relative">
                  <select
                    value={beneficiaryCountry}
                    onChange={(e) => setBeneficiaryCountry(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  value={beneficiaryAddress}
                  onChange={(e) => setBeneficiaryAddress(e.target.value)}
                  placeholder="KG 123 St, Kigali, Rwanda"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bank Name *
                </label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="Bank of Kigali"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bank Address *
                </label>
                <input
                  type="text"
                  value={bankAddress}
                  onChange={(e) => setBankAddress(e.target.value)}
                  placeholder="KN 2 Ave, Kigali, Rwanda"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Account Name *
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Account Number *
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="1234567890"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  SWIFT Code *
                </label>
                <input
                  type="text"
                  value={swiftCode}
                  onChange={(e) => setSwiftCode(e.target.value.toUpperCase())}
                  placeholder="BKIGRWRW"
                  maxLength={11}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <p className="mt-1 text-xs text-gray-500">8 or 11 characters</p>
              </div>
            </>
          )}

          {/* Step 2: Transfer Amount Details */}
          {currentStep === 2 && (
            <>
              <div className="bg-white rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="w-5 h-5 text-teal-700" />
                  <h2 className="font-semibold text-gray-900">
                    Transfer Details
                  </h2>
                </div>
                <p className="text-sm text-gray-600">
                  Specify amount and purpose
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  From Account *
                </label>
                <div className="relative">
                  <select
                    value={fromAccount}
                    onChange={(e) => setFromAccount(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select account</option>
                    {accounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name} - {formatCurrency(account.balance)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {selectedFromAccount && (
                  <p className="mt-2 text-sm text-gray-600">
                    Available: {formatCurrency(selectedFromAccount.balance)}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Currency *
                  </label>
                  <div className="relative">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      {currencies.map((curr) => (
                        <option key={curr} value={curr}>
                          {curr}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Purpose of Transfer *
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select purpose</option>
                  <option value="family">Family Support</option>
                  <option value="education">Education</option>
                  <option value="business">Business Payment</option>
                  <option value="investment">Investment</option>
                  <option value="gift">Gift</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reference/Note
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Payment reference"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <>
              <div className="bg-white rounded-xl p-4 mb-4">
                <h2 className="font-semibold text-gray-900 mb-2">
                  Review Transfer
                </h2>
                <p className="text-sm text-gray-600">
                  Please confirm all details before proceeding
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    Transfer Details
                  </h3>
                  <p className="text-gray-900 font-medium">
                    Country: {beneficiaryCountry}
                  </p>
                  <p className="text-sm text-gray-600">
                    Address: {beneficiaryAddress}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    Bank Details
                  </h3>
                  <p className="text-gray-900 font-medium">{bankName}</p>
                  <p className="text-sm text-gray-600">
                    Bank Address: {bankAddress}
                  </p>
                  <p className="text-sm text-gray-600">
                    Account Name: {accountName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Account Number: {accountNumber}
                  </p>
                  <p className="text-sm text-gray-600">SWIFT: {swiftCode}</p>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    Transfer Amount
                  </h3>
                  <p className="text-3xl font-bold text-teal-700">
                    {currency} {parseFloat(amount).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    From: {selectedFromAccount?.name}
                  </p>
                  <p className="text-sm text-gray-600">Purpose: {purpose}</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> International transfers may take 1-5
                  business days. Transfer fees may apply.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-3">
        {currentStep < 3 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={
              (currentStep === 1 && !isStep1Valid) ||
              (currentStep === 2 && !isStep2Valid)
            }
            className="w-full bg-teal-700 hover:bg-teal-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleTransfer}
            disabled={isProcessing}
            className="w-full bg-teal-700 hover:bg-teal-800 disabled:bg-gray-400 text-white font-semibold py-4 rounded-xl transition-colors"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              "Confirm & Send"
            )}
          </button>
        )}

        {currentStep > 1 && currentStep < 3 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-4 rounded-xl transition-colors"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
};
