import React, { useState } from 'react';
import { ENTERED } from 'react-transition-group/Transition';

const Input = ({ type, id, name, placeholder, value, onChange, required }) => (
  <input
    type={type}
    id={id}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    className="border-2 border-Text2 py-3 px-4 bg-transparent rounded-lg w-full placeholder-Text2 text-Text2 focus:outline-none focus:ring-2 focus:ring-transparent transition duration-300"
  />
);

const TextArea = ({ id, name, rows, value, onChange, placeholder, required }) => (
  <textarea
    id={id}
    name={name}
    rows={rows}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className="border-2 border-Text2 py-3 px-4 bg-transparent rounded-lg w-full placeholder-Text2 text-Text1 focus:outline-none focus:ring-2 focus:ring-transparent transition duration-300"
  />
);

const ContactUsPage = () => {
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
          if (error.includes("An error occurred while sending your message. Details")) {
            setStatus("An error occurred");
          }
          
          console.error("Error:", error);
          setStatus("An error occurred. Please try again later.");
        }
      };

  return (
    <div className="  flex items-center justify-center p-4">
      <div className="bg-white rounded-xl overflow-hidden max-w-4xl w-full">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <h1 className="text-xl sm:text-4xl font-bold text-Text1 mb-6">Get in Touch</h1>
            <p className="text-Text2 mb-8 text-sm sm:text-lg">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            <div className="space-y-4">
              <p className="flex items-center text-Text2 text-sm sm:text-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                15 Neptune Ct, Vanguard Way, Cardiff, CF24 5PJ
              </p>
              <p className="flex items-center text-Text2 text-sm sm:text-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                1800 123 4567
              </p>
              <p className="flex items-center text-Text2 text-sm sm:text-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                team@gbmeals.com
              </p>
            </div>
          </div>
          <div className="md:w-1/2 p-8">
            <form onSubmit={handleSubmit}   className="space-y-6">
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                
              />
              <Input
              
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextArea
              
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message..."
                required
              />
              <div className="flex items-center justify-between">
                <button
                
                  type="submit"
                  className="py-2 px-5 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                >
                  Send Message
                </button>
                {status && (
                  <p className="text-green-400 font-semibold">{status}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;