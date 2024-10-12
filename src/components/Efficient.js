import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Resource/spinner.svg";
import useStore from "./Store";
import { useNavigate } from "react-router-dom";
const PricingCard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check localStorage for the "user" object
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true); // Set logged-in state to true if a user is found
    } else {
      setIsLoggedIn(false); // Set logged-in state to false if no user is found
    }
  }, []);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  // Subscription Function
  const buyFunction = async (planType) => {
    setLoader(true);
    try {
      const response = await axios.post("https://meeel.xyz/payment", {
        planType,
      });
      if (response.status === 200) {
        if(isLoggedIn){

          window.location.href = response.data.url;
        }else{
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setLoader(false); // Hide loader when request is complete
    }
  };

  return (
    <div className="flex items-center justify-center  ">
      {loader && (
        <div className="">
          <img src={Loader} alt="Loading..." className="" />
        </div>
      )}

      {!loader && (
        <section className="container pt-[2rem] pb-[5rem] mx-auto flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl mb-4 border-b-8 border-S-Orange leading-none font-bold  mx-auto inline-block">
            Pricing
          </h1>
          <div className="flex gap-6 items-center flex-col sm:flex-row justify-center sm:flex-wrap">
            {/* <div className="w-64  ">
              <div className="rounded-2xl bg-white px-5 py-10 shadow-lg">
                <p className="text-center text-2xl font-bold text-black"></p>

                <div className="mt-5 flex justify-center text-black">
                  <div className="text-6xl font-medium">Free</div>
                  <div className="ml-2 flex flex-col">
                    <p className="text-lg font-bold">£</p>
                    <p>per Month</p>
                  </div>
                </div>

                <div className="ml-3 mt-8">
                  <ul className="grid gap-4">
                    <li className="flex items-center text-black">
                      <svg
                        className="mr-3 h-4 w-4 fill-current text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                      </svg>
                      Weekly Meal Plan
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => buyFunction("free")}
                    className="w-full py-2 px-4 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            </div> */}
            <div className="w-64  ">
              <div className="rounded-2xl bg-white px-5 py-10 shadow-lg">
                <p className="text-center text-2xl font-bold text-black"></p>

                <div className="mt-5 flex justify-center text-black">
                  <div className="text-6xl font-medium">6.99</div>
                  <div className="ml-2 flex flex-col">
                    <p className="text-lg font-bold">&#8203;</p>
                    <p>per Month</p>
                  </div>
                </div>

                <div className="ml-3 mt-8">
                  <ul className="grid gap-4">
                    <li className="flex items-center text-black">
                      <svg
                        className="mr-3 h-4 w-4 fill-current text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                      </svg>
                      Weekly Meal Plan
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => buyFunction("pro")}
                    className="w-full py-2 px-4 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                  >
                    {isLoggedIn ? "Upgrade":"Start After 30 Days"}
                    
                  </button>
                </div>
              </div>
            </div>
            <div className="w-64 ">
              <div className="rounded-2xl bg-white px-5 py-10 shadow-lg">
                <p className="text-center text-2xl font-bold text-black"></p>

                <div className="mt-5 flex justify-center text-black">
                  <div className="text-6xl font-medium">69</div>
                  <div className="ml-2 flex flex-col">
                    <p className="text-lg font-bold">&#8203;</p>
                    <p>per Year</p>
                  </div>
                </div>

                <div className="ml-3 mt-8">
                  <ul className="grid gap-4">
                    <li className="flex items-center text-black">
                      <svg
                        className="mr-3 h-4 w-4 fill-current text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                      </svg>
                      Weekly Meal Plan
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => buyFunction("ultra_pro")}
                    className="w-full py-2 px-4 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                  >
                    {isLoggedIn ? "Upgrade":"Start After 30 Days"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PricingCard;
