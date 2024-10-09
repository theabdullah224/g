import React from 'react'; // Importing React library
import './faqs.css'; // Importing the stylesheet for this component
import Faqcomp from './faqcomp'; // Importing the Faqcomp component


// FAQs 
function Faq(props) {
  return (
    <div className='faqs '>
      <div className="inside">
        {/* Background image div */}
        <div className="bgimg"></div>

        {/* FAQ title with a border and text styling */}
        <h3 className=' text-2xl border-b-8 border-S-Orange leading-none font-bold'>FAQ's</h3>
        
        {/* Main title with dynamic coloring */}
        <h3 className=' text-center text-2xl 2xl:text-5xl  font-bold' lang="en" >Frequently <span className='text-P-Green1'> Asked</span> Questions</h3>
        
        {/* Description paragraph */}
        <p className=' text-lg  max-w-[40rem] text-center mb-2'>{props.description}</p>

        {/* Rendering FAQ components with questions and answers passed as props */}
        <div className="ques">
          <Faqcomp question={props.question1} ans={props.ans1}/>
        
        </div>
      </div>
    </div>
  );
}

export default Faq; // Exporting the Faq component as the default export
