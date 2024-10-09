import React from "react"; // Importing React
import "./frontpage.css"; // Importing CSS for styling the front page
import favicon from "./Resource/sbscribefreefavicon.png"; // Importing the favicon image
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import useStore from './Store';

function FrontPage(props) {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Function to navigate to the "Learn More" page
  const handleLearnMoreClick = () => {
    navigate('/tryfreefor30-days#faqs');
  };

  // Function to navigate to the "Sign Up" page
  const handleSignUpClick = () => {
    navigate("/plans#form");
  };

  return (
    <div
      className="frontpage"
      style={{ backgroundImage: `url('${props.bgimg}')` }} // Set the background image dynamically from props
    >
      <div className="colorpage ">
        <div className="fitems ">
          {/* Display the title passed via props */}
          <h1 className="mb-4  sm:w-[42vw] text-5xl 2xl:text-6xl font-bold">{props.title}</h1>
          {/* Display the description passed via props */}
          <p className="sm:w-[42vw] text-lg">{props.description}</p>
          {/* Display the favicon image if the display style is not 'none' */}
          <img className="faviconfitem" src={favicon} alt="" style={{ display: `${props.display}` }} />
          <div className="flex  w-fit gap-2 sm:gap-4 flex-wrap mt-4 h-fit" style={{display:`${props.btndisplay}`}}>
            {/* Button to navigate to the "Learn More" page */}
            {/* <button
              className="mt-5 m-auto xl:m-0 py-2 px-10 box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
              onClick={handleLearnMoreClick} // Attach the click handler
            >
              Learn&nbsp;More
            </button> */}
            {/* Button to navigate to the "Sign Up" page */}
            {!isLoggedIn && 
            <button
              className="mt-5 m-auto xl:m-0 py-2 px-10 box-border rounded-lg flex items-center justify-center bg-transparent border-2 text-white font-roboto font-medium text-base"
              onClick={handleSignUpClick} // Attach the click handler
            >
              Sign&nbsp;Up
            </button>
}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontPage; // Exporting the FrontPage component to be used in other parts of the application
