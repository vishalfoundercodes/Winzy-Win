import "./App.css";
import Game from "./GameComponent/Game";
import Avitor from "./AviatorGame/AviatorHome";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { Route, Routes, useParams } from "react-router-dom";
import Payin from "./services/Payin";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Payout from "./services/Payout";
import Home from "./LandingPage/Home";

// Create a wrapper component for the referral route
function ReferralHome() {
  const { referralCode } = useParams();

  return (
    <div className="bg-[#071426]">
      <Home showSignupOnLoad={true} referralCode={referralCode} />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="bg-[#071426]">
            <Home />
          </div>
        }
      />

      <Route path="/refer/:referralCode" element={<ReferralHome />} />

      <Route
        path="/aviator"
        element={
          <ProtectedRoute>
            <div className="bg-[#0E0E0E] h-[100dvh] overflow-hidden">
              <Avitor />
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payin"
        element={
          <ProtectedRoute>
            <div className="bg-boxColor h-[100dvh] overflow-hidden">
              <Payin />
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payout"
        element={
          <div className="bg-boxColor h-[100dvh] overflow-hidden">
            <Payout />
          </div>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
