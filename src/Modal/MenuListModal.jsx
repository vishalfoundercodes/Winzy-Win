import React,{useEffect, useState} from "react";
import { HiOutlineMusicNote } from "react-icons/hi";
import ToggleButton from "../ReusableComponents/ToggleButton";
import { AiOutlineHistory, AiOutlineSound } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";
import { IoWalletOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { PiHandWithdraw } from "react-icons/pi";
import PayinModal from "../services/Payin";
import PayOutModal from '../services/Payout'
import ChangeAvatarModal from "../Modal/ChangeAvtarModal";
import { FiLogOut } from "react-icons/fi";
import useApi from "../hooks/useApi";
import { apis, referral_url } from "../utils/apis";
import FirstWithdrawPopup from "./FirstWithdrawPopup";
import YourDepositHistoryModal from "./YourDepositHistoryModal";
import YourWithdrawHistoryModal from "./YourWithdrawHistoryModal"
import EKYCPopUp from "./EKYCPopUp";
import { toast } from "react-toastify";
import { FaUserShield } from "react-icons/fa"; 

function MenuListModal({
  isOpen,
  onClose,
  toggleSound,
  setToggleSound,
  toggleMusic,
  setToggleMusic,
  setIsModalOpenForGameRules,
  setIsModalOpenForBetHistory,
  profileData,
  setProfileRefresher,
  restartGame,
}) {
  const navigate = useNavigate();

  const [showPayinModal, setShowPayinModal] = useState(false);
  const [showPayOutModal, setShowPayOutModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showFirstWithdrawPopup, setShowFirstWithdrawPopup] = useState(false);
  const [showDepositHistory, setShowDepositHistory] = useState(false);
  const [showWithdrawHistory, setShowWithdrawHistory] = useState(false);
  const [eKYC, seteKYC] = useState(false);
  const [kycButton, setkycButton] = useState(false);

  const { get } = useApi();
  useEffect(() => {
    if (!isOpen) return; // Only run when modal is open

    const fetchData = async () => {
      try {
        const userid = localStorage.getItem("userId");
        const res = await get(`${apis?.profile}${userid}`);
        console.log("MenuListModal profile:", res.data.profile.is_ekyc);
        setkycButton(res.data.profile.is_ekyc);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [isOpen]); // re-run every time modal opens

  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem("userId");
    // toast.success("Logged out successfully");
    restartGame();
    onClose(); // close the modal
    navigate("/");
    // or navigate to your login/home route
  };

  const handleWithdraw = async () => {
    try {
      const userid = localStorage.getItem("userId");
      const res = await get(`${apis?.profile}${userid}`);
      console.log("menu list modal profile:", res.data);
      const firstRecharge = res?.data?.profile?.first_recharge;

      // if (firstRecharge === 1 || firstRecharge === 2) {
        setShowPayOutModal(true);
      // } else {
        // setShowFirstWithdrawPopup(true);
      // }
    } catch (error) {
      console.error("Failed to fetch profile for withdraw check", error);
    }
  };

return (
  <div className="fixed inset-0 bg-black/70 z-50" onClick={onClose}>
    {/* Modal Panel */}
    <div
      className="absolute top-16 right-5 w-72 bg-[#2C2D30] text-white shadow-xl z-50 rounded-md overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="bg-[#3A3C40] px-4 py-3 flex items-center justify-around">
        {/* <img
          className="w-8 h-8 rounded-full"
          src={profileData?.profile_image}
          alt="avatar"
        />
        <p className="font-semibold">{profileData?.name || "admin"}</p> */}
        <button
          onClick={() => setShowAvatarModal(true)}
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#44464A] transition"
        >
          <img
            className="w-6 h-6 rounded-full"
            src={profileData?.userimage}
            alt="avatar"
          />
          <span className="text-[#aaa] hover:text-green-400">
            Change avatar
          </span>
        </button>
        {/* <button
          onClick={onClose}
          className="text-white text-xl hover:text-red-400 transition"
        >
          &times;
        </button> */}
      </div>

      {/* Content */}
      <div className="flex flex-col text-sm">
        {/* Avatar */}
        {/* <button
          onClick={() => setShowAvatarModal(true)}
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#44464A] transition"
        >
          <img
            className="w-6 h-6 rounded-full"
            src={profileData?.profile_image}
            alt="avatar"
          />
          <span className="text-[#aaa] hover:text-green-400">
            Change avatar
          </span>
        </button> */}

        {/* Sound */}
        {/* <div className="flex items-center justify-between px-4 py-3 hover:bg-[#44464A] transition">
          <div className="flex items-center gap-3">
            <AiOutlineSound size={15} />
            <p>Sound</p>
          </div>
          <ToggleButton
            toggle={toggleSound}
            setToggle={setToggleSound}
            w={32}
            h={16}
          />
        </div> */}

        {/* Music */}
        {/* <div className="flex items-center justify-between px-4 py-3 hover:bg-[#44464A] transition">
          <div className="flex items-center gap-3">
            <HiOutlineMusicNote size={15} />
            <p>Music</p>
          </div>
          <ToggleButton
            toggle={toggleMusic}
            setToggle={setToggleMusic}
            w={8}
            h={4}
          />
        </div> */}

        {/* Menu items */}
        {/* <button
          onClick={() => setIsModalOpenForGameRules(true)}
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#44464A] transition"
        >
          <TfiWrite size={15} />
          <p>Games rules</p>
        </button> */}

        <button
          onClick={() => setIsModalOpenForBetHistory(true)}
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#44464A] transition"
        >
          <AiOutlineHistory size={15} />
          <p>My bet history</p>
        </button>

        <button
          onClick={() => setShowPayinModal(true)}
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#44464A] transition"
        >
          <IoWalletOutline size={15} />
          <p>Recharge</p>
        </button>

        <button
          onClick={() => {
            // if (kycButton == 1) {
            //   toast.warning("Complete your eKYC");
            // } else {
            handleWithdraw();
            // }
          }}
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#44464A] transition"
        >
          <PiHandWithdraw size={15} />
          <p>Withdraw</p>
        </button>

        <button
          onClick={() => setShowDepositHistory(true)}
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#44464A] transition"
        >
          <IoWalletOutline size={15} />
          <p>Deposit History</p>
        </button>

        <button
          onClick={() => setShowWithdrawHistory(true)}
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#44464A] transition"
        >
          <PiHandWithdraw size={15} />
          <p>Withdraw History</p>
        </button>

        {kycButton == 1 && (
          <button
            onClick={() => seteKYC(true)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-[#44464A] transition"
          >
            <FaUserShield size={15} />
            <p>eKYC</p>
          </button>
        )}

        <button
          onClick={() => {
            // console.log(profileData)
                const referralCode =
                  profileData?.referral_code || "defaultCode"; // fallback just in case
                const referralLink = `${referral_url}${referralCode}`;
            const shareData = {
              title: "Play Chicken Road Game",
              text: "Check out this exciting Chicken Road Game and earn rewards! 🐔🔥",
              url: referralLink,
            };
            if (navigator.share) {
              navigator.share(shareData).catch(console.error);
            } else {
              navigator.clipboard.writeText(shareData.url);
              alert("Link copied to clipboard!");
            }
          }}
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#44464A] transition"
        >
          <TfiWrite size={15} />
          <p>Referral</p>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-[#552222] transition"
        >
          <FiLogOut size={16} />
          <p>Logout</p>
        </button>
      </div>
    </div>
    {showPayinModal && (
      <PayinModal
        isOpen={showPayinModal}
        onClose={() => setShowPayinModal(false)}
      />
    )}
    {showPayOutModal && (
      <PayOutModal
        isOpen={showPayOutModal}
        setProfileRefresher={setProfileRefresher}
        onClose={() => setShowPayOutModal(false)}
      />
    )}
    {showAvatarModal && (
      <ChangeAvatarModal
        onClose={() => setShowAvatarModal(false)}
        onSelect={(selectedAvatar) => {
          // Optional: update avatar in backend or local state
          // console.log("Selected Avatar:", selectedAvatar);
        }}
        setProfileRefresher={setProfileRefresher}
      />
    )}
    {showFirstWithdrawPopup && (
      <FirstWithdrawPopup
        isOpen={showFirstWithdrawPopup}
        onClose={() => setShowFirstWithdrawPopup(false)}
      />
    )}
    {showDepositHistory && (
      <YourDepositHistoryModal
        isOpen={showDepositHistory}
        title="My deposit history"
        onClose={() => setShowDepositHistory(false)}
      />
    )}

    {showWithdrawHistory && (
      <YourWithdrawHistoryModal
        isOpen={showWithdrawHistory}
        title="My withdraw history"
        onClose={() => setShowWithdrawHistory(false)}
      />
    )}
  </div>
);

}

export default MenuListModal;
