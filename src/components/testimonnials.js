import React from "react";
import { useNavigate } from "react-router-dom";
import "./testimonnials.css"
import useStore from './Store';

function Testimonials(props) {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate('/tryfreefor30-days#faqs');
  };

  const handleSignUpClick = () => {
    navigate("/plans#form");  };

  return (
    <div className="testimonials">
      <div className="box" style={{backgroundImage:`url(${props.bgimg})`,backgroundSize:`${props.bgsize}`}}>
        <div className="testcolor  border-S-Orange" style={{backgroundColor:`${props.testcolor}`,border:`${props.border}`}}>

        <img className="w-28 mb-3" src={props.logo} alt="Company Logo"  />
        <h1 className="testimonial-title text-2xl 2xl:text-5xl font-bold" style={{display:`${props.display}`}}>Subscribe <br />Get your <span className="text-P-Green1">meal plan </span> now </h1>
        <p className="testimonial-description text-lg text-center">{props.description}</p>
        <div style={{display:`${props.display}`}}>

        
        <div className="flex w-fit flex-wrap items-center justify-center mt-8 gap-6 " >
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
      </div>
        <h2 className="testimonial-h2 text-2xl text-P-Green1 font-bold">{props.h2}</h2>
        <p className="testimonial-last text-lg  text-Text2">{props.plast}</p>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
