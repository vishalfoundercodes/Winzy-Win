// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import useApi from "../hooks/useApi";
// import { apis } from "../utils/apis";
// import { toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaTimes,
//   FaLock,
//   FaPhoneAlt,
//   FaChevronDown,
//   FaCog,
// } from "react-icons/fa";

// const Register = ({
//   isOpen, onClose
// }) => {
// if (!isOpen) return null;

//   const { post } = useApi();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       phone: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema: Yup.object({
//       // email: Yup.string()
//       //   .email("Invalid email address")
//       //   .required("Email is required"),
//       phone: Yup.string()
//         .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
//         .required("Phone number is required"),
//       password: Yup.string()
//         .min(4, "Password must be at least 4 characters")
//         .required("Password is required"),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref("password"), null], "Passwords must match")
//         .required("Confirm Password is required"),
//     }),
//     onSubmit: async (values, { setSubmitting, setErrors }) => {
//       try {
//         const payload = {
//           email: values.email,
//           phone: values.phone,
//           password: values.password,
//         };

//         const res = await post(`${apis?.register}`, JSON.stringify(payload));
//         const data = res?.data;
//         if (data?.success === true) {
//           toast.success("Registration successful!");
//           navigate("/login");
//         } else {
//           toast.error(data?.message || "Registration failed");
//         }
//       } catch (err) {
//         console.error(err);
//         setErrors({ email: "Server error" });
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <div className="fixed inset-0 w-full z-50 flex items-center justify-center bg-blur bg-opacity-10 backdrop-blur-sm px-2">
//     <div className="min-h-screen flex items-center justify-center bg-mainBetBg p-3">
//       <form
//         onSubmit={formik.handleSubmit}
//         className="bg-white p-6 rounded shadow-md w-full max-w-xl"
//       >
//         <h2 className="text-xl font-semibold text-center mb-4">Register</h2>
//             <button
//                     className="absolute top-2 right-2 text-white z-[9999]"
//                     onClick={() => {
//                       // console.log("Close button clicked");
//                       onClose();
//                     }}
//                   >
//                     <FaTimes />
//                   </button>
//         {["email", "phone", "password", "confirmPassword"].map((field) => (
//           <div className="mb-4" key={field}>
//             <label htmlFor={field} className="block text-gray-700 capitalize">
//               {field === "confirmPassword" ? "Confirm Password" : field}
//             </label>
//             <input
//               type={
//                 field === "password" || field === "confirmPassword"
//                   ? "password"
//                   : "text"
//               }
//               name={field}
//               id={field}
//               placeholder={`Enter your ${
//                 field === "confirmPassword" ? "confirm password" : field
//               }`}
//               value={formik.values[field]}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="w-full px-3 py-2 border border-black rounded text-black placeholder-black"
//             />
//             {formik.touched[field] && formik.errors[field] && (
//               <p className="text-red-500 text-[10px]">{formik.errors[field]}</p>
//             )}
//           </div>
//         ))}

//         <button
//           type="submit"
//           disabled={formik.isSubmitting}
//           className="w-full bg-[#4F5163] text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           {formik.isSubmitting ? "Registering..." : "Register"}
//         </button>
//          <div className="w-full flex items-center text-[13px] mt-5 justify-between">
//           <p className="text-nowrap ">Already registered ? </p>
//           <Link
//             to="/login"
//             type="button"
//             // disabled={formik.isSubmitting}
//             className="w-full text-blue-300 rounded hover:text-blue-700 transition"
//           >
//             &nbsp; Login
//           </Link>
//         </div>
//       </form>
     
//     </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState, useEffect } from "react";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import useApi from "../hooks/useApi";
import { apis } from "../utils/apis";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";

const Register = ({ isOpen, onClose, setProfileRefresher, referralCode }) => {
  if (!isOpen) return null;
  const [showModalLogin, setShowModalLogin] = useState(false);
console.log("/refer",referralCode);
  const { post } = useApi();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  const formik = useFormik({
    initialValues: {
      referral: referralCode || "", // Initialize with referralCode if available
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      country_code: "+91",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      mobile: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const payload = {
          referral: values.referral,
          email: values.email,
          mobile: `${values.mobile}`,
          password: values.password,
          country_code: String(values.country_code),
        };

        console.log("payload register:", payload);
        console.log("api register:", apis?.register);
        const res = await post(`${apis?.register}`, JSON.stringify(payload));
        console.log("res:", res?.data?.status);
        const data = res?.data?.data;
        if (data?.success === true || res?.data?.status === 200) {
          localStorage.setItem("userId", data?.id || data?.userId || "");
          toast.success("Registration successful!");
          setProfileRefresher(true);
          onClose?.();
          navigate("/");
        } else if (res?.data?.status === 400) {
          toast.error(res?.data?.message);
        } else {
          toast.error(data?.message || "Registration failed");
        }
      } catch (err) {
        console.error(err);
        setErrors({ email: "Server error" });
        toast.error("Server error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Update referral field when referralCode prop changes
  useEffect(() => {
    if (referralCode && referralCode !== formik.values.referral) {
      formik.setFieldValue("referral", referralCode);
    }
  }, [referralCode]); // Remove formik from dependency array to avoid infinite loops

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-[#04113a] w-full max-w-[400px] rounded-2xl shadow-2xl p-6 py-2 text-white">
        {/* Close button */}
        <button
          className="absolute top-1 right-3 text-gray-300 hover:text-red-400 transition cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes size={18} />
        </button>
        <div className="max-h-[90vh] overflow-y-auto hide-scrollbar pr-2">
          <h2 className="text-xl font-semibold text-center mb-4">Register</h2>
          <div className="h-[1px] bg-white/20 mb-2" />

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-xs font-semibold text-gray-200"
              >
                EMAIL
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 rounded-md bg-white/95 text-gray-800 placeholder-gray-400 border-none focus:outline-none"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Phone number with country code */}
            <div>
              <label className="block mb-1 text-xs font-semibold text-gray-200">
                PHONE NUMBER
              </label>
              <div className="flex gap-2">
                <div className="flex items-center bg-white/95 border border-r-0 rounded-l-md">
                  <select
                    name="country_code"
                    value={formik.values.country_code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="px-1 py-2 bg-white text-black border-0 rounded-l-md text-sm focus:outline-none w-auto min-w-[65px] appearance-none"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+81">🇯🇵 +81</option>
                  </select>
                </div>

                <input
                  id="mobile"
                  name="mobile"
                  type="text"
                  maxLength={10}
                  placeholder="Enter 10-digit number"
                  value={formik.values.mobile}
                  onChange={(e) => {
                    // allow only digits
                    const v = e.target.value.replace(/\D/g, "");
                    formik.setFieldValue("mobile", v);
                  }}
                  onBlur={formik.handleBlur}
                  className="flex-1 px-3 py-2 rounded-r-md bg-white/95 text-gray-800 placeholder-gray-400 border border-l-0 focus:outline-none"
                />
              </div>
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-red-400 text-xs mt-1">
                  {formik.errors.mobile}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-xs font-semibold text-gray-200"
              >
                SET PASSWORD
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-3 py-2 rounded-md bg-white/95 text-gray-800 placeholder-gray-400 border-none focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1 text-xs font-semibold text-gray-200"
              >
                CONFIRM PASSWORD
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Enter confirm password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-3 py-2 rounded-md bg-white/95 text-gray-800 placeholder-gray-400 border-none focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  tabIndex={-1}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* Referral code */}
            <div>
              <label
                htmlFor="referral"
                className="block mb-1 text-xs font-semibold text-gray-200"
              >
                Referral Code
              </label>
              <input
                id="referral"
                name="referral"
                type="text"
                placeholder="Enter Referral Code"
                value={formik.values.referral}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 rounded-md bg-white/95 text-gray-800 placeholder-gray-400 border-none focus:outline-none"
                readOnly={!!referralCode} // Make field read-only if referralCode is provided
                style={referralCode ? { backgroundColor: "#f0f8ff" } : {}} // Slightly different background for pre-filled
              />
              {referralCode && (
                <p className="text-green-400 text-xs mt-1">
                  Referral code applied from invitation link
                </p>
              )}
            </div>

            {/* Register button (green) */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-[#13bf3e] hover:bg-[#10a93a] transition text-white font-semibold py-3 rounded-md"
            >
              {formik.isSubmitting ? "Registering..." : "REGISTER"}
            </button>

            {/* Login button (orange) */}
            <button
              type="button"
              onClick={() => {
                setShowModalLogin(true);
              }}
              className="w-full bg-[#f05a05] hover:bg-[#e14f05] transition text-white font-semibold py-3 rounded-md"
            >
              HAVE AN ACCOUNT? LOGIN
            </button>
          </form>
        </div>
      </div>
      <Login
        isOpen={showModalLogin}
        onClose={() => setShowModalLogin(false)}
        setProfileRefresher={setProfileRefresher}
      />
    </div>
  );
};

export default Register;
