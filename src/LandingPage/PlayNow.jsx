// import React from 'react'
// import chickenRoadGame from "../assets/chickenRoadGameCoverImage.png";

// export default function PlayNow() {
//   return (
//     <div>
//       <div
//         style={{ backgroundImage: `url(${chickenRoadGame})` }}
//         className="w-full gap-2 pt-2 bg-cover bg-center h-[100px] rounded-[15px] mt-1 cursor-pointer"
//         onClick={() => navigate("/chickenroad")}
//       >
//         {/* <h1>Chicken Road</h1> */}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import chickenRoadGame from "../assets/chickenRoadGameCoverImage.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PlayNow() {
  const navigate = useNavigate();

  // 👇 Names list (you can add as many as you want)
  const names = [
    { first: "VISHAL", last: "884.36" },
    { first: "ROHIT", last: "9658.23" },
    { first: "AMAN", last: "20036.52" },
    { first: "NEHA", last: "42003.62" },
    { first: "RAHUL", last: "87466.32" },
  ];

  const [index, setIndex] = useState(0);

  // 👇 Change name every second
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % names.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const play=()=>{
    const userId=localStorage.getItem("userId")
    if(userId){
      navigate("/aviator")
    }
    else{
      toast.error("Login first")
    }
  }

  return (
    <div className="mt-1 cursor-pointer rounded-[15px] overflow-hidden p-2">
      <div className="max-h-100 bg-[#071426] flex flex-col items-center justify-start py-0">
        {/* Top button */}
        <div className="w-full flex justify-center">
          <button
            className="mt-2 mb-2 bg-[#e85d0f] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transform active:translate-y-0.5 transition cursor-pointer"
            onClick={() => play()}
          >
            PLAY NOW
          </button>
        </div>

        {/* Main card */}
        <div className="w-full px-0">
          <div className="rounded-xl border border-[#394553] bg-[#2f3843]/60 p-2 sm:p-2 md:p-2 shadow-inner">
            <div className="flex flex-col items-center text-center gap-0">
              <div className="text-sm sm:text-base text-[#9aa3ad] font-semibold">
                {names[index].first}
              </div>
              <div className="text-xs sm:text-sm tracking-wider text-[#9aa3ad] font-medium">
                APPROVED WITHDRAWAL:
              </div>
              <div className="mt-1 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#28c281]">
                ₹ {names[index].last}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// import React from "react";

// export default function ApprovedWithdrawal({ name = "neha M.", amount = 124300 }) {
//   const formatted = new Intl.NumberFormat("en-IN").format(amount);

//   return (
//     <div className="min-h-screen bg-[#071426] flex flex-col items-center justify-start py-8 px-4">
//       {/* Top button */}
//       <div className="w-full flex justify-center">
//         <button className="mt-2 mb-8 bg-[#e85d0f] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transform active:translate-y-0.5 transition">
//           LOGIN TO PLAY
//         </button>
//       </div>

//       {/* Main card */}
//       <div className="w-full max-w-6xl px-4">
//         <div className="rounded-xl border border-[#394553] bg-[#2f3843]/60 p-6 sm:p-8 md:p-10 shadow-inner">
//           <div className="flex flex-col items-center text-center gap-2">
//             <div className="text-sm sm:text-base text-[#9aa3ad] font-semibold">{name}</div>
//             <div className="text-xs sm:text-sm tracking-wider text-[#9aa3ad] font-medium">
//               APPROVED WITHDRAWAL:
//             </div>
//             <div className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#28c281]">
//               ₹ {formatted}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

