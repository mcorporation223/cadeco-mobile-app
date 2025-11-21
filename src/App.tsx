import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { IPhoneFrame } from "./components/IPhoneFrame";
import { LoginScreen } from "./components/LoginScreen";
import { HomeScreen } from "./components/HomeScreen";
import { TransferFunds } from "./components/TransferFunds";
import { TaxPayment } from "./components/TaxPayment";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-2">
          <IPhoneFrame>
            <Routes>
              <Route path="/login" element={<LoginScreen />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomeScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transfer-funds"
                element={
                  <ProtectedRoute>
                    <TransferFunds />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tax-payment"
                element={
                  <ProtectedRoute>
                    <TaxPayment />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </IPhoneFrame>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
