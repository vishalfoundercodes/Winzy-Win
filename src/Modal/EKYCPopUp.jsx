import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { apis } from "../utils/apis";
import useApi from "../hooks/useApi";
import PayinModal from "../services/Payin";

export default function eKYCPopUp({
  isOpen,
  onClose,
  setProfileRefresher,
}) {
  const { get } = useApi();
  const userid = localStorage.getItem("userid");
  const [rechargeVlaue, setRechargeVlaue] = useState("");
  const [showPayinModal, setShowPayinModal] = useState(false);

  if (!isOpen) return null; // Do not render if modal is not open

  const profileHandler = () => {
    get(`${apis?.profile}${userid}`)
      .then((res) => {
        console.log("response ekyc", res);
        if (res?.data?.status === true) {
          console.log("ekyc data 2:", res?.data.profile.ekyc_amount);
          setRechargeVlaue(res?.data.profile.ekyc_amount);
          // if (typeof setProfileRefresher === "function") {
          //   setProfileRefresher(true);
          // }
          // onClose();
           // close modal
        }
      })
      .catch(console.error);
  };

  // const values = async () => {
  //   try {
  //     const res = await get(`${apis?.gameRule_request}`);
  //     const data = res?.data?.data;
  //     // console.log("res for first recharge:", res.data.data.min_recharge);
  //     setRechargeVlaue(res.data.data.min_recharge);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // values();
    profileHandler()
  }, []);

  const ammount=500
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      {/* <div className="relative bg-[#25283D] w-full max-w-80 rounded-2xl shadow-2xl p-6 text-white"> */}
      <div className="relative bg-[#25283D] w-[80%]  xs2:max-w-[40%] lg:w-[400px] lg:max-w-[400px] rounded-2xl shadow-2xl text-white flex flex-col max-h-[80vh] ">
        {/* Header with Close button */}
        <div className="sticky top-0 bg-[#25283D] z-10 px-6 pt-6 pb-2 rounded-t-2xl">
          <button
            className="absolute top-2 right-4 text-gray-300 hover:text-red-400 transition cursor-pointer"
            onClick={onClose}
          >
            <FaTimes size={20} />
          </button>
          <h2 className="text-xl font-bold text-center">eKYC</h2>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 py-2 flex-1 hide-scrollbar">
          <p className="text-sm text-center mb-4">
            अगर आपने withdrawal किया है और स्टेटस 'सक्सेसफुल' दिखा रहा है, लेकिन
            राशि आपके बैंक खाते या UPI में नहीं आई है, तो कृपया घबराएं नहीं।
            आपका भुगतान सुरक्षित है। इसके लिए कृपया अपना eKYC पूरा करें। eKYC
            पूरा करने के लिए पहले ₹{rechargeVlaue} का रिचार्ज करें। जैसे ही आप
            eKYC सफलतापूर्वक पूरा कर लेंगे, आपकी राशि 5 से 10 मिनट के भीतर आपके
            बैंक खाते या UPI में स्वतः आ जाएगी।
          </p>
          <p className="text-sm text-center mb-6">
            If you have made a withdrawal and the status shows 'Successful' but
            the amount has not been credited to your bank account or UPI, please
            do not panic. Your payment is secure. For this please complete your
            eKYC. To complete eKYC, first recharge ₹{rechargeVlaue}. Once you
            successfully complete eKYC, your amount will be automatically
            transferred to your bank account or UPI within 5 to 10 minutes.
          </p>
        </div>

        {/* Fixed Footer Button */}
        <div className="sticky bottom-0 bg-[#25283D] z-10 px-6 pt-2 pb-6 rounded-b-2xl">
          <button
            onClick={() => {
              setShowPayinModal(true);
              // onClose();
            }}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-2 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700 "
          >
            Complete eKYC
          </button>
        </div>
      </div>

      {showPayinModal && (
        <PayinModal
          isOpen={showPayinModal}
          kycAmmount={ammount}
          onClose={() => setShowPayinModal(false)}
          rechargeType="eKyc"
        />
      )}
    </div>
  );
}
