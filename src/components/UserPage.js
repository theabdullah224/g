import React, { useEffect } from "react";
import Header from "./Header";
import img1 from "./Resource/plate.png";
import userimage from "./Resource/patternpic.png";
import capsule from "./Resource/capsule.png";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SquareUser } from "lucide-react";
import Cta from "./Cta";
import Footer from "./Footer";
import Copyright from "./Copyright";
// import Dashboard './Dashboard'
import Dashboard from "./Dashboard";
import "./userpage.css";
import { Link, useNavigate } from "react-router-dom";
import useStore from "./Store";
import axios from "axios";
import Pref from "./Pref";
// User Page

function UserPage() {
  

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
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {}, [isLoggedIn]);
  const navigate = useNavigate();

 
 


  const handleLearnMoreClick = () => {
    navigate("/tryfreefor30-days#faqs");
  };

  const handleSignUpClick = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload(true);

  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send `formData` to the database goes here
  };








  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.user_id) {
      fetchUserData(user.user_id);
    } else {
      setError('No user data found. Please sign in.');
      setLoading(false);
    }
  }, []);
  
  const fetchUserData = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://meeel.xyz/show`, {
        headers: { 'Authorization': userId.toString() }
      });
  
  
      if (response.data && typeof response.data === 'object') {
        setUserData(response.data);
        // console.log(response.data)
        localStorage.setItem('userdata', JSON.stringify(response.data));

        // Log the response data (or the saved data)
      
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      setError('Failed to fetch user data: ' + error.message);
      
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="">
      <Header />
      {/*section 1  */}
      
      
      <section className="  h-fit ">
        <div className="relative justify-center md:justify-normal py-20 pb-0 bg-P-Green2 md:bg-transparent flex  items-center h-fit">
          <img
            src={img1}
            alt=""
            className="hidden md:block md:h-auto md:w-auto"
          />
          <div className="flex flex-col items-center md:block md:absolute left-8 w-[30rem] lg:w-[40rem] ">
            <h1 className="text-4xl text-center md:text-left 2xl:text-5xl font-bold text-white">
              Your Profile & Preferences
            </h1>
            <p className="text-lg text-white px-4 sm:px-0 text-center md:text-left">
              Manage your personal details and preferences here. You can view
              and update your information anytime
            </p>
            <div className="flex flex-col flex-wrap sm:flex-row w-fit mt-8 gap-6 mb-6 sm:mb-0 ">
              
              {isLoggedIn ? (

                <Link to="/payment">
              <button
                className=" py-2 px-10 box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
             
                >

                Upgrade&nbsp;Plan
              </button>
                </Link>
                ):(
                  <button
                className=" py-2 px-10 box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                onClick={handleLearnMoreClick}
                >

                  Learn&nbsp;More
              </button>
                )}

              {!isLoggedIn && (
                <button
                  className=" py-2 px-10 box-border rounded-lg flex items-center justify-center bg-transparent text-white border-2 font-roboto font-medium text-base"
                  onClick={handleSignUpClick}
                >
                  Login
                </button>
              )}
              {isLoggedIn && (
                <button
                  className=" py-2 px-10 box-border rounded-lg flex items-center justify-center bg-transparent text-white border-2 font-roboto font-medium text-base"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* section 2 */}

      <section className="h-fit py-[5rem] sm:py-[5rem] w-screen flex items-center justify-center px-4 ">
        <div className="maindiv  max-w-[1800px] h-fit  p-6 bg-white   rounded-lg">
          {/* first */}
          <div className="firstdiv flex justify-end pr-4 sm:pr-8  w-fit h-fit py-3 sm:py-6">
            {/* <img
              src={userimage}
              alt="Placeholder"
              className="w-full h-fit md:w-[20rem]   object-cover rounded-lg"
            /> */}
            <SquareUser className="w-full h-fit md:w-[20rem]   object-cover rounded-lg"/>
          </div>
          {/* 2nd */}
          <div className="snddiv flex flex-col justify-center">
            <div>
              <h3 className=" text-sm sm:text-2xl  text-Text1 border-b-8 border-S-Orange leading-none font-bold inline-block ">
                Personal details
              </h3>
            </div>
            <p className="text-xs sm:text-lg text-Text2 mb-4">
            Your personal details are listed below.
            </p>
          </div>
          {/* 3rd */}
          <div className="thirddiv w-full mx-auto ">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-Text1 font-bold text-md mb-2"
                  >
                    Name
                  </label>
                  <input
                    disabled
                    type="text"
                    id="name"
                    name="name"
                    value={userData?.name || 'Not available'}
                    onChange={handleChange}
                    className="w-full capitalize bg-transparent py-0    text-Text2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-Text1 font-bold text-md mb-2"
                  >
                    Email
                  </label>
                  <input
                    disabled
                    type="email"
                    id="email"
                    name="email"
                    value={userData?.email || 'Not available'}
                    onChange={handleChange}
                    className="w-full capitalize bg-transparent py-0    text-Text2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-Text1 font-bold text-md mb-2"
                  >
                    Plan Type
                  </label>
                  <input
                    disabled
                    type="text"
                    id="phone"
                    name="phone"
                    value={
                      !isLoggedIn ? 'Not available' : 
                      userData?.subscription_status === "inactive" ? 'No plan, please subscribe!' : 
                      userData?.subscription_status === "pro" ? "Starter" : 
                      userData?.subscription_status === "ultra_pro" ? "Premium" : 
                      'No plan, please subscribe!'
                    }
                    onChange={handleChange}
                    className="w-full capitalize bg-transparent py-0    text-Text2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-Text1 font-bold text-md mb-2"
                  >
                   
                    Subscription End

                  </label>
                  <input
                    disabled
                    type="text"
                    id="address"
                    name="address"
                    value={userData?.subscription_end_date ? new Date(userData.subscription_end_date).toLocaleDateString('en-GB') : 'Not available'}

                    onChange={handleChange}
                    className="w-full capitalize bg-transparent py-0    text-Text2"
                    required
                  />
                </div>
              </div>

                {isLoggedIn && (

                
              <div className="flex flex-wrap flex-col sm:flex-row gap-2   pr-8 sm:pr-0">
                <Link to="/deleteaccount">
              <button
                
                className="py-2 w-full  mx-auto md:mx-0 px-8 box-border rounded-lg flex items-center justify-center bg-transparent border-2 border-Text1 text-Text1   hover:bg-red-600 hover:text-white transition-all font-roboto font-medium text-base"
                >
                Delete Account
              </button>
                  </Link>
                
              <Link to="/deletecard">
              <button
                className="py-2 w-full    mx-auto md:mx-0 px-8 box-border rounded-lg flex items-center justify-center bg-transparent border-2 border-Text1 text-Text1   hover:cursor-pointer  transition-all font-roboto font-medium text-base"
                >
                Payment Methods
              </button>
                  </Link>
                </div>
                )}
            </form>
          </div>


        </div>
      </section>

      {/* section 3 */}

      <section className=" flex mb-10   flex-col items-end h-fit">
        <img src={capsule} alt="" className="w-[20rem] sm:w-[80rem] mb-[0rem] sm:mb-[0rem]" />
        {isLoggedIn && (
          <>
          <Pref/>
          
       
        <Dashboard />
          </>
        )}
      </section>
      <Cta
        title="Still have Questions?"
        description="Feel free to reach out to us."
      />
      <Footer />
      <Copyright />
    </div>
  );
}

export default UserPage;
