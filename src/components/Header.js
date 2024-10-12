import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo2 from "./Resource/logo2.png";
import { useNavigate } from "react-router-dom";
import useStore from "./Store";

function Header() {
  // const isLoggedIn = useStore((state) => state.isLoggedIn);
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

  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubscribeClick = () => {
    navigate("/plans#form");
  };

  const handlelogoClick = () => {
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload(true);

  };
  return (
    <div className="relative">
      {/* Main header */}
      <div className="sm:px-9 px-4  lg:px-9 py-4 lg:py-7 font-roboto bg-white flex justify-between items-center">
        {/* logo */}
        <div className="logo flex gap-8" id="top">
          <img
            onClick={handlelogoClick}
            src={logo2}
            alt="Logo"
            className="w-28  lg:w-32 hover:cursor-pointer"
          />
           
        </div>

        {/* Menu button for mobile */}

        {/* Desktop navigation */}
        
        <div className="hidden lg:flex items-center ">
          
        <ul className="flex gap-8 font-roboto font-bold items-center text-md ">
  {["Home", !isLoggedIn && "Try Free for 30-Days", isLoggedIn?  "My Account" : "Log In", "About Us"]
    .filter(Boolean)
    .map((item) => (
      <li key={item}>
        <NavLink
          to={
            item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "")}`
          }
          className={({ isActive }) =>
            isActive
              ? "text-S-Orange underline"
              : "text-Text1 hover:text-S-Orange hover:underline"
          }
        >
          {item}
        </NavLink>
      </li>
    ))}
</ul>

        </div>
        <div className="ml-8 hidden lg:flex lg:gap-2">

            {!isLoggedIn && (

              <button
              onClick={handleSubscribeClick}
              className="py-1 px-7 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
              >
              Try Free For 30-Days
            </button>
            )}
                
              
              {isLoggedIn && (
                <button
                  className=" py-1 px-7 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
         
        </div>
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-Text1 hover:text-S-Orange"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64  bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden z-50`}
      >
        <div className="p-5">
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-Text1 hover:text-S-Orange"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <ul className="mt-8 flex flex-col gap-4 font-roboto font-bold items-start text-base">
            {["Home", !isLoggedIn && "Try Free for 30-Days",  isLoggedIn?  "My Account" : "Log In","About Us"].filter(Boolean).map(
              (item) => (
                <li key={item}>
                  <NavLink
                    to={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(/\s+/g, '')}`
                    }
                    className={({ isActive }) =>
                      isActive
                        ? "text-S-Orange underline"
                        : "text-Text1 hover:text-S-Orange hover:underline"
                    }
                    onClick={toggleSidebar}
                  >
                    {item}
                  </NavLink>
                </li>
              )
            )}
          </ul>
          <div className="mt-6">
            {/* <button
              onClick={() => {
                handleSubscribeClick();
                toggleSidebar();
              }}
              className="w-full py-2 px-4 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
            >
              Subscribe
            </button> */}
            {!isLoggedIn && (

              <button
              onClick={handleSubscribeClick}
              className="w-full mt-2 py-2 px-4 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
              >
              Try Free For 30-Days
            </button>
            )}
            {isLoggedIn && (
                <button
                  className="mt-2 w-full py-2 px-4 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default Header;
