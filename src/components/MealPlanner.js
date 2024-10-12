import React from 'react'
import Header from './Header'
import FrontPage from './FrontPage'
import bgimage from './Resource/image2.jpg'
import './Mealplanner.css'
import Favicon from './Resource/favicon.png'
import Reciptcomp from './Reciptcomp'
import Breakfast1 from "./Resource/breakfast1.png"
import Breakfast2 from "./Resource/breakfast2.png"
import Breakfast3 from "./Resource/breakfast3.png"
import SaveMoney from './SaveMoney'
import delecious from './Resource/delicious.jpg'
import Timeline from './Timeline'
import Testimonnials from "./testimonnials"
import Testbg  from './Resource/bgtest.jpg'
import WeeklyOverlap from './WeeklyOverlap'
import wbgimg from './Resource/wbgimg.jpg'
import Faq from './Faq'
import Testimonials from './testimonnials'
import testilogo from './Resource/webflowlogo.png'
import gb from './Resource/gb.png'
import Cta from './Cta'
import Footer from './Footer'
import Copyright from './Copyright'
import bgimg from "./Resource/aa890aa8e363918f0c0a94e60eee432c.jpg";
import Efficient from './Efficient'
import love from './Resource/love-letter 1.svg'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function MealPlanner(props) {
  const location = useLocation();
  useEffect(() => {
    // Check if the URL contains the #faqs hash
    if (location.hash === '#faqs') {
      const element = document.getElementById('faqs');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  return (
    
    // meal planner 

    <div>
      {/* importing header */}
        <Header
          backgroundcolor="white"
        />
        {/* importing frontpage */}
      <FrontPage
        title="Subscribe And Enjoy 30 Days For Free."
        description="Receive a weekly meal plan tailored to your preferences and dietary needs."
        bgimg = {bgimage}
        display = "block"
        btndisplay= "none"
      />
        <marquee className="text-lg bg-S-Orange "  behavior="scroll" direction="right">
        Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; Subscribe Free for 30 Days  &nbsp; &nbsp; &nbsp;&nbsp; 
    </marquee>



    {/* component */}
    <div className="customizable">
    <div className="left-content">
            <div className="content">
            <h4 className='text-2xl border-b-8 border-S-Orange leading-none font-bold inline-block' style={{marginBottom:`5vh`}}>Meal Plan</h4>
              <Reciptcomp
              ricon={Breakfast1}
              title="Tailored Meal Plans"
              description= "Receive personalized meal plans designed to meet your dietary needs and preferences. Our plans are carefully crafted by nutrition experts to ensure a balanced and healthy diet."
              />
              <Reciptcomp
              ricon={Breakfast2}
              title="Easy-to-Follow Recipes"
              description= "Our recipes are simple and straightforward, making it easy for you to prepare delicious meals at home. Each recipe comes with step-by-step instructions and cooking tips."
              />
              <Reciptcomp
              ricon={Breakfast3}
              title="Convenient Shopping List"
              description= "Save time and eliminate the guesswork with our convenient shopping list. We provide you with a detailed list of ingredients needed for each recipe, making grocery shopping a breeze."
              />
            </div>
        </div>
        <div className="image-side">
            <div className="image">
                <div className="imgcccc" >
                {/* <img src="./Resource/couple-teamwork-kitchen.jpg" alt="this is image" /> */}
                    <img className='favicon111' src={Favicon} alt="" />

                </div>
            </div>
        </div>
    </div>
    {/* importing savemoney comp */}
    <SaveMoney
    left="-6.6vw"
      bgimg={delecious}
      subtitle="Meal Plan"
      bspecialtext="Get Your "
      specialtext="Weekly Meal"
      aspecialtext=" Plan in PDF"
      display="none"
      description="Subscribe now and receive a delicious and healthy meal plan every Friday in PDF format. Take the hassle out of meal planning and enjoy the convenience of having your meals ready for the week."
    
    />
    {/* <Payment/> */}
    <Efficient/>

      <Testimonnials
      display="block"
      border="2px solid #F5A228"
      logo={love}
        subtitle="Subscribe"
        title="Get your meal plan now "
        description= "Subscribe to receive your weekly meal plan PDF"
        // bgimg={Testbg}
        testcolor="rgba(255, 255, 255, 0.95)"
      />
      <WeeklyOverlap
      titlefont="65px !important"
      btndisplay="none"
       bgimg={bgimg}
       bgfront={wbgimg}
       inputdisplay="block"
       displayfvicon= "none"
       downbtndescription="By joining, you agree to our Terms and Conditions"
      //  subtitle=''
      title="Subscribe to our Meal Plan"
      description="Get delicious and healthy meal plans every week"
      />
      <div className="heighth">
        
      </div>

      <div id='faqs'>
      <Faq
        description="Find answers to common questions about our meal plans, portion sizes, dietary restrictions, and subscription details."
        question1="What are the portion sizes?"
        question2="Are there any dietary restrictions?"
        question3="How does the subscription work?"
        question4="Can I customize the servings?"
        question5="Still have questions?"
        
        ans1="Our meal plans provide recommended portion sizes based on the Mediterranean and centenarian diets. These portion sizes are designed to promote a balanced and healthy lifestyle."
        ans2=""
        ans3=""
        ans4=""
        ans5=""
        />
        </div>
    {/* <Testimonials
    logo={testilogo}
    description="The meal planner has been a game-changer for me. It's made meal planning so much easier and has introduced me to new delicious recipes."
    h2="John Doe"
    plast="Marketing Manager, ABC Company"
    display="none"
    bgimg={gb}
    bgsize="40%"
    testcolor="transparent"
    
    /> */}
    {/* <div className='mb-[9rem]'></div> */}
    <Cta
      title="Contact us"
      description="Have more questions? Get in touch with us."
    />
    <Footer/>
    <Copyright/>
    </div>
  )
}

export default MealPlanner
