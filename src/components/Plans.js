import React from 'react'
import Header from './Header'
import FrontPage from './FrontPage'
import Plansimg from './Resource/plans.jpg'
import CardNavigator from './Card'
// import { Form } from 'react-router-dom'
import Form from './Form'
import Cta from './Cta'
import Footer from './Footer'
import Copyright from './Copyright'
import './plans.css'
import  { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// plans comp


function Plans() {
  // const location = useLocation();
  const formRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    // Check if the URL contains the #form hash
    if (location.hash === '#form') {
      const element = document.getElementById('form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);


  return (
    <div id='plan'>
      <Header/>
      {/* <FrontPage
        title="Choose Your Plan"
        description="Select the meal plan that suits your dietary needs and preferences."
        bgimg={Plansimg}
        display="none"
        btndisplay="none"
      /> */}
      
      <div id='form'>
        <Form/> {/* card component */}
      </div>
      {/* <Cta
        title="Still have Questions ?"
        description="Feel free to reach out to us."
      />
      <Footer/>
      <Copyright/> */}
    </div>
  )
}

export default Plans
