// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import useApi from "../hooks/useApi";
// import { apis } from "../utils/apis";
// import { toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";

// const Login = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   const { post } = useApi();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       phone: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       phone: Yup.string()
//         .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
//         .required("Phone number is required"),
//       password: Yup.string()
//         .min(4, "Password must be at least 4 characters")
//         .required("Password is required"),
//     }),
//     onSubmit: async (values, { setSubmitting, setErrors }) => {
//       try {
//         const res = await post(`${apis?.login}`, values);
//         console.log("res", res);
//         if (res?.data?.success === true) {
//           localStorage.setItem("userid", res?.data?.user_id);
//           toast.success("Login successful!");
//           navigate("/");
//         } else {
//           setErrors({ password: res?.data?.message || "Login failed" });
//         }
//       } catch (err) {
//         console.error(err);
//         setErrors({ password: "Server error" });
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
//     <div className="min-h-screen flex items-center justify-center bg-mainBg p-3">
//       <form
//         onSubmit={formik.handleSubmit}
//         className="bg-white p-6 rounded shadow-md w-full max-w-xl"
//       >
//         <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
//         {/* phone Field */}
//         <div className="mb-4">
//           <label htmlFor="phone" className="block text-gray-700">
//             Phone Number
//           </label>
//           <input
//             type="text"
//             name="phone"
//             id="phone"
//             placeholder="Enter your phone number"
//             value={formik.values.phone}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full px-3 py-2 border border-black rounded text-black placeholder-black"
//           />
//           {formik.touched.phone && formik.errors.phone && (
//             <p className="text-red-500 text-[10px]">{formik.errors.phone}</p>
//           )}
//         </div>

//         {/* Password Field */}
//         <div className="mb-4">
//           <label htmlFor="password" className="block text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             placeholder="Enter your password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full px-3 py-2 border border-black rounded text-black placeholder-black"
//           />
//           {formik.touched.password && formik.errors.password && (
//             <p className="text-red-500 text-[10px]">{formik.errors.password}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={formik.isSubmitting}
//           className="w-full bg-[#4F5163] text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           {formik.isSubmitting ? "Logging in..." : "Login"}
//         </button>
//         <div className="w-full flex items-center text-[13px] mt-5 justify-between">
//           <p className="text-nowrap ">Not registered ? </p>
//           <Link
//             to="/register"
//             type="button"
//             // disabled={formik.isSubmitting}
//             className="w-full text-blue-300 rounded hover:text-blue-700 transition"
//           >
//             &nbsp; Register
//           </Link>
//         </div>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default Login;

// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import useApi from "../hooks/useApi";
// import { apis } from "../utils/apis";
// import { toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";
// import { FaTimes } from "react-icons/fa";

// const Login = ({ isOpen, onClose, setProfileRefresher }) => {
//   if (!isOpen) return null;

//   const { post } = useApi();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       phone: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       phone: Yup.string()
//         .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
//         .required("Phone number is required"),
//       password: Yup.string()
//         .min(4, "Password must be at least 4 characters")
//         .required("Password is required"),
//     }),
//     onSubmit: async (values, { setSubmitting, setErrors }) => {
//       try {
//         const res = await post(`${apis?.login}`, values);
//         if (res?.data?.success === true) {
//           localStorage.setItem("userid", res?.data?.user_id);
//           setProfileRefresher(true); 
//           toast.success("Login successful!");
//           onClose();
//           navigate("/");
//         } else {
//           setErrors({ password: res?.data?.message || "Login failed" });
//           console.log(res);
//         }
//       } catch (err) {
//         console.error(err);
//         setErrors({ password: "Server error" });
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
//       <div className="relative bg-[#25283D] w-full max-w-80 rounded-2xl shadow-2xl p-6 text-white">
//         {/* Close button */}
//         <button
//           className="absolute top-2 right-4 text-gray-300 hover:text-red-400 transition cursor-pointer"
//           onClick={onClose}
//         >
//           <FaTimes size={20} />
//         </button>

//         <h2 className="text-2xl font-bold text-center mb-6 text-white">
//           Login
//         </h2>

//         <form onSubmit={formik.handleSubmit} className="space-y-4">
//           {/* phone Field */}
//           <div>
//             <label
//               htmlFor="phone"
//               className="block mb-1 text-sm text-gray-300"
//             >
//               Phone Number
//             </label>
//             {/* <input
//               type="text"
//               name="phone"
//               id="phone"
//               placeholder="Enter your phone number"
//               value={formik.values.phone}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="w-full px-3 py-2 rounded-lg bg-[#1f2235] border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
//             /> */}
//             <input
//               type="text"
//               name="phone"
//               id="phone"
//               placeholder="Enter your phone number"
//               value={formik.values.phone}
//               onChange={(e) => {
//                 const onlyDigits = e.target.value.replace(/\D/g, "");
//                 if (onlyDigits.length <= 10) {
//                   e.target.value = onlyDigits;
//                   formik.handleChange(e);
//                 }
//               }}
//               onBlur={formik.handleBlur}
//               maxLength={10}
//               inputMode="numeric"
//               className="w-full px-3 py-2 rounded-lg bg-[#1f2235] border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
//             />
//             {formik.touched.phone && formik.errors.phone && (
//               <p className="text-red-400 text-xs mt-1">
//                 {formik.errors.phone}
//               </p>
//             )}
//           </div>

//           {/* Password Field */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block mb-1 text-sm text-gray-300"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               placeholder="Enter your password"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="w-full px-3 py-2 rounded-lg bg-[#1f2235] border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
//             />
//             {formik.touched.password && formik.errors.password && (
//               <p className="text-red-400 text-xs mt-1">
//                 {formik.errors.password}
//               </p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={formik.isSubmitting}
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition duration-300 text-white font-semibold py-2 rounded-lg"
//           >
//             {formik.isSubmitting ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {/* Link to Register */}
//       </div>
//     </div>
//   );
// };

// export default Login;



import React,{useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useApi from "../hooks/useApi";
import { apis } from "../utils/apis";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import SignupModal from "./Register";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ isOpen, onClose, setProfileRefresher }) => {
  if (!isOpen) return null;
  const [showModal, setShowModal] = useState(false); // in Header

  const [showPassword, setShowPassword] = useState(false);
  const { post } = useApi();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      mobile: "",
      password: "",
      country_code: "+91",
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const payload = {
          ...values,
          country_code: String(values.country_code), // ✅ enforce string
        };
        console.log("payload login:", payload);
        // console.log("api login:", apis?.login);

        const res = await post(`${apis?.login}`, payload);
        console.log("res", res);
        if (
          res?.data?.success === true ||
          res?.data?.status === 200 ||
          res?.data?.status === "200"
        ) {
          localStorage.setItem("userId", res?.data?.id);
          setProfileRefresher(true);
          toast.success("Login successful!");
          onClose();
          navigate("/");
        } else {
          setErrors({ password: res?.data?.message || "Login failed" });
        }
      } catch (err) {
        // setErrors({ password: "Server error" });

        if (err?.response?.data?.status == 401) {
          toast.error(err?.response?.data?.message);
        } else {
          toast.error("something went wrong");
        }
        console.log(err.response.data);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-[#00174B] w-full max-w-[400px] rounded-lg shadow-2xl p-6 text-white">
        {/* Close button */}
        <button
          className="absolute top-3 right-4 text-gray-300 hover:text-red-400 transition cursor-pointer"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-semibold text-center mb-6">Log In</h2>
        <div className="h-[1px] bg-white/20 mb-4" />
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Phone Number */}
          <div>
            <label htmlFor="mobile" className="block mb-1 text-xs">
              PHONE NUMBER
            </label>
            <div className="flex">
              <select
                name="country_code"
                value={formik.values.country_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-2 py-2 bg-white text-black border border-gray-300 rounded-l text-sm focus:outline-none"
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+81">🇯🇵 +81</option>
                {/* Add more as needed */}
              </select>
              <input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Enter 10-digit number"
                value={formik.values.mobile}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, "");
                  if (onlyDigits.length <= 10) {
                    e.target.value = onlyDigits;
                    formik.handleChange(e);
                  }
                }}
                onBlur={formik.handleBlur}
                maxLength={10}
                inputMode="numeric"
                className="flex-1 w-full px-1 py-2 rounded-r bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label htmlFor="password" className="block mb-1 text-xs">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Password"
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

          {/* Remember checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              defaultChecked
              className="mr-2"
            />
            <label htmlFor="remember" className="text-xs">
              Remember password
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-[#00C853] hover:bg-[#00a844] transition duration-300 text-white font-semibold py-2 rounded-full"
          >
            {formik.isSubmitting ? "Logging in..." : "LOG IN"}
          </button>

          {/* Forgot password */}
          <p className="text-center text-xs text-gray-300 cursor-pointer hover:underline">
            Forgot password?
          </p>

          {/* Create account */}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="w-full bg-[#FF3D00] hover:bg-[#e63500] transition duration-300 text-white font-semibold py-2 rounded-full"
          >
            CREATE ACCOUNT
          </button>
        </form>
      </div>
      <SignupModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        setProfileRefresher={setProfileRefresher}
      />
    </div>
  );
};

export default Login;

