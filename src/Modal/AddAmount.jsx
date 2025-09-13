// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { FaTimes } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { apis } from "../utils/apis";

// const AmountModal = ({ isOpen, onClose, onProceed, profileData }) => {
//   const [amount, setAmount] = useState("");
//   const [minDeposit, setMinDeposit] = useState();

//   if (!isOpen) return null;

//   const handleProceed = async() => {
//     const num = parseInt(amount, 10);
//     if (!num || num < profileData?.minimum_deposit) {
//      toast.warn(`Minimum amount is ${minDeposit}`);
//       return;
//     }
//     if (!num || num > profileData?.maximum_deposit) {
//       toast.warn(`Maximum amount is ${profileData?.maximum_deposit}`);
//       return;
//     }
//     // onProceed(num);
//     try {
//       const userId = localStorage.getItem("userId");
//       const payload={
//         user_id: userId,
//         cash: num,
//         type: "1"
//       }
//       const res=await axios.post(apis?.payin,payload)
//       console.log("payin response:",res)
//       if(res.data.status==="SUCCESS"){
//         const payment_link=res?.data?.payment_link;
//          window.open(payment_link, "_blank");
//       }
//     } catch (error) {
//       console.log("payin error:",error)
//     }
//   };

// useEffect(()=>{
//     console.log("profile data in amount modal:",profileData)
//     setMinDeposit(profileData?.minimum_deposit)
// },[])
//   return (
//     <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
//       <div
//         className="relative bg-[#2c2f4a] w-full max-w-80 rounded-2xl shadow-2xl p-6 text-white"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           className="absolute top-3 right-4 text-gray-300 hover:text-red-400"
//           onClick={onClose}
//         >
//           <FaTimes size={20} />
//         </button>

//         <h2 className="text-xl font-bold text-center mb-4">Enter Amount</h2>
//         <p className="text-sm mb-2 text-gray-300">
//           Minimum recharge:{" "}
//           <span className="font-bold text-white">
//             {profileData.minimum_deposit}
//           </span>
//         </p>

//         <input
//           type="text"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
//           placeholder="Enter amount"
//           className="w-full px-4 py-2 rounded-lg bg-[#4c5169] text-white border border-gray-500 focus:outline-none"
//         />

//         <div className="flex gap-2 mt-3">
//           {[500, 1000, 2000].map((val) => (
//             <button
//               key={val}
//               onClick={() => setAmount(String(val))}
//               className={`px-3 py-1 rounded-full text-sm ${
//                 amount === String(val)
//                   ? "bg-[#004AAD] text-white"
//                   : "bg-[#4c5169] text-white"
//               }`}
//             >
//               {val}
//             </button>
//           ))}
//         </div>

//         <button
//           onClick={handleProceed}
//           className="mt-5 w-full bg-gradient-to-r from-green-500 to-emerald-600 py-2 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700"
//         >
//           Go to Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AmountModal;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { apis } from "../utils/apis";

const AmountModal = ({ isOpen, onClose, onProceed, profileData }) => {
  const [amount, setAmount] = useState("");
  const [minDeposit, setMinDeposit] = useState();
  const [loading, setLoading] = useState(false); // ✅ loader state

  if (!isOpen) return null;

  const handleProceed = async () => {
    const num = parseInt(amount, 10);
    if (!num || num < profileData?.minimum_deposit) {
      toast.warn(`Minimum amount is ${minDeposit}`);
      return;
    }
    if (!num || num > profileData?.maximum_deposit) {
      toast.warn(`Maximum amount is ${profileData?.maximum_deposit}`);
      return;
    }

    try {
      setLoading(true); // ✅ show loader
      const userId = localStorage.getItem("userId");
      const payload = {
        user_id: userId,
        cash: num,
        type: "1",
      };
      const res = await axios.post(apis?.payin, payload);
      console.log("payin response:", res);

      if (res.data.status === "SUCCESS") {
        const payment_link = res?.data?.payment_link;
        window.open(payment_link, "_blank");
      } else {
        toast.error(res?.data?.message || "Payment failed");
      }
    } catch (error) {
      console.log("payin error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // ✅ hide loader
    }
  };

  useEffect(() => {
    console.log("profile data in amount modal:", profileData);
    setMinDeposit(profileData?.minimum_deposit);
  }, [profileData]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div
        className="relative bg-[#2c2f4a] w-full max-w-80 rounded-2xl shadow-2xl p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-4 text-gray-300 hover:text-red-400"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-bold text-center mb-4">Enter Amount</h2>
        <p className="text-sm mb-2 text-gray-300">
          Minimum recharge:{" "}
          <span className="font-bold text-white">
            {profileData.minimum_deposit}
          </span>
        </p>

        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter amount"
          className="w-full px-4 py-2 rounded-lg bg-[#4c5169] text-white border border-gray-500 focus:outline-none"
        />

        <div className="flex gap-2 mt-3">
          {[500, 1000, 2000].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(String(val))}
              className={`px-3 py-1 rounded-full text-sm ${
                amount === String(val)
                  ? "bg-[#004AAD] text-white"
                  : "bg-[#4c5169] text-white"
              }`}
            >
              {val}
            </button>
          ))}
        </div>

        <button
          onClick={handleProceed}
          disabled={loading} // ✅ disable while loading
          className="mt-5 w-full bg-gradient-to-r from-green-500 to-emerald-600 py-2 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700 flex items-center justify-center"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
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
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            "Go to Payment"
          )}
        </button>
      </div>
    </div>
  );
};

export default AmountModal;
