import React from "react"; // Importing React library for component creation
import Header from "./Header"; // Importing Header component
import Frontpage from "./FrontPage"; // Importing Frontpage component
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation
import planimg from "./Resource/plansbg.jpg"; // Importing image for front page background
import lastimg from "./Resource/lastimg.jpg"; // Importing image for the about section
import Tab from "./Tab"; // Importing Tab component
import Footer from "./Footer"; // Importing Footer component
import Cta from "./Cta"; // Importing Call-to-Action (Cta) component
import Copyright from "./Copyright"; // Importing Copyright component
import Favicon from "./Resource/favicon.png"; // Importing favicon image
import "./about.css"; // Importing CSS for the About Us page
import useStore from './Store';

// Defining the AboutUs component
function AboutUs() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  const navigate = useNavigate(); // Initializing the navigate function for route navigation

  // Function to handle "Learn More" button click, navigates to the "Learn More" page
  const handleLearnMoreClick = () => {
    navigate('/tryfreefor30-days#faqs');
  };

  // Function to handle "Sign Up" button click, navigates to the "Sign Up" page
  const handleSignUpClick = () => {
    navigate("/plans#form");  };

  return (
    <div>
      <Header /> {/* Rendering the Header component */}
      {/* <Frontpage
        bgimg={planimg} // Setting background image for the front page
        display="none" // Hiding certain elements
        title="Uncover the Benefits" // Title text for the front page
        description={`Discover our mission to promote healthy eating and sustainable lifestyles. As Steve Jobs used to say, "Let food be thy medicine and medicine be thy food."`} // Description text for the front page
      /> */}
      {/* <div className="savemoney">
        <div className="left-content-2  mt-8 sm:mt-0" id="aboutleft">
          <div className="contentsave">
            <p className="fancys text-2xl border-b-8 border-S-Orange leading-none font-bold text-Text1">
              Healthy
            </p>{" "}
           
            <h3 className="txt-1savemoney text-Text1 text-2xl 2xl:text-5xl font-bold">
              How Our Meal Planner Supports These Diets
            </h3>{" "}
           
            <p className="p-txtsavemoney text-lg text-Text2">
              Our meal planner is designed using the latest technology and
              scientific principles to adhere to the guidelines of the
              Mediterranean and Centenarian diets. By embracing these diets, you
              can enjoy a variety of healthy meals that promote longevity and
              overall health.
            </p>{" "}
          </div>
          <div className="mainsave">
            <div className="leftsave">
              <h5 className="fancy1leftsavemoney text-xl font-bold text-Text1">
                Benefits
              </h5>{" "}
              <p className="p-txtbottom text-lg text-Text2">
                Promotes heart health, weight management, and a balanced intake
                of nutrients.
              </p>{" "}
            </div>

            <div className="leftsave">
              <h5 className="fancy1leftsavemoney text-xl font-bold text-Text1">
                Sustainability
              </h5>{" "}
              <p className="p-txtbottom text-lg text-Text2">
                Emphasizes seasonal, plant-based ingredients and reduces
                reliance on processed foods.
              </p>{" "}
            </div>
          </div>
          <div className=" mt-4 flex-wrap flex gap-2 w-fit h-fit sm:gap-4">
            <button
              className="py-2 px-10 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
              onClick={handleLearnMoreClick} // Attach click handler to navigate to "Learn More"
            >
              Learn&nbsp;More
            </button>
            {!isLoggedIn && 
            <button
              className="py-2 px-12 box-border rounded-lg flex items-center justify-center bg-transparent text-P-Green1 border-2 border-P-Green1  hover:bg-P-Green1 hover:text-white font-roboto font-medium text-base"
              onClick={handleSignUpClick}
            >
             
              Sign&nbsp;Up
            </button>
}
          </div>
        </div>
        <div className="image-sidesavemoney " id="imageabout">
          <div className="image">
            <div
              className="img-2savemoney"
              style={{
                backgroundImage: `url(${lastimg})`, 
                transform: `scaleX(1)`, 
              }}
            >
              <img
                className="favicon-2"
                src={Favicon} 
                alt="" 
                style={{ transform: `scaleX(1)` }} 
              />
            </div>
          </div>
        </div>
      </div> */}
      <Tab /> {/* Rendering the Tab component */}
      <Cta
        title="Still have Questions?" // Title text for the CTA section
        description="Feel free to reach out to us." // Description text for the CTA section
      />
      <Footer /> {/* Rendering the Footer component */}
      <Copyright /> {/* Rendering the Copyright component */}
    </div>
  );
}

export default AboutUs; // Exporting the AboutUs component as the default export
