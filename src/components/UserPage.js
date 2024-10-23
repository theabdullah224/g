import React, { useEffect, useRef } from "react";
import Header from "./Header";
import img1 from "./Resource/plate.png";
import userimage from "./Resource/patternpic.png";
import capsule from "./Resource/capsule.png";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AlertTriangle,
  File,
  FileSpreadsheet,
  Flame,
  HandPlatter,
  Menu,
  PersonStanding,
  PersonStandingIcon,
  SquareUser,
  StarHalf,
  ThumbsDown,
  ThumbsDownIcon,
  Trash2,
  UserRound,
} from "lucide-react";
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
import Temp from "./temp";
// User Page
import {
  User,
  Heart,
  MessageSquare,
  Cat,
  UserPlus,
  HelpCircle,
  MessageCircle,
  Star,
  RefreshCcw,
  Info,
  X,
  Edit,
  AtSign,
  CreditCard,
  BadgeX,
  MessageSquareDot,
} from "lucide-react";
import ContactUsPage from "./Contactpageuser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faTrash } from "@fortawesome/free-solid-svg-icons";
function UserPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pdf");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setemail] = useState("example@gmail.com");
  const inputRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [save, setsave] = useState("Save");
  const [colories, setcolories] = useState("");
  const [servings, setServings] = useState("");
  const [familymember, setfamilymember] = useState("1");
  const [allergy, setallergy] = useState("");
  const [dislike, setdislike] = useState("");
  const [diatryrestriction, setdiatryrestriction] = useState("");

  const [pdfList, setPdfList] = useState([]);
  // const { isLoggedIn } = useStore();
  // const [name, setName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userdata'));
    if (isLoggedIn) {
      setName(user.name);
    }
    const storedPdfList = JSON.parse(localStorage.getItem("pdfList")) || [];
      // console.log(storedPdfList)
    setPdfList(storedPdfList);
  }, [isLoggedIn]);

  const handlePdfClick = (pdfData) => {
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
    );
  };

  const handleDelete = (id) => {
    const updatedList = pdfList.filter(pdf => pdf.id !== id);
    setPdfList(updatedList);
    localStorage.setItem("pdfList", JSON.stringify(updatedList));
  };
  const handleEditClick = () => {
    setIsEditable((prev) => !prev);

    // Focus the input when it becomes editable
    setTimeout(() => {
      if (!isEditable && inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };
  const handleEmailEditClick = () => {
    setIsEmailEditable((prev) => !prev);

    // Focus the input when it becomes editable
    setTimeout(() => {
      if (!isEditable && inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  useEffect(() => {
    // Check localStorage for the "user" object
    const user = localStorage.getItem("user");
    // console.log(user)
    const userdata = localStorage.getItem("userdata");
    if (userdata) {
      const parsedata = JSON.parse(userdata);
      // setUserData(response.data);
      setName(parsedata.name || "Not available");
      setemail(parsedata.email || "Not available");
    }

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.user_id) {
      fetchUserData(user.user_id);
    } else {
      setError("No user data found. Please sign in.");
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://meeel.xyz/show`, {
        headers: { Authorization: userId.toString() },
      });

      if (response.data && typeof response.data === "object") {
        // console.log(response.data);
        setUserData(response.data);

        setName(response.data.name || "Not available");
        setemail(response.data.email || "Not available");
        setServings(response.data.servings || "Not available");
        setallergy(response.data.food_allergy || "Not available");
        setdiatryrestriction(
          response.data.dietary_restriction || "Not available"
        );
        setdislike(response.data.dislikes || "Not available");
        setfamilymember(response.data.preferred_meal || "Not available");

        setcolories(response.data.total_calories || "Not available");
        // console.log(servings);
        console.log(response.data)
        localStorage.setItem("userdata", JSON.stringify(response.data));

        // Log the response data (or the saved data)
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      setError("Failed to fetch user data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const MenuItem = ({ icon: Icon, text, onClick, isActive }) => (
    <div
      className={`flex items-center py-3 px-4 rounded-lg text-Text2 hover:bg-P-Green2/20 hover:cursor-pointer transition-all duration-300 ${
        isActive ? "bg-P-Green2/30 text-Text1" : ""
      }`}
      onClick={onClick}
    >
      <Icon size={20} className={isActive ? "" : "text-P-Green1"} />
      <span className={`ml-4 ${!isOpen && "hidden"} lg:block font-medium`}>{text}</span>
    </div>
  );
  const handleSaveNameClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user.user_id;

      // setsave("Saving...");

      setLoading(true);
      // console.log("inside save", userId);
      try {
        const response = await axios.put(
          `https://meeel.xyz/update`,
          { name },
          {
            headers: { Authorization: userId.toString() },
          }
        );

        if (response.status === 200) {
          setIsEditable(false);
          fetchUserData(); // Refetch user data to get the latest info
        }
      } catch (error) {
        setError("Failed to update user data: " + error.message);
      } finally {
        setLoading(false);
        // setsave("Save successful!");
        setIsEditable(false);
        
      }
    }
  };
  const handleSaveEmailClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user.user_id;

      // setsave("Saving...");
      setLoading(true);

      try {
        const response = await axios.put(
          `https://meeel.xyz/update`,
          { email },
          {
            headers: { Authorization: userId.toString() },
          }
        );

        if (response.status === 200) {
          setIsEditable(false);
          fetchUserData(); // Refetch user data to get the latest info
        }
      } catch (error) {
        setError("Failed to update user data: " + error.message);
      } finally {
        setLoading(false);
        
        setIsEmailEditable(false);
      }
    }
  };
  const handleSaveServingsClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user.user_id;

      setsave("Saving...");
      setLoading(true);

      try {
        const response = await axios.put(
          `https://meeel.xyz/update`,
          { servings },
          {
            headers: { Authorization: userId.toString() },
          }
        );

        if (response.status === 200) {
          // console.log(response.data);
          setIsEditable(false);
          fetchUserData(); // Refetch user data to get the latest info
        }
      } catch (error) {
        setError("Failed to update servings: " + error.message);
      } finally {
        setLoading(false);
        setsave("Save successful!");
        setTimeout(() => {
          setsave("Save");
          setIsEditable(false);
        }, 2000);
      }
    }
  };

  const handleFoodAllergy = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user.user_id;

      setsave("Saving...");
      setLoading(true);

      try {
        const response = await axios.put(
          `https://meeel.xyz/update`,
          { food_allergy: allergy },
          {
            headers: { Authorization: userId.toString() },
          }
        );

        if (response.status === 200) {
          // console.log(response.data);
          setIsEditable(false);
          fetchUserData(); // Refetch user data to get the latest info
        }
      } catch (error) {
        setError("Failed to update servings: " + error.message);
      } finally {
        setLoading(false);
        setsave("Save successful!");
        setTimeout(() => {
          setsave("Save");
          setIsEditable(false);
        }, 2000);
      }
    }
  };
  const handledislike = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user.user_id;

      setsave("Saving...");
      setLoading(true);

      try {
        const response = await axios.put(
          `https://meeel.xyz/update`,
          { dislikes: dislike },
          {
            headers: { Authorization: userId.toString() },
          }
        );

        if (response.status === 200) {
          // console.log(response.data);
          setIsEditable(false);
          fetchUserData(); // Refetch user data to get the latest info
        }
      } catch (error) {
        setError("Failed to update servings: " + error.message);
      } finally {
        setLoading(false);
        setsave("Save successful!");
        setTimeout(() => {
          setsave("Save");
          setIsEditable(false);
        }, 2000);
      }
    }
  };
  const handlepreferredmeal = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user.user_id;

      setsave("Saving...");
      setLoading(true);

      try {
        const response = await axios.put(
          `https://meeel.xyz/update`,
          { dietary_restriction: diatryrestriction },
          {
            headers: { Authorization: userId.toString() },
          }
        );

        if (response.status === 200) {
          // console.log(response.data);
          setIsEditable(false);
          fetchUserData(); // Refetch user data to get the latest info
        }
      } catch (error) {
        setError("Failed to update servings: " + error.message);
      } finally {
        setLoading(false);
        setsave("Save successful!");
        setTimeout(() => {
          setsave("Save");
          setIsEditable(false);
        }, 2000);
      }
    }
  };
  const handlefamily = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user.user_id;

      setsave("Saving...");
      setLoading(true);

      try {
        const response = await axios.put(
          `https://meeel.xyz/update`,
          { preferred_meal: familymember },
          {
            headers: { Authorization: userId.toString() },
          }
        );

        if (response.status === 200) {
          // console.log(response.data);
          setIsEditable(false);
          fetchUserData(); // Refetch user data to get the latest info
        }
      } catch (error) {
        setError("Failed to update servings: " + error.message);
      } finally {
        setLoading(false);
        setsave("Save successful!");
        setTimeout(() => {
          setsave("Save");
          setIsEditable(false);
        }, 2000);
      }
    }
  };
  const handlecolories = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user.user_id;

      setsave("Saving...");
      setLoading(true);

      try {
        const response = await axios.put(
          `https://meeel.xyz/update`,
          { total_calories: colories },
          {
            headers: { Authorization: userId.toString() },
          }
        );

        if (response.status === 200) {
          // console.log(response.data);
          setIsEditable(false);
          fetchUserData(); // Refetch user data to get the latest info
        }
      } catch (error) {
        setError("Failed to update servings: " + error.message);
      } finally {
        setLoading(false);
        setsave("Save successful!");
        setTimeout(() => {
          setsave("Save");
          setIsEditable(false);
        }, 2000);
      }
    }
  };
  return (
    // <div className="">
    //   <Header />
    //   {/*section 1  */}

    //   <section className="  h-fit ">
    //     <div className="relative justify-center md:justify-normal py-20 pb-0 bg-P-Green2 md:bg-transparent flex  items-center h-fit">
    //       <img
    //         src={img1}
    //         alt=""
    //         className="hidden md:block md:h-auto md:w-auto"
    //       />
    //       <div className="flex flex-col items-center md:block md:absolute left-8 w-[30rem] lg:w-[40rem] ">
    //         <h1 className="text-4xl text-center md:text-left 2xl:text-5xl font-bold text-white">
    //           Your Profile & Preferences
    //         </h1>
    //         <p className="text-lg text-white px-4 sm:px-0 text-center md:text-left">
    //           Manage your personal details and preferences here. You can view
    //           and update your information anytime
    //         </p>
    //         <div className="flex flex-col flex-wrap sm:flex-row w-fit mt-8 gap-6 mb-6 sm:mb-0 ">

    //           {isLoggedIn ? (

    //             <Link to="/payment">
    //           <button
    //             className=" py-2 px-10 box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"

    //             >

    //             Upgrade&nbsp;Plan
    //           </button>
    //             </Link>
    //             ):(
    //               <button
    //             className=" py-2 px-10 box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
    //             onClick={handleLearnMoreClick}
    //             >

    //               Learn&nbsp;More
    //           </button>
    //             )}

    //           {!isLoggedIn && (
    //             <button
    //               className=" py-2 px-10 box-border rounded-lg flex items-center justify-center bg-transparent text-white border-2 font-roboto font-medium text-base"
    //               onClick={handleSignUpClick}
    //             >
    //               Login
    //             </button>
    //           )}
    //           {isLoggedIn && (
    //             <button
    //               className=" py-2 px-10 box-border rounded-lg flex items-center justify-center bg-transparent text-white border-2 font-roboto font-medium text-base"
    //               onClick={handleLogout}
    //             >
    //               Logout
    //             </button>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* section 2 */}

    // <section className="h-fit py-[5rem] sm:py-[5rem] w-screen flex items-center justify-center px-4 ">
    //   <div className="maindiv  max-w-[1800px] h-fit  p-6 bg-white   rounded-lg">
    //     {/* first */}
    //     <div className="firstdiv flex justify-end pr-4 sm:pr-8  w-fit h-fit py-3 sm:py-6">
    //       {/* <img
    //         src={userimage}
    //         alt="Placeholder"
    //         className="w-full h-fit md:w-[20rem]   object-cover rounded-lg"
    //       /> */}
    //       <SquareUser className="w-full h-fit md:w-[20rem]   object-cover rounded-lg"/>
    //     </div>
    //     {/* 2nd */}
    //     <div className="snddiv flex flex-col justify-center">
    //       <div>
    //         <h3 className=" text-sm sm:text-2xl  text-Text1 border-b-8 border-S-Orange leading-none font-bold inline-block ">
    //           Personal details
    //         </h3>
    //       </div>
    //       <p className="text-xs sm:text-lg text-Text2 mb-4">
    //       Your personal details are listed below.
    //       </p>
    //     </div>
    //     {/* 3rd */}
    //     <div className="thirddiv w-full mx-auto ">
    //       <form onSubmit={handleSubmit}>
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
    //           <div className="mb-4">
    //             <label
    //               htmlFor="name"
    //               className="block text-Text1 font-bold text-md mb-2"
    //             >
    //               Name
    //             </label>
    //             <input
    //               disabled
    //               type="text"
    //               id="name"
    //               name="name"
    //               value={userData?.name || 'Not available'}
    //               onChange={handleChange}
    //               className="w-full capitalize bg-transparent py-0    text-Text2"
    //               required
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label
    //               htmlFor="email"
    //               className="block text-Text1 font-bold text-md mb-2"
    //             >
    //               Email
    //             </label>
    //             <input
    //               disabled
    //               type="email"
    //               id="email"
    //               name="email"
    //               value={userData?.email || 'Not available'}
    //               onChange={handleChange}
    //               className="w-full capitalize bg-transparent py-0    text-Text2"
    //               required
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label
    //               htmlFor="phone"
    //               className="block text-Text1 font-bold text-md mb-2"
    //             >
    //               Plan Type
    //             </label>
    //             <input
    //               disabled
    //               type="text"
    //               id="phone"
    //               name="phone"
    //               value={
    //                 !isLoggedIn ? 'Not available' :
    //                 userData?.subscription_status === "inactive" ? 'No plan, please subscribe!' :
    //                 userData?.subscription_status === "pro" ? "Starter" :
    //                 userData?.subscription_status === "ultra_pro" ? "Premium" :
    //                 'No plan, please subscribe!'
    //               }
    //               onChange={handleChange}
    //               className="w-full capitalize bg-transparent py-0    text-Text2"
    //               required
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label
    //               htmlFor="address"
    //               className="block text-Text1 font-bold text-md mb-2"
    //             >

    //               Subscription End

    //             </label>
    //             <input
    //               disabled
    //               type="text"
    //               id="address"
    //               name="address"
    //               value={userData?.subscription_end_date ? new Date(userData.subscription_end_date).toLocaleDateString('en-GB') : 'Not available'}

    //               onChange={handleChange}
    //               className="w-full capitalize bg-transparent py-0    text-Text2"
    //               required
    //             />
    //           </div>
    //         </div>

    //           {isLoggedIn && (

    //         <div className="flex flex-wrap flex-col sm:flex-row gap-2   pr-8 sm:pr-0">
    //   <Link to="/deleteaccount">
    // <button

    //   className="py-2 w-full  mx-auto md:mx-0 px-8 box-border rounded-lg flex items-center justify-center bg-transparent border-2 border-Text1 text-Text1   hover:bg-red-600 hover:text-white transition-all font-roboto font-medium text-base"
    //   >
    //   Delete Account
    // </button>
    //     </Link>

    //         <Link to="/deletecard">
    //         <button
    //           className="py-2 w-full    mx-auto md:mx-0 px-8 box-border rounded-lg flex items-center justify-center bg-transparent border-2 border-Text1 text-Text1   hover:cursor-pointer  transition-all font-roboto font-medium text-base"
    //           >
    //           Payment Methods
    //         </button>
    //             </Link>
    //           </div>
    //           )}
    //       </form>
    //     </div>

    //   </div>
    // </section>

    //   {/* section 3 */}

    // <section className=" flex mb-10   flex-col items-end h-fit">
    //   <img src={capsule} alt="" className="w-[20rem] sm:w-[80rem] mb-[0rem] sm:mb-[0rem]" />
    //   {isLoggedIn && (
    //     <>
    //     <Pref/>

    //   <Dashboard />
    //     </>
    //   )}
    // </section>
    //   <Cta
    //     title="Still have Questions?"
    //     description="Feel free to reach out to us."
    //   />
    //   <Footer />
    //   <Copyright />
    // </div>
    <div className="min-h-screen">
      <Header />
      <div className="flex min-h-screen bg-white">
        {/* Sidebar */}

        <div
          id="sidebarid"
          className={`bg-white absolute shadow-lg transition-all duration-300 overflow-y-auto h-screen z-[999999999999999999999] ${
            isOpen ? "w-64" : "w-12"
          } lg:w-[20rem]`}
        >
          <div className="flex items-center justify-between px-4">
            {/* <h2
              className={`text-xl font-semibold ${
                !isOpen && "hidden"
              } lg:block`}
            >
              Profile
            </h2> */}
            <button onClick={toggleSidebar} className="lg:hidden">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <nav>
            <div className={`p-4 ${!isOpen && "hidden"} lg:block`}>
              <h3 className="text-lg font-semibold mb-2 capitalize ">
                Profile
              </h3>
            </div>


                <div className={`${isOpen? "bg-gradient-to-r from-P-Green2/30 to-P-Green2/10 px-4 py-4 rounded-xl mx-4 mb-6 shadow-inner":" lg:bg-gradient-to-r lg:from-P-Green2/30 lg:to-P-Green2/10 lg:px-4 lg:py-4 lg:rounded-xl lg:mx-4 lg:mb-6 lg:shadow-inner "}`}>
            {/* <MenuItem
              icon={UserRound}
              text="Name"
              onClick={() => {
                setActiveTab("name");
                setIsEditable(false);
              }}
              isActive={activeTab === "name"}
              /> */}
              <div className="flex items-center justify-center py-3 px-4 rounded-lg text-Text2  transition-all duration-300 ">
                {!isEditable &&(

                  <UserRound size={25}
                  className="text-P-Green1"/>
                )}
                   
                   
                
                 
                  
                  <input
                    id="name"
                    type="text"
                    ref={inputRef}
                    className={` border-Text2 py-3 px-4 capitalize  bg-transparent rounded-lg w-full placeholder-Text2 text-Text2 focus:outline-none focus:ring-2 focus:ring-transparent transition duration-300 ${
                      isEditable
                        ? "border-P-Green1 bg-white"
                        : "border-gray-300 bg-gray-100"
                    }`}
                    value={name} // Use local state for name
                    disabled={!isEditable}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {!isEditable&& (

                    <Edit
                    size={20}
                    className="text-P-Green1"
                    onClick={handleEditClick}
                    />
                  )}
                  {isEditable && (
                    <button
                      className="ml-2 py-2 px-4 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                      onClick={handleSaveNameClick}
                    >
                      {save}
                    </button>
                  )}
                
              </div>


            
            {/* <MenuItem
              icon={AtSign}
              text="Email"
              onClick={() => {
                setActiveTab("email");
                setIsEditable(false);
              }}
              isActive={activeTab === "email"}
              /> */}


<div className="flex items-center justify-center py-3 px-4 rounded-lg text-Text2  transition-all duration-300 ">
                {!isEmailEditable &&(

                  <AtSign size={25}
                  className="text-P-Green1"/>
                )}
                   
                   
                
                 
                   <input
                    id="email"
                    type="email"
                    ref={inputRef}
                    className={` border-Text2 py-3 px-4 capitalize  bg-transparent rounded-lg w-full placeholder-Text2 text-Text2 focus:outline-none focus:ring-2 focus:ring-transparent transition duration-300 ${
                      isEmailEditable
                        ? "border-P-Green1 bg-white"
                        : "border-gray-300 bg-gray-100"
                    }`}
                    value={email}
                    disabled={!isEmailEditable}
                    onChange={(e) => setemail(e.target.value)}
                  />
                   {!isEmailEditable&& (

<Edit
size={20}
className="text-P-Green1"
onClick={handleEmailEditClick}
/>
)}
                  {isEmailEditable && (
                    <button
                      className="ml-2 py-2 px-4 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                      onClick={handleSaveEmailClick}
                    >
                      {save}
                    </button>
                  )}

                
              </div>

              </div>

            <div
              className={`px-4  border-gray-200 ${
                !isOpen && "hidden"
              } lg:block`}
            >
              <h3 className="text-lg font-medium mb-2">Subscription</h3>
            </div>

            <div className={`${isOpen? "bg-gradient-to-r from-P-Green2/30 to-P-Green2/10 px-4 py-4 rounded-xl mx-4 mb-6 shadow-inner":" lg:bg-gradient-to-r lg:from-P-Green2/30 lg:to-P-Green2/10 lg:px-4 lg:py-4 lg:rounded-xl lg:mx-4 lg:mb-6 lg:shadow-inner "}`}>

            <MenuItem
              icon={CreditCard}
              text="Manage Subscription"
              onClick={() => {
                setActiveTab("payment");
                setIsOpen(false)
                setIsEditable(false);
              }}
              isActive={activeTab === "payment"}
              />
              </div>

            <div
              className={`px-4  border-gray-200 ${
                !isOpen && "hidden"
              } lg:block`}
            >
              <h3 className="text-lg font-medium mb-2">My Files</h3>
            </div>
            <div className={`${isOpen? "bg-gradient-to-r from-P-Green2/30 to-P-Green2/10 px-4 py-4 rounded-xl mx-4 mb-6 shadow-inner":" lg:bg-gradient-to-r lg:from-P-Green2/30 lg:to-P-Green2/10 lg:px-4 lg:py-4 lg:rounded-xl lg:mx-4 lg:mb-6 lg:shadow-inner "}`}>
            <MenuItem
              icon={File}
              text="Resource Center"
              onClick={() => {
                setActiveTab("pdf");
                setIsOpen(false)
                setIsEditable(false);
              }}
              isActive={activeTab === "pdf"}
              />
              </div>
            <div
              className={`px-4  border-gray-200 ${
                !isOpen && "hidden"
              } lg:block`}
            >
              <h3 className="text-lg font-medium mb-2">Preferences</h3>
            </div>
            {/* <MenuItem
              icon={HandPlatter}
              text="Servings"
              onClick={() => {setActiveTab("Servings");setIsEditable(false)}}
              isActive={activeTab === "Servings"}
            />
            <MenuItem
              icon={AlertTriangle}
              text="Food Allergy"
              onClick={() =>{ setActiveTab("Allergy");setIsEditable(false)}}
              isActive={activeTab === "Allergy"}
            />
            <MenuItem
              icon={ThumbsDownIcon}
              text="Dislike"
              onClick={() => {setActiveTab("dislike");setIsEditable(false)}}
              isActive={activeTab === "dislike"}
            />
            <MenuItem
              icon={Star}
              text="Preferred Meal"
              onClick={() => {setActiveTab("preferredmeal");setIsEditable(false)}}
              isActive={activeTab === "preferredmeal"}
            />
            <MenuItem
              icon={PersonStanding}
              text="Family Members"
              onClick={() => {setActiveTab("family");setIsEditable(false)}}
              isActive={activeTab === "family"}
            />
            <MenuItem
              icon={Flame}
              text="Preferred Calories"
              onClick={() => {setActiveTab("calories");setIsEditable(false)}}
              isActive={activeTab === "calories"}
            /> */}

            <div className={`${isOpen? "bg-gradient-to-r from-P-Green2/30 to-P-Green2/10 px-4 py-4 rounded-xl mx-4 mb-6 shadow-inner":" lg:bg-gradient-to-r lg:from-P-Green2/30 lg:to-P-Green2/10 lg:px-4 lg:py-4 lg:rounded-xl lg:mx-4 lg:mb-6 lg:shadow-inner "}`}>
            <MenuItem
              icon={FileSpreadsheet}
              text="Manage Preferences"
              onClick={() => {
                setActiveTab("pdfgenerate");
                setIsOpen(false)
                setIsEditable(false);
              }}
              isActive={activeTab === "pdfgenerate"}
              />
              </div>
            <div
              className={`px-4  border-gray-200 ${
                !isOpen && "hidden"
              } lg:block`}
            >
              <h3 className="text-lg font-medium mb-2">Contact & Support</h3>
            </div>
            <div className={`${isOpen? "bg-gradient-to-r from-P-Green2/30 to-P-Green2/10 px-4 py-4 rounded-xl mx-4 mb-6 shadow-inner":" lg:bg-gradient-to-r lg:from-P-Green2/30 lg:to-P-Green2/10 lg:px-4 lg:py-4 lg:rounded-xl lg:mx-4 lg:mb-6 lg:shadow-inner "}`}>

            <MenuItem
              icon={MessageSquareDot}
              text="Contact Us"
              onClick={() => {
                setActiveTab("contact");
                setIsOpen(false)
                setIsEditable(false);
              }}
              isActive={activeTab === "contact"}
              />
              </div>
            <div
              className={`px-4  border-gray-200 ${
                !isOpen && "hidden"
              } lg:block`}
            >
              <h3 className="text-lg font-medium mb-2">Delete Account</h3>
            </div>
            <div className={`${isOpen? "bg-gradient-to-r from-P-Green2/30 to-P-Green2/10 px-4 py-4 rounded-xl mx-4 mb-6 shadow-inner":" lg:bg-gradient-to-r lg:from-P-Green2/30 lg:to-P-Green2/10 lg:px-4 lg:py-4 lg:rounded-xl lg:mx-4 lg:mb-6 lg:shadow-inner "}`}>

            <MenuItem
              icon={Trash2}
              text="Delete Account"
              onClick={() => {
                setActiveTab("account");
                setIsOpen(false)
                setIsEditable(false);
              }}
              isActive={activeTab === "account"}
              />
              </div>
          </nav>
        </div>
        <div className={`${
            isOpen ? "w-64" : "w-16"
          } lg:w-72`}></div>
        {/* Main content */}

        <div className="flex-1  h-fit sm:h-screen   flex items-start justify-start lg:ml-8  py-2 sm:py-2">


          <div className="flex-1   sm:p-8  bg-white  overflow-hidden max-w-4xl w-fit   items-start justify-start flex  h-fit  sm:mx-6   overflow-y-auto ">
            {/* {activeTab === "name" && (
              <div className="name  flex items-center justify-center p-4">
                
              </div>
            )} */}

            {/* {activeTab === "email" && (
              <div className="email  flex items-center justify-center p-4">
                <div className="flex flex-col items-start w-full max-w-sm">
                  <div className="flex items-center justify-between w-full mb-2">
                    <label
                      htmlFor="email"
                      className="text-gray-700 font-semibold"
                    >
                      Email
                    </label>
                    <Edit
                      className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500"
                      onClick={handleEditClick}
                    />
                  </div>
                  <input
                    id="email"
                    type="email"
                    ref={inputRef}
                    className={`border-2 border-Text2 py-3 px-4 bg-transparent rounded-lg w-full placeholder-Text2 text-Text2 focus:outline-none focus:ring-2 focus:ring-transparent transition duration-300 ${
                      isEditable
                        ? "border-P-Green1 bg-white"
                        : "border-gray-300 bg-gray-100"
                    }`}
                    value={email}
                    disabled={!isEditable}
                    onChange={(e) => setemail(e.target.value)}
                  />
                  {isEditable && (
                    <button
                      className="mt-2 py-2 px-4 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                      onClick={handleSaveEmailClick}
                    >
                      {save}
                    </button>
                  )}
                </div>
              </div>
            )} */}
            {activeTab === "payment" && <Temp />}
            {activeTab === "account" && (
              <div className=" py-4 flex items-center justify-center ">
                <Link to="/deleteaccount" className="">
                  <button
                    onClick={() => {
                      window.confirm(
                        "Are you sure you want to delete your account? This action is permanent and cannot be undone. All your data will be lost."
                      );
                    }}
                    className="py-2    mx-auto md:mx-0 px-6 sm:px-8 box-border rounded-lg flex items-center justify-center bg-transparent border-2 border-Text1 text-Text1   hover:bg-red-600 hover:text-white transition-all font-roboto font-medium text-xs sm:text-base"
                  >
                    Delete Account
                  </button>
                </Link>
              </div>
            )}
            {activeTab === "pdf" && (
               <div className="container mx-auto px-4 py-8 h-full">
               <h1 className="text-3xl font-bold mb-6 text-gray-800">My Resources</h1>
               {isLoggedIn && (
                 <div className="overflow-y-auto">
                   {pdfList.length > 0 ? (
                   <ul className="space-y-4 w-full max-w-4xl ">
                   {pdfList.map((pdf) => (
                     <li 
                       key={pdf.id} 
                       className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 px-3 sm:px-4 py-3 rounded-md hover:bg-gray-100 transition duration-150 ease-in-out"
                     >
                       <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                         <FontAwesomeIcon icon={faFilePdf} className="text-P-Green1 text-xl sm:text-2xl flex-shrink-0" />
                         <div className="min-w-0 flex-1">
                           <p className="font-semibold text-gray-700 text-sm sm:text-base truncate  max-w-[8rem] sm:max-w-full">
                             {pdf.name || "Unnamed PDF"}
                           </p>
                           <p className="text-xs sm:text-sm text-gray-500">
                             {new Date(pdf.generatedDate).toLocaleDateString()}
                           </p>
                         </div>
                       </div>
                       <div className="flex space-x-2 w-full sm:w-auto justify-end mt-2 sm:mt-0">
                         <button
                           onClick={() => handlePdfClick(pdf.data)}
                           className="flex-1 sm:flex-none px-3 py-1 bg-P-Green1 text-white text-sm rounded hover:bg-blue-600 transition duration-150 ease-in-out"
                         >
                           View
                         </button>
                         <button
                           onClick={() => handleDelete(pdf.id)}
                           className="flex-1 sm:flex-none px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition duration-150 ease-in-out"
                         >
                           <FontAwesomeIcon icon={faTrash} />
                         </button>
                       </div>
                     </li>
                   ))}
                 </ul>
                   ) : (
                     <p className="text-center text-gray-500">No PDFs available</p>
                   )}
                 </div>
               )}
             </div>
            )}
            {activeTab === "contact" && <ContactUsPage />}
            {/* {activeTab === "Servings" && (
              <div className="servings w-full h-full flex items-center justify-center p-4">
              <div className="flex flex-col items-start w-full max-w-sm">
                <div className="flex items-center justify-between w-full mb-2">
                  <label htmlFor="servings" className="text-gray-700 font-semibold">Servings</label>
                  <Edit className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500" onClick={handleEditClick} />
                </div>
                <input
                  id="servings"
                  type="text"
                  ref={inputRef}
                  className={`border-2 w-full px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isEditable ? 'border-blue-500 bg-white' : 'border-gray-300 bg-gray-100'
                  }`}
                  value={servings}
                  disabled={!isEditable}
                  onChange={(e) => setServings(e.target.value)}
                />
                {isEditable && (
                  <button className="mt-2 py-2 px-4 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base" onClick={handleSaveServingsClick}>
                    {save}
                  </button>
                )}
              </div>
            </div>
            )}
            {activeTab === "Allergy" && (
               <div className="food-allergy w-full h-full flex items-center justify-center p-4">
               <div className="flex flex-col items-start w-full max-w-sm">
                 <div className="flex items-center justify-between w-full mb-2">
                   <label htmlFor="food-allergy" className="text-gray-700 font-semibold">
                     Food Allergy
                   </label>
                   <Edit 
                     className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500" 
                     onClick={handleEditClick} 
                   />
                 </div>
                 <input
                   id="food-allergy"
                   type="text"
                   ref={inputRef}
                   className={`border-2 w-full px-3 py-2 rounded-lg transition-colors duration-200 ${
                     isEditable ? 'border-blue-500 bg-white' : 'border-gray-300 bg-gray-100'
                   }`}
                   value={allergy}  // Use local state for food allergy
                   disabled={!isEditable}
                   onChange={(e) => setallergy(e.target.value)}  // Update food allergy state
                 />
                 {isEditable && (
                   <button 
                     className="mt-2 py-2 px-4 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base" 
                     onClick={handleFoodAllergy}
                   >
                     {save}
                   </button>
                 )}
               </div>
             </div>
             
            )}
            {activeTab === "dislike" && (
               <div className="food-allergy w-full h-full flex items-center justify-center p-4">
               <div className="flex flex-col items-start w-full max-w-sm">
                 <div className="flex items-center justify-between w-full mb-2">
                   <label htmlFor="food-allergy" className="text-gray-700 font-semibold">
                     Dislike
                   </label>
                   <Edit 
                     className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500" 
                     onClick={handleEditClick} 
                   />
                 </div>
                 <input
                   id="dislike"
                   type="text"
                   ref={inputRef}
                   className={`border-2 w-full px-3 py-2 rounded-lg transition-colors duration-200 ${
                     isEditable ? 'border-blue-500 bg-white' : 'border-gray-300 bg-gray-100'
                   }`}
                   value={dislike}  // Use local state for food allergy
                   disabled={!isEditable}
                   onChange={(e) => setdislike(e.target.value)}  // Update food allergy state
                 />
                 {isEditable && (
                   <button 
                     className="mt-2 py-2 px-4 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base" 
                     onClick={handledislike}
                   >
                     {save}
                   </button>
                 )}
               </div>
             </div>
            )}
            {activeTab === "preferredmeal" && (
              <div className="food-allergy w-full h-full flex items-center justify-center p-4">
              <div className="flex flex-col items-start w-full max-w-sm">
                <div className="flex items-center justify-between w-full mb-2">
                  <label htmlFor="food-allergy" className="text-gray-700 font-semibold">
                    Preferred Meal
                  </label>
                  <Edit 
                    className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500" 
                    onClick={handleEditClick} 
                  />
                </div>
                <input
                  id="dislike"
                  type="text"
                  ref={inputRef}
                  className={`border-2 w-full px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isEditable ? 'border-blue-500 bg-white' : 'border-gray-300 bg-gray-100'
                  }`}
                  value={diatryrestriction}  // Use local state for food allergy
                  disabled={!isEditable}
                  onChange={(e) => setdiatryrestriction(e.target.value)}  // Update food allergy state
                />
                {isEditable && (
                  <button 
                    className="mt-2 py-2 px-4 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base" 
                    onClick={handlepreferredmeal}
                  >
                    {save}
                  </button>
                )}
              </div>
            </div>
            )}
            {activeTab === "family" && (
               <div className="food-allergy w-full h-full flex items-center justify-center p-4">
               <div className="flex flex-col items-start w-full max-w-sm">
                 <div className="flex items-center justify-between w-full mb-2">
                   <label htmlFor="food-allergy" className="text-gray-700 font-semibold">
                     Family Members
                   </label>
                   <Edit 
                     className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500" 
                     onClick={handleEditClick} 
                   />
                 </div>
                 <input
                   id="dislike"
                   type="text"
                   ref={inputRef}
                   className={`border-2 w-full px-3 py-2 rounded-lg transition-colors duration-200 ${
                     isEditable ? 'border-blue-500 bg-white' : 'border-gray-300 bg-gray-100'
                   }`}
                   value={familymember}  // Use local state for food allergy
                   disabled={!isEditable}
                   onChange={(e) => setfamilymember(e.target.value)}  // Update food allergy state
                 />
                 {isEditable && (
                   <button 
                     className="mt-2 py-2 px-4 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base" 
                     onClick={handlefamily}
                   >
                     {save}
                   </button>
                 )}
               </div>
             </div>
            )}
            {activeTab === "calories" && (
               <div className="food-allergy w-full h-full flex items-center justify-center p-4">
               <div className="flex flex-col items-start w-full max-w-sm">
                 <div className="flex items-center justify-between w-full mb-2">
                   <label htmlFor="food-allergy" className="text-gray-700 font-semibold">
                     Calories
                   </label>
                   <Edit 
                     className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500" 
                     onClick={handleEditClick} 
                   />
                 </div>
                 <input
                   id="dislike"
                   type="text"
                   ref={inputRef}
                   className={`border-2 w-full px-3 py-2 rounded-lg transition-colors duration-200 ${
                     isEditable ? 'border-blue-500 bg-white' : 'border-gray-300 bg-gray-100'
                   }`}
                   value={colories}  // Use local state for food allergy
                   disabled={!isEditable}
                   onChange={(e) => setcolories(e.target.value)}  // Update food allergy state
                 />
                 {isEditable && (
                   <button 
                     className="mt-2 py-2 px-4 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base" 
                     onClick={handlecolories}
                   >
                     {save}
                   </button>
                 )}
               </div>
             </div>
            )} */}
            {activeTab === "pdfgenerate" && <Pref />}
          </div>


        </div>



      </div>

      <Cta
      title="Contact us"
      description="Have more questions? Get in touch with us."
    />
      <Footer/>
      <Copyright/>
    </div>
  );
}

export default UserPage;
