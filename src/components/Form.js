import React, { useState } from 'react'; // Importing React and the useState hook
import Card from "./Card"; // Importing the Card component
import "./Form.css"; // Importing the CSS file for styling the form
import Loader from "./Svgloader"; // Importing the Loader component

function Form() {
  // State to manage loading status (true or false)
  const [loading, setLoading] = useState(false);

  return (
    <div className='relative h-fit flex flex-col items-center pt-4'>
      {/* Heading for the form section */}
      <h3 className='inline-block text-2xl border-b-8 text-Text1 border-S-Orange leading-none font-bold'>
        Choose Plan
      </h3>
      <h2 className='text-center text-Text2 mb-2 text-4xl 2xl:text-5xl font-bold'>
        Choose Your Plan Type
      </h2>
      
      {/* Conditional rendering: Show loader if loading is true */}
      {loading && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* Card component with the loading state passed as a prop */}
      <div className="relative">
        <Card setLoading={setLoading} />
      </div>
      
    </div>
  );
}

export default Form; // Exporting the Form component to be used in other parts of the application
