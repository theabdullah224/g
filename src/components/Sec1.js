import React from "react";
import Cook from "./Cook";
import SaveMoney from "./SaveMoney";
import WeeklyOverlap from "./WeeklyOverlap";
import srcimg from "./Resource/couple-teamwork-kitchen.jpg";
import bgimg from "./Resource/aa890aa8e363918f0c0a94e60eee432c.jpg";
import workinglady from "./Resource/workinglady.jpg";
import bgfront from "./Resource/bgfront.jpg";
import DiscoverBenifits from "./DiscoverBenifits";
import ndlady from "./Resource/2ndlady.jpg";
import Save from "./Save";
import Faq from "./Faq";
import Cta from "./Cta";
import Footer from "./Footer";
import Copyright from './Copyright'
import Header from "./Header";
import Banner from "./Banner";


// rendering code
function Sec1() {
  return (
    <div>
    
      <Header/>
      <Banner/>
      <Cook
        subtitle="Healthy Meal"
        description="Our meal planning service takes the stress out of deciding what to cook and ensures you eat nutritious meals every day. With our carefully curated meal plans, you can enjoy the benefits of a healthy diet without the hassle of planning and shopping."
        srcimg={srcimg}
        // shadowcolor="#738065"
      />
      <SaveMoney
      left="-6.6vw"
        subtitle="Discover"
        bspecialtext="Cook Fresh, "
        specialtext="Eat Well,"
        aspecialtext=" Live Better"
        display="block"
        description="Experience the benefits of cooking at home with fresh ingredients.
            Our meal planner makes it easy to create delicious and healthy
            meals."
        bgimg={workinglady}
        leftfancy="Save Time"
        descleft=" Plan your meals in advance and spend less time figuring out what
              to cook."
              rightfancy="Eat Healthier"
              righdesc="Enjoy nutritious meals made with fresh ingredients that support
              your well-being."
      />
      <WeeklyOverlap 
      bgimg={bgimg}
      bgfront={bgfront}
      inputdisplay="none"
      displayfvicon= "none"
      subtitle="Healthy"
      title="Discover the Health Benefits of Mediterranean and Centenarian Diets"
      description="The Mediterranean and Centenarian diets are renowned for their health benefits. Packed with fresh fruits, vegetables, whole grains, and lean proteins, these diets promote heart health, weight management and longevity.Our balanced diet is based on the mediterranean and centenarian diet."
      />
      <DiscoverBenifits />
      <Save srcimg={ndlady} />
      <Faq
        description="Frequently asked questions ordered by popularity. Remember that if the visitor has not committed to the call to action, they may still have questions (doubts) that can be answered."
        question1="How does it work?"
        question2="What is included?"
        question3="Is it suitable for me?"
        question4="How can I sign up?"
        question5="Can I cancel anytime?"
        ans1="Our meal planning service provides you with a 6-day meal planner and shopping list based on the Mediterranean and centenarian diets. You will receive the meal plan every Friday for the following week via email in a PDF file. It's a simple and convenient way to enjoy the benefits of cooking at home, improve your health, reduce food waste, and save money."
        ans2=""
        ans3=""
        ans4=""
        ans5=""
      />
      <Cta
        title="Still Have Questions?"
        description="Feel free to reach out to us."
      />
      <Footer/>
      <Copyright/>
    </div>
  );
}

export default Sec1;
