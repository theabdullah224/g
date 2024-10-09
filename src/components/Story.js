import React from "react";
import Navbar from "./Header.js";
import Footer from './Copyright.js';

function OurStory() {
  return (
    <div className="h-screen h-full">
      <Navbar />
      <div className="container px-9 py-4 h-full">
        {/* Our Story */}
        <h1 className="text-4xl 2xl:text-5xl text-Text1 font-bold">
          Our Story
        </h1>

        <h2 className="text-2xl font-semibold mt-8 text-Text1">
          My Journey to Health: A Story of Transformation
        </h2>

        <p className="text-lg text-Text2 mt-2">
          At 27 years old, I was sedentary, overweight, and deeply unhappy. My turning point came one day when I bent down to plug in a charger and pulled a muscle. It was a wake-up call—I realized I needed to make a change.
        </p>

        <p className="text-lg text-Text2 mt-2">
          I began my transformation journey by focusing on my eating habits. I swapped processed foods for fresh, wholesome meals, and the impact was immediate. As I continued to refine my diet, I started incorporating regular exercise and prioritizing good sleep. These changes were challenging, but each step forward brought me closer to feeling healthier and happier.
        </p>

        <p className="text-lg text-Text2 mt-2">
          Now, at 31, I’m in the best shape of my life. I feel great, both physically and mentally. Nutrition has been one of the main pillars of my journey, proving to me just how powerful food can be. It’s this experience that inspired the creation of gbmeals.
        </p>

        <h2 className="text-2xl font-semibold mt-8 text-Text1">
          The Problem
        </h2>
        <p className="text-lg text-Text2 mt-2">
          Today, many people face similar struggles. Our fast-paced society often leads to poor eating habits, lack of exercise, and inadequate sleep, contributing to widespread issues like obesity, diabetes, and heart disease. Additionally, the abundance of processed foods makes it hard for individuals to make healthy choices.
        </p>

        <h2 className="text-2xl font-semibold mt-8 text-Text1">
          Our Solution
        </h2>
        <p className="text-lg text-Text2 mt-2">
          At gbmeals, we are dedicated to addressing these societal problems. Our meal plans are designed to make healthy eating simple and accessible, empowering you to make informed dietary choices. By using the latest technology, we provide you with personalized meal plans that cater to your nutritional needs and preferences. Our goal is to make your life healthier, happier, and easier by offering a convenient solution to balanced, nutritious eating.
        </p>

        <h2 className="text-2xl font-semibold mt-8 text-Text1">
          Join Us
        </h2>
        <p className="text-lg text-Text2 mt-2">
          Join us at gbmeals and take the first step towards transforming your life, one meal at a time. Together, we can overcome the challenges of modern living and achieve optimal health.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default OurStory;
