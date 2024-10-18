import React, { useState } from "react"; // Importing React
import "./cta.css"; // Importing the stylesheet for this component
import { useNavigate } from "react-router-dom"; // Importing the useNavigate hook from react-router-dom for navigation

function Cta(props) {
  const navigate = useNavigate(); // Initializing the navigate function

  // Function to handle the "Contact Us" button click, navigates to the contact us page
  const handleContactUsClick = () => {
    navigate("/contactus");
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    

    try {
      const response = await fetch("https://meeel.xyz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="ctac">
      <div className="cta1c">
        <div className="citemc">

          <div className="flex gap-8 justify-start    flex-col xl:flex-row">
          <div>
            {/* Section heading */}
            <h3 className="inline-block text-xl border-b-8 border-S-Orange leading-none font-bold">
              Get in Touch
            </h3>
            {/* Title passed as a prop */}
            <h2 className="ctah2c text-2xl 2xl:text-5xl font-bold">
              {props.title}
            </h2>
            {/* Description passed as a prop */}
            <p className="ctapc text-lg">{props.description}</p>
            {/* Contact Us button with an onClick handler */}
            <button
              className=" py-2 px-10 rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
              onClick={handleContactUsClick}
            >
              Contact Us
            </button>
          </div>

          {/* <div>
            <div className=" lg:min-w-[32rem] mx-auto mt-10 ">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 w-full max-w-[20rem] sm:w-full placeholder-white text-white"
                  />
                </div>
                <div>
                 
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 w-full max-w-[20rem] sm:w-full placeholder-white text-white"
                  />
                </div>
                <div>
                 
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message..."
                    required
                    className="border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 w-full max-w-[20rem] sm:w-full placeholder-white text-white"
                  ></textarea>
                </div>
                <div className="w-full max-w-[20rem]">
                  <button
                    type="submit"
                    className="py-2 px-12 w-[100px] sm:w-[200px] box-border select-none rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white hover:cursor-pointer text-white font-roboto font-medium text-base float-left xl:float-right"
                  >
                    Submit
                  </button>
                </div>
              </form>
              {status && (
                <p className=" text-center text-xs  max-w-[6rem] text-white font-bold sm:float-left float-right">
                  {status}
                </p>
              )}
            </div>
          </div> */}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cta; // Exporting the Cta component as the default export
