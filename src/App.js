// Importing necessary tools and components from React and other libraries
import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; // Tools for handling navigation (moving between different pages)
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Tools for adding animations when navigating between pages
import Sec1 from "./components/Sec1"; // Importing the Sec1 page
import Mealplanner from './components/MealPlanner'; // Importing the MealPlanner page
import Plans from "./components/Plans"; // Importing the Plans page
import AboutUs from "./components/AboutUs"; // Importing the About Us page
import Subscribe from './components/Subscribe'; // Importing the Subscribe page
import SignUp from './components/Signup'; // Importing the Sign Up page
import LearnMore from './components/Learnmore'; // Importing the Learn More page
import ContactUs from './components/Contactus'; // Importing the Contact Us page
import './App.css'; // Importing the CSS file that controls the appearance and animations
import Payment from './components/payment' // Importing the Payment page
import UserPage from './components/UserPage'; // Importing the User Page
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfServices from './components/TermsOfServices';
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';
import Verification from './components/VerificationCode'
import UpdatePassword from './components/UpdatePassword'
import AdminDashboard from './components/AdminDashboard';
import useStore from './components/Store';
import Welcome from './components/Welcome';
import Delete from './components/Delete';
import DeleteConfirmation from './components/DeleteConfirmation';
import DeleteCard from './components/DeleteCard';
import OurStory from './components/Story';
import Cookies from './components/Cookies';
// This function defines the main part of our application
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check localStorage for the "user" object
    const user = localStorage.getItem("user");
    const admin = localStorage.getItem("admin");
    // console.log(admin)
    if(admin){
      setisAdmin(true)
    }else{
      setisAdmin(false)
    }
    if (user) {
      setIsLoggedIn(true); // Set logged-in state to true if a user is found
    } else {
      setIsLoggedIn(false); // Set logged-in state to false if no user is found
    }
  }, []);
  // This helps us know where the user currently is on the website
  const location = useLocation();
  const [isAdmin, setisAdmin] = useState(false)
  return (
    // This group handles the animation when switching between pages
    <TransitionGroup className="transition-group">
      <CSSTransition
        key={location.key} // Ensures each page has a unique key for transitions
        classNames="crossfade" // The name of the animation class used
        timeout={1000} // Duration of the animation (1000 milliseconds = 1 second)
      >
        {/* This section displays the current page the user is on */}
        <div className="route-section  ">
          <Routes location={location}> 
            {/* Defining different pages the user can navigate to */}
            <Route path="/" element={<Sec1 />} /> {/* Homepage */}
            <Route path="/tryfreefor30-days" element={<Mealplanner />} /> {/* Meal Planner page */}
            <Route path="/plans" element={<Plans />} /> {/* Plans page */}
            <Route path="/aboutus" element={<AboutUs />} /> {/* About Us page */}
            <Route path="/subscribe" element={<Subscribe />} /> {/* Subscribe page */}
            <Route path="/exploremealplans" element={<Plans />} /> {/* Another way to access the Plans page */}
            <Route path="/signup" element={<SignUp />} /> {/* Sign Up page */}
            <Route path="/learnmore" element={<LearnMore />} /> {/* Learn More page */}
            <Route path="/contactus" element={<ContactUs />} /> {/* Contact Us page */}
            <Route path="/payment" element={<Payment />} /> {/* Payment page */}
            <Route path="/myaccount" element={<UserPage />} /> 
            <Route path="/privacypolicy" element={<PrivacyPolicy/>} /> 
            <Route path="/termsofservices" element={<TermsOfServices/>} /> 
            <Route path="/forgotpassword" element={<ForgetPassword/>} /> 
            <Route path="/verification" element={<Verification/>} /> 
            <Route path="/updatepassword" element={<UpdatePassword/>} /> 
            <Route path="/OurStory" element={<OurStory/>} /> 
            <Route path="/cookiesetting" element={<Cookies/>} /> 
            <Route path="/welcome" element={<Welcome/>} /> 
            <Route path="/login" element={<Login/>} /> 
            { isLoggedIn && (
              <>
            <Route path="/deleteaccount" element={<Delete/>} /> 
            <Route path="/DeleteConfirmation" element={<DeleteConfirmation/>} /> 
            <Route path="/deletecard" element={<DeleteCard/>} /> 

              </>
            )}
            
            {isAdmin && (
              
            <Route path="/admin" element={<AdminDashboard/>} /> 
            )}
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

// This function wraps the App function with the router, enabling navigation across the app
function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

// Exporting AppWithRouter as the main component that will be used to display the app
export default AppWithRouter;
