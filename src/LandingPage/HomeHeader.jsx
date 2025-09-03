import React,{useState,useEffect} from "react";
import { apis } from "../utils/apis";
import useApi from "../hooks/useApi";
import axios from "axios";

const HomeHeader = () => {

    const { get, post, put, del, loading, error } = useApi();
      const userid = localStorage.getItem("userId");
      const [customerService, setcustomerService] = useState()
  const profileHandler = () => {
        get(`${apis?.customer_service}`)
          .then((res) => {
            console.log("response header", res);
            if (
              res?.data?.success === true ||
              res?.data?.success === 200 ||
              res?.data?.status ===200 
            ) {
              // console.log("hiii", res?.data?.data[0]);
              setcustomerService(res?.data?.data[0].link);
              console.log(res?.data);
            }
          })
          .catch(console.error);
      };
      useEffect(() => {
        profileHandler();
      }, []);

      const handleCustomer=async()=>{
        try{
          const res=await axios.get(apis.customer_service)
           if (
              res?.data?.success === true ||
              res?.data?.success === 200 ||
              res?.data?.status ===200 
            ) {
              // console.log("hiii", res?.data?.data[0]);
              setcustomerService(res?.data?.data[0].link);
               window.open(res?.data?.data[0].link, "_blank");
              console.log(res?.data);
            }
            else{
                toast.error("link not found");
            }
        }
        catch(err){
          console.log(err)
        }
}
  return (
    <header className="bg-[#4D3E20] w-full px-4 py-2 flex items-center justify-center">
      {/* Login Button */}
      <button
        className="text-white px-4 py-1 rounded-md  hover:text-white transition duration-300 text-sm cursor-pointer"
        onClick={handleCustomer}
      >
        Customer Suport
      </button>
    </header>
  );
};

export default HomeHeader;
