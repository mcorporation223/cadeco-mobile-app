import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Receipt,
  ChevronDown,
  FileText,
  CreditCard,
  Calendar,
} from "lucide-react";

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  accountNumber: string;
}

export const TaxPayment: React.FC = () => {
  const navigate = useNavigate();

  // Tax Information
  const [taxType, setTaxType] = useState("");
  const [taxYear, setTaxYear] = useState("");
  const [taxPeriod, setTaxPeriod] = useState("");
  const [ssn, setSsn] = useState("");
  const [ein, setEin] = useState("");

  // Payment Details
  const [fromAccount, setFromAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentType, setPaymentType] = useState("");

  // Additional Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Tax Info, 2: Payment Details, 3: Review

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

  const taxTypes = [
    "Property Tax",
    "Sales Tax",
    "Corporate Tax",
    "Self-Employment Tax",
    "Estimated Tax",
    "Other",
  ];

  const paymentTypes = [
    "Balance Due",
    "Extension Payment",
    "Estimated Payment - 1st Quarter",
    "Estimated Payment - 2nd Quarter",
    "Estimated Payment - 3rd Quarter",
    "Estimated Payment - 4th Quarter",
  ];

  const provinces = ["Nord Kivu", "South Kivu"];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const handlePayment = async () => {
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

  const isStep1Valid = taxType && taxYear && (ssn || ein);
  const isStep2Valid =
    fromAccount &&
    amount &&
    parseFloat(amount) > 0 &&
    paymentDate &&
    paymentType;

  const isBusinessTax = taxType === "Corporate Tax" || taxType === "Sales Tax";

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
            <h1 className="text-white text-2xl font-semibold">Tax Payment</h1>
            <p className="text-white/80 text-xs mt-1">
              Step {currentStep} of 3
            </p>
          </div>
          <Receipt className="w-8 h-8 text-white/80" />
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
            Payment Successful!
          </h3>
          <p className="text-gray-600">Your tax payment has been processed</p>
        </div>
      )}

      {/* Form - Multi-Step */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-6 space-y-6">
          {/* Step 1: Tax Information */}
          {currentStep === 1 && (
            <>
              <div className="bg-white rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-5 h-5 text-teal-700" />
                  <h2 className="font-semibold text-gray-900">
                    Tax Information
                  </h2>
                </div>
                <p className="text-sm text-gray-600">Enter your tax details</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tax Type *
                </label>
                <div className="relative">
                  <select
                    value={taxType}
                    onChange={(e) => setTaxType(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select tax type</option>
                    {taxTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tax Year *
                </label>
                <div className="relative">
                  <select
                    value={taxYear}
                    onChange={(e) => setTaxYear(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {taxType === "Estimated Tax" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tax Period
                  </label>
                  <div className="relative">
                    <select
                      value={taxPeriod}
                      onChange={(e) => setTaxPeriod(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select period</option>
                      <option value="Q1">Q1 (Jan-Mar)</option>
                      <option value="Q2">Q2 (Apr-Jun)</option>
                      <option value="Q3">Q3 (Jul-Sep)</option>
                      <option value="Q4">Q4 (Oct-Dec)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {!isBusinessTax ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tax Identification Number *
                    </label>
                    <input
                      type="text"
                      value={ssn}
                      onChange={(e) => setSsn(e.target.value)}
                      placeholder="XXX-XX-XXXX"
                      maxLength={11}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="ABC Corporation"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Employer Identification Number (EIN) *
                    </label>
                    <input
                      type="text"
                      value={ein}
                      onChange={(e) => setEin(e.target.value)}
                      placeholder="XX-XXXXXXX"
                      maxLength={10}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Himbi"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Goma"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Province *
                  </label>
                  <div className="relative">
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select</option>
                      {provinces.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 2: Payment Details */}
          {currentStep === 2 && (
            <>
              <div className="bg-white rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="w-5 h-5 text-teal-700" />
                  <h2 className="font-semibold text-gray-900">
                    Payment Details
                  </h2>
                </div>
                <p className="text-sm text-gray-600">
                  Enter payment information
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Payment Type *
                </label>
                <div className="relative">
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select payment type</option>
                    {paymentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Payment Amount *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Payment Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-white border border-gray-300 rounded-xl pl-12 pr-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Schedule your payment for today or a future date
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-14">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Payment Summary
                </h3>
                <div className="space-y-1 text-sm text-blue-800">
                  <p>
                    <span className="font-medium">Tax Type:</span> {taxType}
                  </p>
                  <p>
                    <span className="font-medium">Tax Year:</span> {taxYear}
                  </p>
                  <p>
                    <span className="font-medium">Amount:</span> $
                    {parseFloat(amount || "0").toFixed(2)}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <>
              <div className="bg-white rounded-xl p-4 mb-4">
                <h2 className="font-semibold text-gray-900 mb-2">
                  Review Payment
                </h2>
                <p className="text-sm text-gray-600">
                  Please confirm all details before submitting
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    Tax Information
                  </h3>
                  <p className="text-gray-900 font-medium">{taxType}</p>
                  <p className="text-sm text-gray-600">Tax Year: {taxYear}</p>
                  {taxPeriod && (
                    <p className="text-sm text-gray-600">Period: {taxPeriod}</p>
                  )}
                  {!isBusinessTax ? (
                    <p className="text-sm text-gray-600">
                      {firstName} {lastName} - SSN: ***-**-{ssn.slice(-4)}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">
                      {businessName} - EIN: **-***{ein.slice(-4)}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    {address}, {city}, {state}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    Payment Details
                  </h3>
                  <p className="text-3xl font-bold text-teal-700">
                    ${parseFloat(amount).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    From: {selectedFromAccount?.name}
                  </p>
                  <p className="text-sm text-gray-600">Type: {paymentType}</p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(paymentDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> By confirming this payment, you
                  authorize CADECO to debit your account for the specified
                  amount. Payment processing will take a few minutes.
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
            onClick={handlePayment}
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
              "Confirm Payment"
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
