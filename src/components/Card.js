// Importing React,necessary hooks, and assets for managing state and layout effects
import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Ensure you have this package installed
import "./card.css"; // Import the CSS file
import Favicon from "./Resource/favicon.png";
import Logo from "./Resource/logo2.png";
import "jspdf-autotable"; // Ensure you have this package installed
import "./card.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import Payment from "./payment";
import cardbgimg from "./Resource/bgcardimg.png";
import tickIcon from "./Resource/tick.svg";
import egg from "./Resource/eggs.svg";
import cheese from "./Resource/cheese.svg";
import tufo from "./Resource/tofu.svg";
import butter from "./Resource/butter.svg";
import coconut from "./Resource/coconut.svg";
import plus from "./Resource/plusc.svg";
import chicken from "./Resource/Chicken.svg";
import pork from "./Resource/pork.svg";
import beef from "./Resource/beef.svg";
import fish from "./Resource/fish.svg";
import mashroom from "./Resource/mashroom.svg";
import lowcarb from "./Resource/lowcarbs.svg";
import balancediet from "./Resource/balanceddiet.svg";
import carnivore from "./Resource/cornivorediet.svg";
import paleo from "./Resource/paleodiet.svg";
import diaryfree from "./Resource/diaryfree.svg";
import glotenfree from "./Resource/glotenfree.svg";
import servings from "./Resource/servings.svg";
import minus from "./Resource/minus.svg";
// import plus from './Resource/plusc.svg'
import arrow from "./Resource/arrow.svg";
import Loader from "./Resource/spinner.svg";
import useStore from "./Store";

import jwtDecode from 'jwt-decode';

const parseMealPlanData = (mealPlan) => {
  if (typeof mealPlan !== "string" || mealPlan.trim() === "") {
    return [];
  }

  const result = [];
  const dayRegex = /\d+:/g;
  const daySections = mealPlan.split(dayRegex);
  const dayNumbers = mealPlan.match(dayRegex);

  const boldMealNumber = (text) => {
    return text.replace(/(Meal \d+)/, "$1");
  };

  const numberIngredients = (ingredients) => {
    const sections = ingredients.split("-------------------------");
    return sections
      .map((section) => {
        let count = 1;
        return section
          .split("\n")
          .map((line) => {
            line = line.trim();
            if (line.startsWith("-")) {
              return `${count++}. ${line.substring(1).trim()}`;
            }
            return line;
          })
          .join("\n");
      })
      .join("\n-------------------------\n");
  };

  const processMeal = (meal, index) => {
    const mealNumber = `Meal ${index + 1}`;
    let [mealSection, ingredientsSection, instructionsSection] = meal.split(
      /Ingredients:|Instructions:/
    );

    const mealLines = mealSection.split("\n").filter((line) => line.trim());
    const restructuredMealLines = mealLines.map((line) => {
      if (line.toLowerCase().includes("side dish:")) return "\n" + line;
      if (line.toLowerCase().includes("cooking time:")) return "\n" + line;
      if (line.toLowerCase().includes("nutritional information:"))
        return "\n" + line;
      // if (line.toLowerCase().includes("total:\ncalories")) return "\n" + line;
      if (line.toLowerCase().includes("total:")) return "\n" + line;
      return line;
    });

    // Join the restructured lines and bold the meal number
    const mealData = boldMealNumber(restructuredMealLines.join("\n"));

    const ingredientsLines = ingredientsSection
      ? ingredientsSection.split("\n").filter((line) => line.trim())
      : [];
    const restructuredIngredientsLines = ingredientsLines.map((line) => {
      if (line.toLowerCase().includes("main dish:")) return line; // No newline before Main Dish:
      if (line.toLowerCase().includes("side dish:")) return "\n" + line;
      return line;
    });
    const ingredients = restructuredIngredientsLines.join("\n");

    // Process instructions lines
    const instructionsLines = instructionsSection
      ? instructionsSection.split("\n").filter((line) => line.trim())
      : [];
    const restructuredInstructionLines = instructionsLines.map((line) => {
      if (line.toLowerCase().includes("side dish:")) return "\n" + line;
      return line;
    });
    const instructions = restructuredInstructionLines.join("\n");

    return `${mealData}\n\nIngredients:\n${ingredients}\n\nInstructions:\n${instructions}`;
  };

  for (let i = 1; i < daySections.length; i++) {
    const dayNumber = dayNumbers[i - 1].trim();
    const dayContent = daySections[i].trim();

    const meals = dayContent.split(/Meal \d+/).filter(Boolean);
    const dayRow = [dayNumber];

    meals.forEach((meal, index) => {
      dayRow.push(processMeal(meal, index));
    });

    result.push(dayRow);
  }

  return result;
};

const cards = [
  {
    //card 3
    subtitle: "Discover",
    title: "Choose Your Preferred/Popular Meal Plan",
    description: "Tell us about the Preferred/Popular Meal Plan",

    // image: "image1.jpg",
    elements: [
      // { type: "radio", name: "preferredMeal", label: "Vegetarian",image:{} },
      {
        type: "radio",
        name: "dietaryRestrictions",
        label: "Low carb",
        image: lowcarb,
        info: `<div style="padding:10px; width:14rem;"><b>Low-Carb Diet - Benefits:</b>
  <ul style="list-style-type: disc; margin-left: 20px;">
    <li>May improve metabolic health by reducing insulin levels, helping the body burn fat more efficiently.</li>
    <li>Often leads to improvements in significant cardiovascular risk factors, such as decreasing triglycerides and increasing HDL cholesterol levels.</li>
    <li>Beneficial for managing diabetes and reducing insulin resistance.</li>
  </ul><br>
  <b>Diet Considerations:</b>
        <ul style="list-style-type: disc; margin-left: 20px;">
            <li>Some individuals might experience a temporary decrease in energy as the body adjusts to fewer carbohydrates.</li>
            <li>Ensures sufficient intake of essential nutrients through carefully selected low-carb vegetables and foods.</li>
        </ul></div>
  `,
      },
      {
        type: "radio",
        name: "dietaryRestrictions",
        label: "Balanced diet",
        image: balancediet,
        info: `<div style="padding:10px; width:14rem;"><b>Vegetarian Diet</b>
        <b>Benefits:</b>
        <ul style="list-style-type: disc; margin-left: 20px;">
            <li>Lower levels of cholesterol, lower blood pressure, and reduced risk of heart disease.</li>
            <li>Some studies show a lower risk of certain types of cancer.</li>
            <li>Generally lower in calories, helping to manage or reduce weight.</li>
        </ul> <br>
        <b>Considerations:</b>
        <ul style="list-style-type: disc; margin-left: 20px;">
            <li>If not carefully managed, can lead to insufficient protein intake.</li>
            <li>Lack of meat increases the risk of deficiencies in these nutrients.</li>
            <li>Some vegetarian diets can be high in carbohydrates, which might not suit everyone's health goals.</li>
        </ul></div>`,
      },
      {
        type: "radio",
        name: "dietaryRestrictions",
        label: "Carnivore diet",
        image: carnivore,
        info: `<div style="padding:10px; width:14rem;"><b>Carnivore Diet</b>
    <b>Benefits:</b>
    <ul style="list-style-type: disc; margin-left: 20px;">
        <li>Focuses primarily on animal-based foods, which streamlines dietary choices.</li>
        <li>Some people report improvements in autoimmune symptoms.</li>
        <li>High protein and fat content can naturally help control appetite and reduce calorie intake.</li>
    </ul> <br> 
    <b>Considerations:</b>
    <ul style="list-style-type: disc; margin-left: 20px;">
        <li>Completely excludes plant-based foods, potentially leading to digestive issues such as constipation.</li>
        <li>May result in deficiencies in certain vitamins and antioxidants found predominantly in plant foods.</li>
    </ul></div>`,
      },
      {
        type: "radio",
        name: "dietaryRestrictions",
        label: "Paleo diet",
        image: paleo,
        info: `<div style="padding:10px; width:14rem;">
        
         <b>Paleo Diet</b>
    <b>Benefits:</b>
    <ul style="list-style-type: disc; margin-left: 20px;">
        <li>Focuses on consuming whole, unprocessed foods, which can enhance overall health.</li>
        <li>High fibre intake from fruits and vegetables supports a healthy digestive system.</li>
        <li>Free from dairy, grains, and processed foods, benefiting those with specific food sensitivities.</li>
    </ul> <br>
    <b>Considerations:</b>
    <ul style="list-style-type: disc; margin-left: 20px;">
        <li>Excludes grains and dairy, which can lead to potential gaps in calcium and other nutrients if not properly managed.</li>
        <li>Sometimes requires more specialized ingredients which can be more expensive and less accessible.</li>
    </ul></div>`,
      },
      {
        type: "radio",
        name: "dietaryRestrictions",
        label: "Vegetarian",
        image: balancediet,
      },
    ],
  },

  {
    //card 4
    subtitle: "Choose",
    title: "How Many Servings Do You Need?",
    description: "Select the number of servings you need per meal.",

    // image: "image1.jpg",
    elements: [
      {
        type: "radio",
        name: "servings",
        label: "1 Serving",
        image: servings,
        info: "",
      },
      {
        type: "radio",
        name: "servings",
        label: "2 Servings",
        image: servings,
        info: "",
      },
      {
        type: "radio",
        name: "servings",
        label: "3 Servings",
        image: servings,
        info: "",
      },
      {
        type: "radio",
        name: "servings",
        label: "4 Servings",
        image: servings,
        info: "",
      },
    ],
  },

  {
    //card 1
    subtitle: "Discover",
    title: "Tell Us About Your Food Allergies",
    description:
      "We want to make sure your meal plan is tailored to your needs. Let us know if you have any food allergies so we can provide you with delicious and safe recipes.",

    // image: "image1.jpg",
    elements: [
      {
        type: "radio",
        name: "FoodAllergies",
        label: "Eggs",
        image: egg,
        info: "",
      },
      {
        type: "radio",
        name: "FoodAllergies",
        label: "Cheese",
        image: cheese,
        info: "",
      },
      {
        type: "radio",
        name: "FoodAllergies",
        label: "Tofu",
        image: tufo,
        info: "",
      },
      {
        type: "radio",
        name: "FoodAllergies",
        label: "Butter",
        image: butter,
        info: "",
      },
      {
        type: "radio",
        name: "FoodAllergies",
        label: "Coconut",
        image: coconut,
        info: "",
      },
    ],
  },
  // skip
  {
    //card 3
    subtitle: "Discover",
    title: "Choose Your Preferred Calories",
    description: "Choose your calorie intake based on personal preferences.",

    // image: "image1.jpg",
    elements: [
      // { type: "radio", name: "preferredMeal", label: "Vegetarian",image:{} },
      {
        type: "radio",
        name: "preferredMeal",
        label: "Recomended (2000 - 2500 calories)",
        image: glotenfree,
        info: "",
      },
    ],
  },

  {
    //card 2
    subtitle: "Discover",
    title: "Tell us about the food you dislike",
    description: "Tell us about the food you dislike",

    // image: "image1.jpg",
    elements: [
      {
        type: "radio",
        name: "dislike",
        label: "Chicken",
        image: chicken,
        info: "",
      },
      {
        type: "radio",
        name: "dislike",
        label: "Pork",
        image: pork,
        info: "",
      },
      {
        type: "radio",
        name: "dislike",
        label: "Beef",
        image: beef,
        info: "",
      },
      { type: "radio", name: "dislike", label: "fish", image: fish },
      {
        type: "radio",
        name: "dislike",
        label: "Mushrooms",
        image: mashroom,
        info: "",
      },
    ],
  },

  {
    //card 6
    subtitle: "Details",
    title: "Your Details",
    description: "",

    // image: "image1.jpg",
    elements: [
      { type: "text", placeholder: "Your Name" },
      { type: "email", placeholder: "Email Address" },
      // { type: "tel", placeholder: "Phone" },
      // { type: "text", placeholder: "Address" },
      { type: "password", placeholder: "Password" },
    ],
  },
  {
    //card 7
    subtitle: "Log In",
    title: "",
    description: "",
    // image: "image1.jpg",
    elements: [
      { type: "email", placeholder: "Email Address" },
      { type: "password", placeholder: "Password" },
    ],
  },
];

const CardNavigator = ({ setLoading }) => {
  const API_BASE_URL = "https://meeel.xyz";
  const [eror, seteror] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [customItems, setCustomItems] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [familyMembers, setFamilyMembers] = useState(1);
  const [ispopupOpen, setIspopupOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedPreferredMeal, setSelectedPreferredMeal] = useState("");
  const [selectedFoodAllergies, setSelectedFoodAllergies] = useState([]);
  const [selecteddietaryRestrictions, setSelecteddietaryRestrictions] =useState([]);
  const [selecteddislike, setSelecteddislike] = useState([]);
  const [selectedServings, setSelectedServings] = useState("");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useStore();
  const [hasGeneratedPDF, setHasGeneratedPDF] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const [dietrypopup, setdietrypopup] = useState(false);
  const [ispopupOpen3, setIspopupOpen3] = useState(false);
  const popupRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setSelectedPreferredMeal(value);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setdietrypopup("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      setIsSubscribed(user.isSubscribed || false);
    }
    if (user) {
      setIsLoggedIn(true);
    }

    if (user) {
      setIsLoggedIn(true);
      // Check if the user has already generated a PDF or is subscribed
      const userData = JSON.parse(user);
      // setHasGeneratedPDF(userData.hasGeneratedPDF || false);
      setIsSubscribed(userData.isSubscribed || false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAllergies.includes(newItemName.trim())) {
      setSelectedAllergies((prevItems) => [...prevItems, newItemName.trim()]);
      setNewItemName("");
    }
  };

  const handleDelete = (index) => {
    setSelectedAllergies((prevItems) =>
      prevItems.filter((_, i) => i !== index)
    );
  };

  const handleDone = () => {
    // Here you can perform any additional actions needed when done
    setIsOpen(false);
  };

  const openPopup = (cat) => {
    setCategory(cat);
    setIsOpen(true);
  };
  const [card6Values, setCard6Values] = useState({
    Phone: "",
    Address: "",
    "Your Name": "",
    "Email Address": "",
    Password: "",

  });

  // State variables for card 7
  const [card7Values, setCard7Values] = useState({});

  // Handle input changes for card 6
  const handleCard6Change = (e) => {
    const { placeholder, value } = e.target;
    setCard6Values((prevValues) => ({
      ...prevValues,
      [placeholder]: value,
    }));
    if (placeholder === "Email Address" || placeholder === "Password") {
      setLoginData((prevData) => ({
        ...prevData,
        [placeholder === "Email Address" ? "email" : "password"]: value,
      }));
    }
  };

  // Handle input changes for card 7
  const handleCard7Change = (e) => {
    const { placeholder, value } = e.target;
    setCard7Values((prevValues) => ({
      ...prevValues,
      [placeholder]: value,
    }));
    setLoginData((prevData) => ({
      ...prevData,
      [placeholder === "Email Address" ? "email" : "password"]: value,
    }));
  };

  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate the email
    if (!emailRegex.test(card6Values["Email Address"])) {
      seteror("Please enter a valid email address");
      return; // Exit the function if the email is invalid
    }
    if (card6Values.Password.length < 8) {
      seteror("Password must be Strong and at least 8 characters long");
      return; // Exit the function if the password is invalid
    }

    try {
      // Start the loader
      setLoader(true);

      // Prepare the form data
      const formData = {
        ...card6Values,
        totalCalories:selectedPreferredMeal,
        dietaryRestriction:selecteddietaryRestrictions,
        foodAllergy:selectedFoodAllergies,
        servings:selectedServings,
        dislikes:selecteddislike,
        preferredMeal:`${familyMembers} members`
      };

      // Signup request
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the response is not ok
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Signup failed.");
      }

      const data = await response.json();

      // If there's an error in the response
      if (data.error) {
        throw new Error(data.error);
      }

      // Successful signup
      setIsLoggedIn(true);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: formData["Email Address"],
          user_id: data.id,
        })
      );

      // const email = formData["Email Address"];
      // await generateAndSendPDF(email);

      // alert('Signup and PDF generation successful!');
      navigate("/payment");
      window.location.reload(true);
    } catch (error) {
      if (
        error.message.includes("psycopg2.OperationalError") &&
        error.message.includes("SSL connection has been closed unexpectedly")
      ) {
        seteror("Use Strong Password!");
      } else {
        seteror(error.message);
      }
      // Handle errors
      // console.error("Error during signup or PDF generation:", error);
      // alert(error.message);
    } finally {
      // Stop the loader
      setLoader(false);
    }
  };
  const allergy = selectedAllergies + selectedFoodAllergies;
  localStorage.setItem("servings", selectedServings);
  localStorage.setItem("allergy", allergy);
  localStorage.setItem("dislike", selecteddislike);
  localStorage.setItem("dietaryRestrictions", selecteddietaryRestrictions);
  localStorage.setItem("preferredmeal", selectedPreferredMeal);

  const servings = selectedServings;


  const generateAndSendPDF = async (email) => {
    setLoader(true);
    const allergy = selectedAllergies + selectedFoodAllergies;

    try {
      const generateResponse = await fetch(`${API_BASE_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferredMeal: selectedPreferredMeal,
          servings: servings,
          allergies: allergy,
          dislikes: selecteddislike,
          dietaryRestrictions: selecteddietaryRestrictions,
        }),
      });

      const generateData = await generateResponse.json();

      if (!generateResponse.ok || generateData.error) {
        throw new Error(generateData.error || "Failed to generate PDF.");
      }

      // Proceed if PDF generation is successful
      const pdfData = generatePDF(generateData);
      const ShoppingList = generateShoppingList(generateData);

      const sendResponse = await fetch(`${API_BASE_URL}/send-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          pdf: {
            mainPDF: pdfData, // First PDF (meal plan)
            ShoppingListPdf: ShoppingList, // Second PDF (shopping list)
          },
        }),
      });

      const sendData = await sendResponse.json();

      if (!sendResponse.ok || sendData.error) {
        throw new Error(sendData.error || "Failed to send PDF.");
      }

      alert("PDF generated and sent successfully!");
      setSelectedFoodAllergies([]);
      setSelecteddislike([]);
      setSelecteddietaryRestrictions([]);
      setSelectedServings("");
      setSelectedPreferredMeal("");

      setLoader(false);
    } catch (error) {}
  };

  const handleLogin = async () => {
    setLoader(true);
    setLoginError("");

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setIsLoggedIn(true);

      // Store the access token in localStorage
      localStorage.setItem("access_token", data.access_token);

      // Decode the token to get user information
      const decodedToken = jwtDecode(data.access_token);

      // Store user information
      localStorage.setItem(
        "user",
        JSON.stringify({
          user_id: decodedToken.user_id,
          name: data.name,
          email: data.email,
          is_admin: decodedToken.is_admin,
        })
      );

      setCurrentCardIndex(4);
      setIsSubscribed(data.isSubscribed || false);

      setTimeout(() => {
        // navigate('/subscribe');
      }, 1000);
    } catch (error) {
      setLoginError(`An error occurred: ${error.message}`);
    } finally {
      setLoader(false);
    }
  };

  // Add this function to check if the user is logged in
  const checkLoginStatus = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        setIsLoggedIn(true);
        // You might want to refresh the token here if it's close to expiring
      } else {
        // Token has expired, log the user out
        handleLogout();
      }
    }
  };

  // Call checkLoginStatus when your app initializes
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Add this function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    // Redirect to login page or home page
  };

  // Use this function to make authenticated requests
  const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, { ...options, headers });
    if (response.status === 401) {
      // Token has expired or is invalid
      handleLogout();
      throw new Error("Authentication failed");
    }
    return response;
  };

  // Button for generate pdf
  // const handleGeneratePDF = async () => {

  //   setLoader(true);

  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (!user || !user.email) {
  //     console.error("User email not found in localStorage");
  //     alert("User email not found. Please log in again.");
  //     setLoader(false);
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${API_BASE_URL}/check-subscription`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email: user.email }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(
  //         errorData.error || "Failed to check subscription status"
  //       );
  //     }

  //     const result = await response.json();

  //     if (result.isSubscribed && result.canGeneratePDF) {
  //       setIsSubscribed(true);
  //       await generateAndSendPDF(user.email);
  //     } else if (result.isSubscribed && !result.canGeneratePDF) {
  //       alert("You have already generated a PDF for this subscription period.");
  //     } else {
  //       navigate("/payment");
  //     }
  //   } catch (error) {
  //     console.error("Error checking subscription status:", error);
  //     alert(
  //       "An error occurred while checking subscription status. Please try again."
  //     );
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  const handleGeneratePDF = async () => {
    setLoader(true);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.email) {
      // console.error("User email not found in localStorage");
      alert("Please log in again.");
      setLoader(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/check-subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      let attempt = 0;
      if (response.status === 500 && attempt < 3) {
        // Retry logic
        console.warn(`Attempt ${attempt} failed. Retrying...`);
        return await handleGeneratePDF(attempt + 1); // Call itself with an incremented attempt
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to check subscription status"
        );
      }

      const result = await response.json();

      if (result.isSubscribed && result.canGeneratePDF) {
        setIsSubscribed(true);
        await generateAndSendPDF(user.email);
        setCurrentCardIndex(0);
      } else if (result.isSubscribed && !result.canGeneratePDF) {
        alert("You have already generated a PDF for this subscription period.");
      } else {
        navigate("/payment");
      }
    } catch (error) {
      if (error)
        // console.error("Error checking subscription status:", error);
        alert(
          "An error occurred while checking subscription status. Please try again."
        );
    } finally {
      setLoader(false);
    }
  };
  // Generate PDf and send to mail

  // Save PDf to local Storage
  const savePDFToLocalStorage = (pdfData) => {
    try {
      const pdfList = JSON.parse(localStorage.getItem("pdfList")) || [];
      const currentDate = new Date();
      const newPDF = {
        id: Date.now(),
        name: `MealPlan_${currentDate.toISOString()}.pdf`,
        data: pdfData,
        generatedDate: currentDate.toISOString(),
      };

      // Limit to storing only the last 5 PDFs
      if (pdfList.length >= 5) {
        pdfList.shift(); // Remove the oldest PDF
      }

      pdfList.push(newPDF);
      localStorage.setItem("pdfList", JSON.stringify(pdfList));
    } catch (error) {
      // console.error("Error saving PDF to localStorage:", error);
      // Handle the error (e.g., show a message to the user)
    }
  };

  const generateShoppingList = (mealPlanData) => {
    const doc = new jsPDF();

    // Parse the meal plan data and extract ingredients for both Main Dish and Side Dish
    const ingredientsData = parseMealPlanData(mealPlanData.meal_plan);

    const categorizedIngredients = ingredientsData.flatMap((dayRow) =>
      dayRow.slice(1).flatMap((meal) => {
        const ingredientsSection = meal.match(
          /Ingredients:\n([\s\S]*?)(?=\n\nInstructions:|$)/
        );
        const ingredients = ingredientsSection
          ? ingredientsSection[1].trim().split("\n")
          : [];

        let currentCategory = "mainDish";
        const mainDishIngredients = [];
        const sideDishIngredients = [];

        // Categorize ingredients as Main Dish or Side Dish
        ingredients.forEach((ingredient) => {
          if (ingredient.toLowerCase().includes("main dish:")) {
            currentCategory = "mainDish";
          } else if (ingredient.toLowerCase().includes("side dish:")) {
            currentCategory = "sideDish";
          } else if (ingredient.trim() !== "") {
            if (currentCategory === "mainDish") {
              mainDishIngredients.push(ingredient.trim());
            } else {
              sideDishIngredients.push(ingredient.trim());
            }
          }
        });

        return {
          mainDish: mainDishIngredients,
          sideDish: sideDishIngredients,
        };
      })
    );

    // Function to clean up and format ingredients
    const formatIngredients = (ingredients) => {
      return ingredients
        .map((item) => {
          // Remove any existing numbering at the start
          const cleanItem = item.replace(/^\d+\.\s*/, "").trim();
          return cleanItem;
        })
        .filter((item, index, self) => self.indexOf(item) === index) // Remove duplicates
        .map((item, index) => `${index + 1}. ${item}`) // Add clean numbering
        .join("\n");
    };

    // Combine all main dish and side dish ingredients
    const allMainDishIngredients = categorizedIngredients.flatMap(
      (cat) => cat.mainDish
    );
    const allSideDishIngredients = categorizedIngredients.flatMap(
      (cat) => cat.sideDish
    );

    // Format the ingredients
    const formattedMainDish = formatIngredients(allMainDishIngredients);
    const formattedSideDish = formatIngredients(allSideDishIngredients);

    // Structure the table body (now just one row with two cells)
    const tableBody = [[formattedMainDish, formattedSideDish]];

    doc.setFontSize(20);
    doc.text("Shopping List", 105, 18, null, null, "center");
    doc.addImage(Logo, "PNG", 160, 8, 40, 10);

    // Define the column headers for the table
    const headers = [["Main Dish", "Side Dish"]];

    // Create the table with two columns (Main Dish and Side Dish)
    doc.autoTable({
      head: headers,
      body: tableBody,
      startY: 25,
      theme: "grid",
      headStyles: {
        fillColor: [115, 128, 101],
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: "bold",
        valign: "middle",
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: (doc.internal.pageSize.width - 40) / 2 }, // Main Dish column
        1: { cellWidth: (doc.internal.pageSize.width - 40) / 2 }, // Side Dish column
      },
      styles: {
        fontSize: 10,
        cellPadding: 5,
      },
      didParseCell: function (data) {
        if (data.section === "body") {
          data.cell.styles.cellPadding = 2;
          data.cell.styles.valign = "top";
        }
      },
    });

    // Save and return the PDF
    doc.setFontSize(10);
    doc.text(``, 14, doc.lastAutoTable.finalY + 10);

    const pdfData = doc.output("datauristring");
    savePDFToLocalStorage(pdfData);
    doc.save("ShoppingList.pdf");
    return pdfData;
  };

  const generatePDF = (mealPlanData) => {
    const doc = new jsPDF();

    const tableData = parseMealPlanData(mealPlanData.meal_plan);

    // Determine the number of meals (columns) from the first row of data
    const numberOfMeals = tableData[0] ? tableData[0].length - 1 : 0;

    doc.setFontSize(20);
    doc.text("Meal Plan", 105, 18, null, null, "center");
    doc.addImage(Logo, "PNG", 160, 8, 40, 10);

    // Create headers dynamically based on the number of meals
    const headers = [
      "Day",
      ...Array(numberOfMeals)
        .fill(0)
        .map((_, i) => `Meal ${i + 1}`),
    ];

    // Calculate column widths
    const pageWidth = doc.internal.pageSize.width;
    const margins = 20; // Left and right margins
    const dayColumnWidth = 20;
    const mealColumnWidth =
      (pageWidth - margins - dayColumnWidth) / numberOfMeals;

    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 25,
      theme: "grid",
      headStyles: {
        fillColor: [115, 128, 101],
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: "bold",
        valign: "middle",
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: dayColumnWidth },
        ...Object.fromEntries(
          Array(numberOfMeals)
            .fill(0)
            .map((_, i) => [i + 1, { cellWidth: mealColumnWidth }])
        ),
      },
      styles: {
        fontSize: 10,
        cellPadding: 5,
      },
      didParseCell: function (data) {
        if (data.section === "body" && data.column.index === 0) {
          data.cell.styles.fontStyle = "bold";
        }
      },
    });

    doc.setFontSize(10);
    doc.text(``, 14, doc.lastAutoTable.finalY + 10);

    const pdfData = doc.output("datauristring");
    savePDFToLocalStorage(pdfData);
    doc.save("MealPlan.pdf");
    return pdfData;
  };

  // const generatePDF = (mealPlanData) => {
  //   const doc = new jsPDF();

  //   const tableData = parseMealPlanData(mealPlanData.meal_plan);

  //   doc.setFontSize(20);
  //   doc.text("Meal Plan", 105, 15, null, null, "center");
  //   doc.addImage(Logo, "PNG", 160, 8, 40, 10);

  //   doc.autoTable({
  //     head: [["Day","Meals", "Ingredients", "Instructions"]],
  //     body: tableData,
  //     startY: 25,
  //     theme: "grid",
  //     headStyles: {
  //       fillColor: [115, 128, 101],
  //       textColor: [255, 255, 255],
  //       fontSize: 12,
  //       fontStyle: "bold",
  //       valign: "middle",
  //       halign: "center",
  //     },
  //     columnStyles: {
  //       0: { cellWidth: 22 },
  //       1: { cellWidth: 56 },
  //       2: { cellWidth: 57 },
  //       3: { cellWidth: 57 },
  //     },
  //     styles: {
  //       fontSize: 10,
  //       cellPadding: 5,
  //     },
  //     didParseCell: function (data) {
  //       if (data.section === "body" && data.column.index === 0) {
  //         data.cell.styles.fontStyle = "bold";
  //       }
  //       if (data.section === "body" && data.column.index === 1) {
  //         const mealText = data.cell.raw;
  //         const formattedText = mealText.split('\n').map(line => {
  //           if (line.match(/^(Meal \d+|Main Dish:|Side Dish:|Prep:|Cook:|Total:|Nutritional Information)/) ||
  //               line.match(/^\$([\d,.]+)/)) {
  //             return { text: line, styles: { fontStyle: 'bold' } }; // Use uppercase as a substitute for bold
  //           }
  //           return line;
  //         }).join('\n');
  //         data.cell.text = formattedText;
  //       }
  //     },
  //   });

  //   doc.setFontSize(10);
  //   doc.text(
  //     `Total Servings: ${mealPlanData.servings} per meal.`,
  //     14,
  //     doc.lastAutoTable.finalY + 10
  //   );

  //   const pdfData = doc.output("datauristring");
  //   savePDFToLocalStorage(pdfData);
  //   doc.save("MealPlan.pdf");
  //   return pdfData;
  // };

  // click to next

  const handleNext = () => {
    // Check if a selection has been made
    const isSelectionMade = () => {
      switch (currentCardIndex) {
        case 0:
          return selecteddietaryRestrictions.length > 0;
        case 1:
          return selectedServings.length > 0;

        default:
          return true; // For cards that don't require selection
      }
    };

    if (!isSelectionMade()) {
      // Alert the user or handle the case where no selection is made
      // alert("Please make a selection before proceeding.");
      return;
    }

    // Existing logic for moving to the next card
    // if (currentCardIndex === 2) {
    //   setCurrentCardIndex(4); // Redirect from index 2 to index 4
    // } else if (currentCardIndex < cards.length - 1) {
    // }
    setCurrentCardIndex(currentCardIndex + 1);
  };

  // click to back
  const handleBack = () => {
    // if (currentCardIndex === 4) {
    //   setCurrentCardIndex(2); // Redirect from index 4 to index 2
    // } else if (currentCardIndex > 0) {
    // }
    setCurrentCardIndex(currentCardIndex - 1);
  };

  // const handleDivClick = (name, value) => {
  //   setSelectedOption((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleRadioChange = (event) => {
    let { name, value } = event.target;
    if (name === "preferredMeal") {
      setSelectedPreferredMeal((prevSelected) => {
        // If the selected value is already chosen, deselect it
        if (prevSelected === value) {
          return ""; // Deselect the current value
        } else {
          return value; // Set the new value as the selected one
        }
      });
    } else if (name === "servings") {
      setSelectedServings((prevSelected) =>
        prevSelected === value ? "" : value
      );
    } else if (name === "FoodAllergies") {
      setSelectedFoodAllergies((prevSelected) => {
        if (prevSelected.includes(value)) {
          return prevSelected.filter((item) => item !== value);
        } else {
          return [...prevSelected, value];
        }
      });
    } else if (name === "dislike") {
      setSelecteddislike((prevSelected) => {
        if (prevSelected.includes(value)) {
          return prevSelected.filter((item) => item !== value);
        } else {
          return [...prevSelected, value];
        }
      });
    } else if (name === "dietaryRestrictions") {
      setdietrypopup((prevSelected) => (prevSelected === value ? "" : value));
      setSelecteddietaryRestrictions((prevSelected) =>
        prevSelected === value ? "" : value
      );
    }
  };

  // rendering elements in the card
  const renderElement = (element, index) => {
    switch (element.type) {
      case "radio":
        const isChecked =
          element.name === "FoodAllergies"
            ? selectedFoodAllergies.includes(element.label)
            : element.name === "dislike"
            ? selecteddislike.includes(element.label)
            : element.name === "preferredMeal"
            ? selectedPreferredMeal.includes(element.label)
            : element.name === "dietaryRestrictions"
            ? selecteddietaryRestrictions.includes(element.label)
            : element.name === "servings"
            ? selectedServings === element.label
            : false;

        return (
          <div>
            <div
              key={index}
              className={`radio-div relative flex rounded-md group items-center cursor-pointer border-[1px] border-S-Orange text-white flex-col justify-center h-36 w-36 ${
                isChecked ? "selected" : ""
              }`}
              onClick={() =>
                handleRadioChange({
                  target: {
                    name: element.name,
                    value: element.label,
                    info: element.info,
                  },
                })
              }
            >
              <div className="border-[1px] h-7 w-7 flex items-center justify-center rounded-full backdrop-blur-lg absolute -top-2 -right-2">
                <div className="w-[14px] rounded-full h-[1px] bg-white"></div>
              </div>
              <img
                src={arrow}
                className="mb-2 text-white absolute top-2 select-none hidden group-hover:block"
                alt=""
              />
              {element.image && (
                <img
                  className=" mb-2 w-10 select-none"
                  src={element.image}
                  alt={element.label}
                />
              )}
              <span className="text-white text-md select-none text-center px-2">
                {element.label}
              </span>
              {isChecked && (
                <div className="absolute h-7 w-7 flex z-40 items-center justify-center select-none  bg-[#32B200] rounded-full  -top-2 -right-2">
                  <img
                    src={tickIcon}
                    alt="Selected"
                    className="tick-icon select-none "
                  />
                </div>
              )}
              {/* <div className="hidden group-active:block sm:group-hover:block z-50 absolute top-0 left-0 sm:top-[50%] sm:left-[70%] backdrop-blur-xl rounded-md select-none max-w-[14rem]">
                <p
                  className="select-none"
                  dangerouslySetInnerHTML={{ __html: element.info }}
                />
              </div> */}
            </div>
          </div>
        );

      case "text":
      case "email":
      case "tel":
      case "password":
        const value =
          currentCardIndex === 5
            ? card6Values[element.placeholder]
            : card7Values[element.placeholder];
        const handleChange =
          currentCardIndex === 5 ? handleCard6Change : handleCard7Change;
        return (
          <div key={index} className="formElement  ">
            <input
              type={element.type}
              placeholder={element.placeholder}
              value={value}
              onChange={handleChange}
              className="border-2 border-white py-2   px-2 bg-transparent rounded-lg p-2 w-[19rem]   sm:w-[32rem]  placeholder-white text-white "
            />
          </div>
        );
      default:
        return null;
    }
  };
  // rendering section in the card
  const renderSection = (section, index) => (
    <div
      key={index}
      className={`section  ${
        currentCard.title === "How Many Servings Do You Need?" && index === 0
          ? "column"
          : ""
      }`}
    >
      {/* <h5 className="text-P-Green1 font-bold text-xl">{section.heading}</h5> */}
      {section.description && (
        <p className="text-Text2 "> {section.description}</p>
      )}
      {section.type === "radio" && renderElement(section, index)}
    </div>
  );

  const currentCard = cards[currentCardIndex];

  // card code...

  return (
    <div
      className="w-[100vw] min-h-[834px] flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: `url(${cardbgimg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {loader && (
        <div className="">
          <img src={Loader} alt="" className="" />
        </div>
      )}

      {!loader && (
        <div className="relative container max-w-[32rem] capitalize ">
          <h4 className="text-2xl border-b-8 border-S-Orange leading-none font-bold inline-block text-white">
            {currentCard.subtitle}
          </h4>
          <h2 className="font-bold text-3xl text-white">{currentCard.title}</h2>
          <p className="cardp text-white text-lg mt-4 ">
            {currentCard.description}
          </p>

          {/* ---------------popup info */}
          {cards[0].elements[0].label === dietrypopup && (
            <div
              ref={popupRef}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-blur-xl rounded-md select-none max-w-[20rem] w-full max-h-[20rem] h-full overflow-y-scroll p-2 text-white scroll-smooth"
            >
              <div className="p-2">
                <b>Low-Carb Diet - Benefits:</b>
                <ul className="list-disc ml-5">
                  <li>
                    May improve metabolic health by reducing insulin levels,
                    helping the body burn fat more efficiently.
                  </li>
                  <li>
                    Often leads to improvements in significant cardiovascular
                    risk factors, such as decreasing triglycerides and
                    increasing HDL cholesterol levels.
                  </li>
                  <li>
                    Beneficial for managing diabetes and reducing insulin
                    resistance.
                  </li>
                </ul>
                <br />
                <b>Diet Considerations:</b>
                <ul className="list-disc ml-5">
                  <li>
                    Some individuals might experience a temporary decrease in
                    energy as the body adjusts to fewer carbohydrates.
                  </li>
                  <li>
                    Ensures sufficient intake of essential nutrients through
                    carefully selected low-carb vegetables and foods.
                  </li>
                </ul>
              </div>
            </div>
          )}
          {cards[0].elements[4].label === dietrypopup && (
            <div
              ref={popupRef}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-blur-xl rounded-md select-none max-w-[20rem] w-full max-h-[20rem] h-full overflow-y-scroll p-2 text-white scroll-smooth"
            >
              <div className="p-2 ">
                <b>Vegetarian Diet</b>
                <br />
                <b>Benefits:</b>
                <ul className="list-disc ml-5">
                  <li>
                    Lower levels of cholesterol, lower blood pressure, and
                    reduced risk of heart disease.
                  </li>
                  <li>
                    Some studies show a lower risk of certain types of cancer.
                  </li>
                  <li>
                    Generally lower in calories, helping to manage or reduce
                    weight.
                  </li>
                </ul>
                <br />
                <b>Considerations:</b>
                <ul className="list-disc ml-5">
                  <li>
                    If not carefully managed, can lead to insufficient protein
                    intake.
                  </li>
                  <li>
                    Lack of meat increases the risk of deficiencies in these
                    nutrients.
                  </li>
                  <li>
                    Some vegetarian diets can be high in carbohydrates, which
                    might not suit everyone's health goals.
                  </li>
                </ul>
              </div>
            </div>
          )}
          {cards[0].elements[2].label === dietrypopup && (
            <div
              ref={popupRef}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-blur-xl rounded-md select-none max-w-[20rem] w-full max-h-[20rem] h-full overflow-y-scroll p-2 text-white scroll-smooth"
            >
              <div className="p-2 ">
                <b>Carnivore Diet</b>
                <br />
                <b>Benefits:</b>
                <ul className="list-disc ml-5">
                  <li>
                    Focuses primarily on animal-based foods, which streamlines
                    dietary choices.
                  </li>
                  <li>
                    Some people report improvements in autoimmune symptoms.
                  </li>
                  <li>
                    High protein and fat content can naturally help control
                    appetite and reduce calorie intake.
                  </li>
                </ul>
                <br />
                <b>Considerations:</b>
                <ul className="list-disc ml-5">
                  <li>
                    Completely excludes plant-based foods, potentially leading
                    to digestive issues such as constipation.
                  </li>
                  <li>
                    May result in deficiencies in certain vitamins and
                    antioxidants found predominantly in plant foods.
                  </li>
                </ul>
              </div>
            </div>
          )}
          {cards[0].elements[3].label === dietrypopup && (
            <div
              ref={popupRef}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-50 backdrop-blur-xl rounded-md select-none max-w-[20rem] w-full max-h-[20rem] h-full overflow-y-scroll p-2 text-white scroll-smooth"
            >
              <div className="p-2 ">
                <b>Paleo Diet</b>
                <br />
                <b>Benefits:</b>
                <ul className="list-disc ml-5">
                  <li>
                    Focuses on consuming whole, unprocessed foods, which can
                    enhance overall health.
                  </li>
                  <li>
                    High fibre intake from fruits and vegetables supports a
                    healthy digestive system.
                  </li>
                  <li>
                    Free from dairy, grains, and processed foods, benefiting
                    those with specific food sensitivities.
                  </li>
                </ul>
                <br />
                <b>Considerations:</b>
                <ul className="list-disc ml-5">
                  <li>
                    Excludes grains and dairy, which can lead to potential gaps
                    in calcium and other nutrients if not properly managed.
                  </li>
                  <li>
                    Sometimes requires more specialized ingredients which can be
                    more expensive and less accessible.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* ----------------- */}

          <div className="w-full mt-4 flex">
            <div className=" ">
              {currentCard.section1 && (
                <div className="flex flex-wrap gap-7">
                  {currentCard.section1.map((section, index) =>
                    renderSection(section, index)
                  )}
                </div>
              )}
              {currentCard.section2 && currentCard.section2.map(renderSection)}
            </div>
            {currentCard.elements && (
              <div className="flex flex-wrap gap-7  ">
                {currentCard.elements.map((element, index) =>
                  renderElement(element, index)
                )}

                {/* {currentCardIndex === 4 && (
                  <>
                    <div className=" relative select-none flex rounded-md  group items-center cursor-pointer border-[1px] border-S-Orange text-white flex-col justify-center h-36 w-36 ">
                      <img src={plus} alt="" />
                      <p className="select-none">Add</p>
                      
                    </div>
                  </>
                )} */}
                {currentCardIndex === 3 && (
                  <div className="relative">
                    <div
                      onClick={() => setIspopupOpen3(true)}
                      className="relative select-none flex rounded-md group items-center cursor-pointer border-[1px] border-S-Orange text-white flex-col justify-center h-36 w-36"
                    >
                      {selectedPreferredMeal === "Recomended (2000 - 2500 calories)" ? "" : selectedPreferredMeal  && (
                          <div className="absolute h-7 w-7 flex z-40 items-center justify-center select-none  bg-[#32B200] rounded-full  -top-2 -right-2">
                          <img
                            src={tickIcon}
                            alt="Selected"
                            className="tick-icon select-none "
                          />
                        </div>
                      )}
                      
                   
                      <img src={plus} alt="" />
                      <p className="select-none">Add</p>
                      {!selectedPreferredMeal || selectedPreferredMeal === "Recomended (2000 - 2500 calories)" ? "": `${selectedPreferredMeal} calories`}



                    </div>

                    {ispopupOpen3 && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                          <h2 className="text-xl font-bold mb-4 text-gray-800">
                            Enter a Number
                          </h2>

                          <div className="mt-4">
                            <label
                              htmlFor="numberInput"
                              className="block text-gray-700"
                            >
                              Number:
                            </label>
                            <input
                              type="text"
                              id="numberInput"
                              value={selectedPreferredMeal}
                              onChange={handleInputChange}
                              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Text1"
                              placeholder="Enter a number"
                            />
                          </div>

                          <div className="mt-4 flex justify-end space-x-2">
                            <button
                              onClick={() => setIspopupOpen3(false)}
                              className="py-2 mt-4 select-none px-10 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {currentCardIndex === 1 && (
                  <div className="relative">
                    <div
                      onClick={() => setIspopupOpen(true)}
                      className="relative select-none flex rounded-md group items-center cursor-pointer border-[1px] border-S-Orange text-white flex-col justify-center h-36 w-36"
                    >

                      {(selectedServings === "1 Serving" ||selectedServings === "2 Servings" ||selectedServings === "3 Servings" || selectedServings === "4 Servings" || selectedServings === "")   ? "": (
                        <>
                        
                        
                      <div className="absolute h-7 w-7 flex z-40 items-center justify-center select-none  bg-[#32B200] rounded-full  -top-2 -right-2">
                          <img
                            src={tickIcon}
                            alt="Selected"
                            className="tick-icon select-none "
                          />
                        </div>
                        </>
                      )}


                      <img src={plus} alt="" />
                      <p className="select-none">Add</p>
                      {(selectedServings === "1 Serving" ||selectedServings === "2 Servings" ||selectedServings === "3 Servings" || selectedServings === "4 Servings")   ? "": (
                        <>
                        
                        <p className="">
                          {selectedServings}
                          
                          <br />
                        </p>
                        </>
                      )}
                      {familyMembers > 1 && (
                        <>
                         <div className="absolute h-7 w-7 flex z-40 items-center justify-center select-none  bg-[#32B200] rounded-full  -top-2 -right-2">
                          <img
                            src={tickIcon}
                            alt="Selected"
                            className="tick-icon select-none "
                          />
                        </div>
                        <p>
                        {familyMembers} Members
                        </p>
                        </>
                      )}
                    </div>

                    {ispopupOpen && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                          <h2 className="text-xl font-bold mb-4 text-gray-800">
                            Select Your Options
                          </h2>

                          {/* Dropdown for servings */}
                          <div className="mt-4">
                            <label
                              htmlFor="servings"
                              className="block text-gray-700"
                            >
                              Servings:
                            </label>
                            <select
                              id="servings"
                              value={selectedServings.split(" ")[0] || ""}
                              onChange={(e) =>
                                setSelectedServings(
                                  e.target.value + " servings"
                                )
                              }
                              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Text1"
                            >
                              <option value="">Select servings</option>
                              {[5, 6].map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Dropdown for family members */}
                          <div className="mt-4">
                            <label
                              htmlFor="familyMembers"
                              className="block text-gray-700"
                            >
                              Family Members:
                            </label>
                            <select
                              id="familyMembers"
                              value={familyMembers}
                              onChange={(e) =>
                                setFamilyMembers(Number(e.target.value))
                              }
                              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Text1"
                            >
                              
                              {[...Array(19).keys()].map((num) => (
                                <option key={num} value={num + 2}>
                                  {num + 2}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="mt-4 flex justify-end space-x-2">
                            <button
                              onClick={() => setIspopupOpen(false)}
                              className="py-2 mt-4 select-none px-10 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* card index 2  */}
                {currentCardIndex === 2 && (
                  <>
                    <div className="relative">
                      <div
                        onClick={() => setIsOpen(true)}
                        className="relative select-none flex rounded-md group items-center cursor-pointer border-[1px] border-S-Orange text-white flex-col justify-center h-36 w-36"
                      >
                        <img src={plus} alt="" />
                        <p className="select-none">Add</p>
                        {selectedAllergies.length > 0 && (
                          <>
                           <div className="absolute h-7 w-7 flex z-40 items-center justify-center select-none  bg-[#32B200] rounded-full  -top-2 -right-2">
                          <img
                            src={tickIcon}
                            alt="Selected"
                            className="tick-icon select-none "
                          />
                        </div>
                          <p className="absolute bottom-2 text-sm">
                            {selectedAllergies.length} selected
                          </p>
                          </>
                        )}
                      </div>

                      {isOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                          <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">
                              Tell Us About Your Allergies
                            </h2>
                            <form onSubmit={handleSubmit}>
                              <input
                                type="text"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Text1"
                                placeholder="Enter Allergies"
                              />
                              <button
                                type="submit"
                                className="py-2 mt-4 select-none px-10 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                              >
                                Add Item
                              </button>
                            </form>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {selectedAllergies.map((item, index) => (
                                <div
                                  key={index}
                                  className="bg-gray-100 rounded-md p-2 flex items-center"
                                >
                                  <span>{item}</span>
                                  <button
                                    onClick={() => handleDelete(index)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                              <button
                                onClick={handleDone}
                                className="py-2 mt-4 select-none px-10 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="buttonContainer1">
            {currentCardIndex === 0 && (
              <button
                className="py-2 mt-4 select-none px-10 w-[100px] sm:w-[200px] box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                onClick={handleNext}
              >
                Next
              </button>
            )}

            {currentCardIndex > 0 && currentCardIndex < 4 && (
              <>
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    className="py-2 px-10 select-none w-[100px] sm:w-[200px] box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                  <button
                    className="py-1 sm:py-2 px-4 sm:px-12 w-[100px] sm:w-[200px] select-none box-border rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white  hover:cursor-pointer text-white font-roboto font-medium text-base"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                </div>
              </>
            )}
            {currentCardIndex === 4 &&
              (isLoggedIn ? (
                <>
                  <div className="flex gap-2 flex-wrap  w-fit items-center mt-4">
                    <button
                      className="py-2 select-none  px-10 w-[100px] sm:w-[200px] box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                      onClick={handleGeneratePDF}
                    >
                      Generate PDF
                    </button>
                    <button
                      className="py-1 sm:py-2 px-4 sm:px-12 w-[100px] sm:w-[200px] select-none box-border rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white  hover:cursor-pointer text-white font-roboto font-medium text-base"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      className="py-2 px-10 select-none w-[100px] sm:w-[200px] box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                    <button
                      className="py-2 px-4 sm:px-12 select-none w-[100px] sm:w-[200px] box-border rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white hover:cursor-pointer text-white font-roboto font-medium text-base"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  </div>
                </>
              ))}

            {currentCardIndex === 5 && (
              <>
                <div className="flex flex-col flex-wrap mt-4 gap-2 ">
                  {eror && <p className="text-red-500 ">{eror}</p>}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      className=" py-2 px-10 select-none w-[100px] sm:w-[200px] box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                      onClick={handleSignUp}
                    >
                      Sign&nbsp;Up
                    </button>
                    <button
                      className="py-[1px] sm:py-2 px-4 sm:px-12 w-[100px] sm:w-[200px] select-none box-border rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white  hover:cursor-pointer text-white font-roboto font-medium text-base"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-white">Already Have an Account?</p>{" "}
                    <p
                      onClick={() => navigate("/login")}
                      className="text-blue-300 hover:cursor-pointer select-none"
                    >
                      Login
                    </p>
                  </div>
                </div>
              </>
            )}

            {currentCardIndex === 6 && !isLoggedIn && ""}
            {currentCardIndex === 6 && !isLoggedIn && (
              <div className="flex flex-wrap  mt-4 gap-2 justify-between ">
                <a className="text-white  order-2 " href="/">
                  Forgot password?
                </a>
                <button
                  className="py-2 order-1 px-12 w-[100px] sm:w-[200px] box-border select-none rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white  hover:cursor-pointer text-white font-roboto font-medium text-base"
                  onClick={() => handleLogin()}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardNavigator;
