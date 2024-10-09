import { useNavigate } from 'react-router-dom';
import Logo from "./Resource/logo2.png";
import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Ensure you have this package installed
import "jspdf-autotable"; // Ensure you have this package installed
import { X } from 'lucide-react';

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
    // console.log("PDF saved to localStorage");
  } catch (error) {
    // console.error("Error saving PDF to localStorage:", error);
    // Handle the error (e.g., show a message to the user)
  }
};
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

const generateShoppingList = (mealPlanData) => {
  const doc = new jsPDF();

  // Parse the meal plan data and extract ingredients for both Main Dish and Side Dish
  const ingredientsData = parseMealPlanData(mealPlanData.meal_plan);

  const categorizedIngredients = ingredientsData.flatMap(dayRow =>
    dayRow.slice(1).flatMap(meal => {
      const ingredientsSection = meal.match(/Ingredients:\n([\s\S]*?)(?=\n\nInstructions:|$)/);
      const ingredients = ingredientsSection ? ingredientsSection[1].trim().split("\n") : [];

      let currentCategory = 'mainDish';
      const mainDishIngredients = [];
      const sideDishIngredients = [];

      // Categorize ingredients as Main Dish or Side Dish
      ingredients.forEach(ingredient => {
        if (ingredient.toLowerCase().includes("main dish:")) {
          currentCategory = 'mainDish';
        } else if (ingredient.toLowerCase().includes("side dish:")) {
          currentCategory = 'sideDish';
        } else if (ingredient.trim() !== '') {
          if (currentCategory === 'mainDish') {
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
      .map(item => {
        // Remove any existing numbering at the start
        const cleanItem = item.replace(/^\d+\.\s*/, '').trim();
        return cleanItem;
      })
      .filter((item, index, self) => self.indexOf(item) === index) // Remove duplicates
      .map((item, index) => `${index + 1}. ${item}`) // Add clean numbering
      .join('\n');
  };

  // Combine all main dish and side dish ingredients
  const allMainDishIngredients = categorizedIngredients.flatMap(cat => cat.mainDish);
  const allSideDishIngredients = categorizedIngredients.flatMap(cat => cat.sideDish);

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
      if (data.section === 'body') {
        data.cell.styles.cellPadding = 2;
        data.cell.styles.valign = 'top';
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
const servings = localStorage.getItem('servings')
const allergys = localStorage.getItem('allergy')
const dislike = localStorage.getItem('dislike')
const dietaryRestrictions = localStorage.getItem('dietaryRestrictions')

const generateAndSendPDF = async (email) => {
 
  

  try {
    const generateResponse = await fetch(`https://meeel.xyz/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        preferredMeal: "nothing",
        servings: servings,
        allergies: allergys,
        dislikes: dislike,
        dietaryRestrictions: dietaryRestrictions,
      }),
    });

    const generateData = await generateResponse.json();

    if (!generateResponse.ok || generateData.error) {
      throw new Error(generateData.error || "Failed to generate PDF.");
    }

    // Proceed if PDF generation is successful
    const pdfData = generatePDF(generateData);
    const ShoppingList = generateShoppingList(generateData)
    
    const sendResponse = await fetch(`https://meeel.xyz/send-pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, 
        pdf: {
          mainPDF: pdfData,          // First PDF (meal plan)
          ShoppingListPdf: ShoppingList // Second PDF (shopping list)
        },
        message: "Welcome to our service! We hope you enjoy your meal plan." 

     }),
    });

    const sendData = await sendResponse.json();
    // console.log("PDF sending response:", sendData);

    if (!sendResponse.ok || sendData.error) {
      throw new Error(sendData.error || "Failed to send PDF.");
     
    }
    alert("PDF generated and sent successfully!");
     window.location.reload()
  } catch (error) {
   
  }
};

const Welcome = ({ closePopup }) => {
  const navigate = useNavigate();
  
  
  
  const handleRedirect = async () => {
    const user = localStorage.getItem('user')
    const parsedUser = JSON.parse(user);
  
    alert("You will receive an email with the PDFs in few mins.")
    navigate('/myaccount')
    
    await generateAndSendPDF(parsedUser.email)

  };



  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowCookieConsent(true);
    }
  }, []);



  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieConsent(false);
  };

  const handleRejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowCookieConsent(false);
  };
  return (
    <div className=" img min-h-screen relative z-[1000] flex items-center justify-center bg-transparent text-[#313131] overflow-hidden">
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#738065]">Welcome!</h1>
        <p className="text-lg mb-8 text-[#606060] text-center">
         To gb meals,
          We're excited to have you here. Explore our site and discover amazing content tailored just for you.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleRedirect}
            className="bg-[#F5A228] text-white font-bold py-2 px-6 rounded-full hover:bg-[#738065] transition duration-300 ease-in-out transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>
      {showCookieConsent && (
        <div className="fixed bottom-4 left-4 right-4 z-50">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 relative">
            <button 
              onClick={() => setShowCookieConsent(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-2">Cookie Consent</h2>
            <p className="mb-4 text-sm text-gray-600">
              We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleRejectCookies}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors text-sm"
              >
                Reject
              </button>
              <button
                onClick={handleAcceptCookies}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
