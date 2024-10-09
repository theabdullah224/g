import React from 'react'








const cards = [
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
          label: "Tufo",
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
      //card 3
      subtitle: "Discover",
      title: "Choose Your Preferred/Popular Meal Plan",
      description: "Tell us about the food you dislike",
  
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
      ],
    },
  
    {
      //card 3
      subtitle: "Discover",
      title: "Choose Your Preferred Meal Plan",
      description: "Tell us about your food preferences and dislikes.",
  
      // image: "image1.jpg",
      elements: [
        // { type: "radio", name: "preferredMeal", label: "Vegetarian",image:{} },
        {
          type: "radio",
          name: "preferredMeal",
          label: "Gluten-free",
          image: glotenfree,
          info: "",
        },
        {
          type: "radio",
          name: "preferredMeal",
          label: "Dairy-free",
          image: diaryfree,
          info: "",
        },
      ],
    },
    
    {
      //card 4
      subtitle: "Choose",
      title: "How Many Servings Do You Need?",
      description: "Select the number of servings you need per meal.",
  
      // image: "image1.jpg",
      section1: [
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
      //card 6
      subtitle: "Details",
      title: "Please Fill Out the Form Below",
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





function data() {
  return (
    <div>
      
    </div>
  )
}

export default data
