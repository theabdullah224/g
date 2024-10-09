import React from "react";
import "./timeline.css";
import prepration from "./Resource/prepration.png";

function Timeline() {
  return (
    <div className="timeline">
      <div className="timelinecolor">
        <h3 className="timeh3  text-2xl"  style={{color:"white",borderBottom:"4px solid rgba(255, 255, 255, 0.5)"}}>Efficient</h3>
        <p className="timep text-lg" style={{color:"white"}}>From Sign-Up to Receiving Your Weekly Plans</p>
        <div className="containertime">
          <div className="progressline">
            <div className="dottedline"></div>
            <div className="circle circle1">
              <img className="prepration" src={prepration} alt="" />
            </div>
            <div className="circle circle2">
              <img className="prepration" src={prepration} alt="" />
            </div>          
            <div className="circle circle3">
              <img className="prepration" src={prepration} alt="" />
            </div>
            <div className="circle circle4">
              <img className="prepration" src={prepration} alt="" />
            </div>
          
          </div>








          <div className="wrap">




            
          <div className="timeone">
            
            <div>
              <h3 className="timeh3 text-xl font-bold">Easy Meal</h3>
              <p className="text-lg timeperagraph">
                Sign up and provide your preferences and dietary requirements.
              </p>
            </div>
          </div>






          <div className="timetwo">
          
            <h3 className="timeh3 text-xl font-bold">Enjoy Healthy Meals</h3>
            <p className="text-lg timeperagraph">
            Cook delicious and nutritious meals based on the Mediterranean and centenarian diets.
            </p>
          </div>





          <div className="timethree">
            <h3 className="timeh3 text-xl font-bold">Weekly Plans</h3>
            <p className="text-lg timeperagraph">
            Receive your personalized meal plans every Friday in a PDF format.
            </p>
          </div>



          <div className="timefour">
            <h3 className="timeh3 text-xl font-bold">Save Time</h3>
            <p className="text-lg timeperagraph">
            Eliminate the stress of meal planning and save time in the kitchen.
            </p>
          </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default Timeline;
