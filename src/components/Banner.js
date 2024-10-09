// Importing React and necessary hooks for managing state and layout effects
import React, { useState, useLayoutEffect } from 'react';

// Importing images for the left and right arrow buttons and the slides
import leftarrow from './Resource/leftarrow.svg';
import rightarrow from './Resource/rightarrow.svg';
import slide1 from './Resource/adjusted without img 1.png';
import slide2 from './Resource/without img 2.png';
import slide3 from './Resource/without img 3.png';
import slide4 from './Resource/without img 4.png';

// Array containing the slides, each with a text message and an image
const slides = [
  {
    text: "If you are overweight, it's not your fault. You have been given wrong information about food",
    image: slide1
  },
  {
    text: "If you are overweight, it's not your fault. You have been given wrong information about food",
    image: slide2
  },
  {
    text: "If you are overweight, it's not your fault. You have been given wrong information about food",
    image: slide3
  },
  {
    text: "If you are overweight, it's not your fault. You have been given wrong information about food",
    image: slide4
  },
];

// Banner component that displays the slideshow
const Banner = () => {
  // State to keep track of the currently displayed slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // useLayoutEffect hook to automatically change slides every 5 seconds
  useLayoutEffect(() => {
    // Set up a timer that changes the slide every 5 seconds
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 40000);

    // Clean up the timer when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    // Main container for the banner with some styling applied
    <div className="h-fit w-screen px-4 sm:px-9 font-roboto bg-white">
      {/* Section for text content that appears above the slideshow on smaller screens */}
      <div className="sm:hidden block mb-6">
        <h2 className="text-2xl 2xl:text-5xl font-bold text-Text1 mb-6 mt-6">
          Transform <span className="text-P-Green1"> Your Health</span> with Our Meal Planner
        </h2>
        <h3 className="text-xl capitalize border-b-8 text-Text1 border-S-Orange leading-none font-bold inline-block">
          A meal planner for you
        </h3>
        <p className="text-lg mb-6 capitalize text-Text2">
          Discover the benefits of meal planning and enjoy delicious, nutritious meals every day.
        </p>
        {/* <button className="py-2 px-7 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base">
          Explore more meals
        </button> */}
      </div>
      
      {/* Slideshow container */}
      <div className="relative h-full rounded-3xl overflow-hidden">
        {/* Display the current slide image */}
        <img
          src={slides[currentSlide].image}
          alt=""
          className="rounded-lg w-full h-auto object-cover"
        />

        {/* Button to go to the previous slide */}
        <button
          onClick={prevSlide}
          className="absolute border-none left-4 xl:left-12 top-1/2 transform -translate-y-1/2 bg-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] rounded-full p-[2px] sm:p-2 transition-all duration-200"
        >
          <img src={leftarrow} alt="" className="w-2 sm:w-6" />
        </button>

        {/* Button to go to the next slide */}
        <button
          onClick={nextSlide}
          className="absolute right-4 xl:right-12 border-none top-1/2 transform -translate-y-1/2 bg-P-Green1 rounded-full p-[2px] sm:p-2 transition-all duration-200 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221]"
        >
          <img src={rightarrow} alt="" className="w-2 sm:w-6" />
        </button>
      </div>
    </div>
  );
};

// Exporting the Banner component so it can be used in other parts of the app
export default Banner;
