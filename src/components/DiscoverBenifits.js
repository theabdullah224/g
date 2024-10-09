import React, { useEffect, useState } from 'react'; // Importing React
import "./DiscoverBenifits.css"; // Importing the stylesheet for this component
import icon1 from './Resource/cutlery 1.svg'; // Importing an SVG icon
import icon2 from "./Resource/tip1.svg"; // Importing another SVG icon
import favicon from "./Resource/favicon.png"; // Importing a favicon image
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook from react-router-dom for navigation
import useStore from './Store';

function DiscoverBenifits(props) {
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

  const navigate = useNavigate(); // Initializing the navigate function

  // Function to handle the "Learn More" button click, navigates to the learn more page
  const handleLearnMoreClick = () => {
    navigate('/tryfreefor30-days#faqs'); 
  };

  // Function to handle the "Sign Up" button click, navigates to the signup page
  const handleSignUpClick = () => {
    navigate("/plans#form");
  };

  return (
    <div className='DiscoverBenifits py-8 md:py-[10rem]'>
      {/* Subtitle section with a border and text styling */}
      <h3 className=' text-2xl border-b-8 text-Text1 border-S-Orange leading-none font-bold '>{props.subtitle} Sustainable</h3>
      {/* Main title with dynamic coloring */}
      <h2 className=' text-2xl text-center 2xl:text-5xl font-bold sm:text-left sm:text-center'>Reduce <span style={{color:`#738065`}}>Food Waste</span> With Meal Planning</h2>
      {/* Description paragraph */}
      <p className='max-w-[42rem] text-lg text-Text2 text-center'>Discover how meal planning can help you reduce food waste and make a positive impact on the environment.</p>
      {/* Favicon image */}
      <img className='favicondiscover  hidden sm:block ' src={favicon} alt="" />
      {/* Buttons for navigation */}
      <div className="flex  mt-8 gap-6 items-center flex-col sm:flex-row  ">
        {/* <button
          className=" py-2 px-10 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
          onClick={handleLearnMoreClick}
        >
          Learn&nbsp;More
        </button> */}
        {!isLoggedIn && 
        <button
          className=" py-2 px-12 box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 border-2 border-P-Green1  hover:bg-P-Green1 hover:text-white font-roboto font-medium text-base"
          onClick={handleSignUpClick}
        >
          Sign&nbsp;Up
        </button>
}
      </div>
      {/* Two-column layout showcasing benefits and tips */}
      <div className="cols">
        <div className="col1 bg-Text2">
          {/* Icon and title for the first column */}
          <img src={icon1} className='' alt="" />
          <h4 className='insidecol1 text-Text1 text-xl font-bold'>Benefits</h4>
          <p className='pcol1 text-lg text-Text2 font-bold'>Save money, reduce food waste, and eat healthier with our meal planning service.</p>
        </div>
        <div className="col1">
          {/* Icon and title for the second column */}
          <img src={icon2} alt="" />
          <h4 className='insidecol1 text-xl font-bold text-Text1'>Tips</h4>
          <p className='pcol1 text-lg text-Text2 font-bold'>Learn how to plan meals effectively and minimize food waste in your kitchen.</p>
        </div>
      </div>
    </div>
  );
}

export default DiscoverBenifits; // Exporting the DiscoverBenifits component as the default export
