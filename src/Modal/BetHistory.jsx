import React, { useState,useEffect } from "react";
import { FaTimes, FaDollarSign, FaCheckCircle } from "react-icons/fa";
import { currency } from "../utils/keys";
import axios from "axios";
import { configModalUsaWin } from "../utils/apis";
import { toast } from "react-toastify";

const BetHistory = ({ title, data, onClose, onLoadMore }) => {
  const [winninDataNew, setWinninDataNew] = useState([]);
  const betHisotry=async()=>{
    try{
      const userId= localStorage.getItem("userId")
           const payload = {
            uid: userId,
            game_id: 5,
        }
      const res = await axios.post(`${configModalUsaWin}aviator_history`, payload)
            // toast.success(res?.data?.message)
            // console.log("betbetebetebete", res)
            if (res?.data?.status === 200) {
                setWinninDataNew(res?.data?.data)
                console.log("data history:", res?.data?.data);
            } else {
                 toast.warn(res?.data?.message, {
                    className: 'custom-toast custom-toast-warn',
                });
            } 
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    betHisotry()
  },[])
    // console.log("hdatatatata",data)
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
      <div className="bg-[#3A3D51] w-[90%] max-w-xl rounded-xl relative shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose}>
            <FaTimes className="text-white text-xl" />
          </button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-4 px-6 text-sm text-gray-300 pb-2">
          <div>Date</div>
          <div>Bet,X</div>
          <div>Cashout</div>
          {/* <div>Win</div> */}
        </div>

        {/* Table Rows */}
        <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-transparent px-4">
          {winninDataNew.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 items-center bg-[#44475A] rounded-md text-white py-2 px-2 my-2"
            >
              <div className="text-[12px]">{item.created_at}</div>
              <div className="flex items-center space-x-1 text-[12px]">
                {currency}
                <span>{item.amount}</span>
              </div>
              <div className="bg-[#333647] w-10 text-center py-0.5 rounded text-xs font-bold">
                x{item.multiplier ? item.multiplier : 0}
              </div>
              {/* <div className="flex items-center space-x-1 text-[12px]">
                <>
                  {item.win_amount > 0 && currency}
                  <span>{item.win_amount ? item.win_amount : "--"}</span>
                </>

                <FaCheckCircle className="text-green-400 ml-auto" />
              </div> */}
            </div>
          ))}
        </div>

        {/* Footer Button */}
        {/* <div className="p-6">
          <button
            onClick={onLoadMore}
            className="w-full py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition"
          >
            LOAD MORE
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default BetHistory;
