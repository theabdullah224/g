import React, { useEffect, useState } from "react";
import "./WeeklyOverlap.css";
import { useNavigate } from "react-router-dom";
import Favicon from "./Resource/favicon.png";
import useStore from "./Store";

function WeeklyOverlap(props) {
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

  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate("/tryfreefor30-days#faqs");
  };

  const handleSignUpClick = () => {
    navigate("/plans#form");
  };

  // weekly overlap section
  return (
    <div className="weeklyoverlap">
      <div
        className="weekly"
        style={{ backgroundImage: `url(${props.bgimg})` }}
      >
        <div className="colorweekly">
          <div className="itemweekly">
            <h4 className=" text-2xl border-b-8 border-S-Orange leading-none font-bold ">
              {props.subtitle}
            </h4>
            <h2
              className="txt-h2weekly  text-2xl 2xl:text-5xl font-bold"
              style={{ fontSize: `${props.titlefont}` }}
            >
              {props.title}
            </h2>
            <p className="mdtweekly text-lg font-normal">{props.description}</p>

            <div
              className={`flex flex-col items-center justify-center   `}
              style={{ display: `${props.inputdisplay}` }}
            >
              <div className="flex flex-col mx-auto w-fit">
                <input
                  className="bg-transparent border-2 border-white py-3 text-xl px-8  sm:w-[50vw] placeholder-white rounded-lg"
                  id=""
                  type="email"
                  placeholder="Enter Your Email Address"
                />

                <button
                  className="mt-4  sm:w-[50vw]    py-3  box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179]  font-roboto font-medium text-base"
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </button>
              </div>

              <p className="mdtweekly text-lg">{props.downbtndescription}</p>
            </div>

            <div
              className="flex  mt-8 gap-6 items-center flex-col sm:flex-row   "
              style={{ display: `${props.btndisplay}` }}
            >
              {/* <button
                className=" py-2 px-10 box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#F8FBF4]  hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                onClick={handleLearnMoreClick}
              >
                Learn&nbsp;More
              </button> */}
              {!isLoggedIn && (
                <button
                  className=" py-2 px-12 box-border rounded-lg flex items-center justify-center  text-white border-2 border-white   hover:text-P-Green1 hover:bg-white font-roboto font-medium text-base"
                  onClick={handleSignUpClick}
                >
                  Sign&nbsp;Up
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-img"
        style={{ backgroundImage: `url(${props.bgfront})` }}
      >
        <img
          className="wfv"
          src={Favicon}
          alt=""
          style={{ display: `${props.displayfvicon}` }}
        />
      </div>
    </div>
  );
}

export default WeeklyOverlap;
