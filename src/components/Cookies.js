import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Header from './Header';
const CookieManager = () => {
  const [preferences, setPreferences] = useState({
    necessary: { enabled: true, description: "Essential for the website to function properly. These cookies ensure basic functionalities and security features of the website." },
    functional: { enabled: false, description: "Help to perform certain functionalities like sharing the content of the website on social media platforms, collect feedback, and other third-party features." },
    analytics: { enabled: false, description: "Understand how you use the website, which pages you visit and what links you click on. This helps us to improve our service." },
    advertising: { enabled: false, description: "Used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns." },
  });

  useEffect(() => {
    // Load saved preferences on component mount
    const savedPreferences = Cookies.get('cookiePreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handleToggle = (category) => {
    setPreferences(prev => ({
      ...prev,
      [category]: { ...prev[category], enabled: !prev[category].enabled }
    }));
  };

  const handleSave = () => {
    // Save preferences to a cookie
    Cookies.set('cookiePreferences', JSON.stringify(preferences), { expires: 365 });

    // Apply preferences (this is where you'd typically set or remove cookies based on preferences)
    Object.entries(preferences).forEach(([category, { enabled }]) => {
      if (enabled) {
        Cookies.set(`cookie_${category}`, 'true', { expires: 365 });
      } else {
        Cookies.remove(`cookie_${category}`);
      }
    });

    // Provide feedback to the user
    alert('Your cookie preferences have been saved.');
  };

  return (
    <>
    <Header/>
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Cookie Preferences</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">About Cookies</h2>
        <p className="text-gray-600 mb-4">
          Cookies are small pieces of data stored on your device to enhance your browsing experience.
          We use cookies to remember your preferences, analyze site usage, and assist in our marketing efforts. 
          You can customize your cookie preferences below.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Manage Cookie Preferences</h2>
        <div className="space-y-6">
          {Object.entries(preferences).map(([key, { enabled, description }]) => (
            <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="mb-2 sm:mb-0 sm:mr-4">
                <h3 className="text-lg font-medium capitalize">{key} Cookies</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={enabled}
                  onChange={() => handleToggle(key)}
                  disabled={key === 'necessary'}
                />
                <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent dark:peer-focus:ring-transparent rounded-full peer ${enabled ? 'peer-checked:bg-P-Green1' : ''} peer-disabled:bg-gray-400 peer-disabled:cursor-not-allowed after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}></div>
              </label>
            </div>
          ))}
        </div>
        <button 
          onClick={handleSave}
          className="py-1 px-7 mt-4 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
        >
          Save Preferences
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">More Information</h2>
        <p className="text-gray-600 mb-4">
          We use different types of cookies to optimize your experience on our website. You can consent to the use of such technologies by clicking on "Save Preferences". 
        </p>
       
      </div>
    </div>
    </>
  );
};

export default CookieManager;