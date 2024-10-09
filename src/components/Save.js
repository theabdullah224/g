import React, { useEffect, useState } from 'react';
import Favicon from "./Resource/favicon.png";
import './save.css';
import icon1 from './Resource/garbage 1.svg';
import icon2 from './Resource/garbage 2.svg';
import icon3 from './Resource/garbage 3.svg';
import { useNavigate } from 'react-router-dom';
import useStore from './Store';

function Save(props) {
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
    navigate('/tryfreefor30-days#faqs'); // Navigate to Mealplans route
  };

  const handleSignUpClick = () => {
    navigate("/plans#form");  };

  return (
    <div className='save'>
      <div className="left-contentsave">
        <div className="contentsave">
          <p className='fancys text-2xl border-b-8 border-S-Orange leading-none font-bold text-Text1'>Save</p>
          <h3 className='txt-s text-2xl 2xl:text-5xl font-bold text-Text1' lang="en">Save Money And Eat Well With <span className='text-P-Green1'>Meal Planning </span></h3>
          <p className='p-txts text-lg text-Text2'>
            Efficient meal planning can lead to significant cost savings by reducing food waste and avoiding unnecessary purchases. With our 6-day meal planner, you'll have a clear plan for your meals, ensuring you only buy what you need and making the most of your ingredients.
          </p>
        </div>
        <div className="main">
          <div className="itemssave max-w-[35rem] ">
           

            <div className="onesave">
              <img src={icon1} alt="" className="icon1" />
              <p className='ponesave text-lg text-Text2'>Reduce Food Waste</p>
            </div>
            <div className="onesave">
              <img src={icon2} alt="" className="icon1" />
              <p className='ponesave text-lg text-Text2'>Avoid Unnecessary Purchases</p>
            </div>
            
            <div className="onesave">
              <img src={icon3} alt="" className="icon1" />
              <p className='ponesave text-lg text-Text2'>Make the Most of Your Ingredients</p>
            </div>
          </div>
          <div className=" flex  gap-4  items-center flex-col sm:flex-row">
            {/* <button
              className=" py-2 px-10 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
              onClick={handleLearnMoreClick}
            >
              Learn&nbsp;More
            </button> */}
            {!isLoggedIn && 
            <button
              className=" py-2 px-12 box-border rounded-lg flex items-center justify-center bg-transparent text-P-Green1 border-2 border-P-Green1  hover:bg-P-Green1 hover:text-white font-roboto font-medium text-base"
              onClick={handleSignUpClick}
            >
              Sign&nbsp;Up
            </button>
}
          </div>
        </div>
      </div>
      <div className="image-sidesavec">
        <div className="image">
          <div className="imgd" style={{ backgroundImage: `url(${props.srcimg})` }}>
            <img className='favicon11' src={Favicon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Save;
