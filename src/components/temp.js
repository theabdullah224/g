import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, onClick, variant = 'primary' }) => {
  const baseClasses = "px-4 py-2 rounded-md font-semibold transition-colors duration-200";
  const variantClasses = {
    primary: "py-1 px-6 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-xs  sm:text-base",
    secondary: "py-1 px-7 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-xs  sm:text-base",
    danger: "py-1 px-7 rounded-lg flex items-center justify-center bg-transparent text-Text1 border-2 border-Text1 hover:bg-gray-100 font-roboto font-medium text-xs sm:text-base box-border",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Card = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-6 border">
    <h2 className="text-base sm:text-xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const ManageSubscriptionPage = () => {
  const [currentPlan, setCurrentPlan] = useState('Pro');
  const [nextBillingDate, setNextBillingDate] = useState('2024-11-15');
  const [cardDetails, setCardDetails] = useState({
    number: '**** **** **** 1234',
    expiry: '12/25',
    name: 'John Doe',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setemail] = useState('')
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const a =  localStorage.getItem('userdata')
  useEffect(() => {
    // Check localStorage for the "user" object
    const user = localStorage.getItem("user");
    const userdata = localStorage.getItem('userdata')
    if(userdata){
      const parsedata = JSON.parse(userdata)
      setUserData(parsedata)
      // setUserData(response.data);
      // console.log(userData.name)
   
     
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

  const handleCancelPlan = async () => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'));

    setemail(user.email)
    setLoading(true);
    try {
      const response = await axios.post('https://meeel.xyz/cancel-plan', { email: user.email });
      setMessage(response.data.message);
      
      setTimeout(() => {
        setMessage("");
        
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred while canceling the plan.');
    } finally {
      setLoading(false);
      window.location.reload()
    }
  };

  const handleDeleteCard = async () => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'));
    setLoading(true);
    try {
      const response = await axios.post('https://meeel.xyz/delete-card', { email: user.email });
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage("");
        
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred while deleting the card.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCard = async () => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'));

  try {
    const response = await fetch('https://meeel.xyz/update-card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email }),
    });

    const data = await response.json();

    if (response.ok) {
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } else {
      // Handle different error cases
      if (response.status === 404) {
        setMessage('User not found. Please try logging in again.');
        setTimeout(() => {
          setMessage("");
          
        }, 3000);
      } else if (response.status === 400 && data.error.includes('No card found')) {
        setMessage('No card found. Please subscribe to a plan first.');
        setTimeout(() => {
          setMessage("");
          
        }, 3000);
      } else {
        setMessage(data.error || 'An error occurred while updating the card.');
        setTimeout(() => {
          setMessage("");
          
        }, 3000);
      }
    }
  } catch (error) {
    // console.error('Error updating card:', error);
    setMessage('Failed to connect to the server. Please try again later.');
    setTimeout(() => {
      setMessage("");
      
    }, 3000);
  } finally{
    setLoading(false)
    
  }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-lg sm:text-3xl font-bold mb-6">Manage Your Subscription</h1>
      {message && (
                <p className="text-white bg-black bg-opacity-50 p-2 rounded">{message}</p>
              )}
      <Card title="Current Subscription">
        <p className="mb-2"><strong>Plan:  </strong> 
        {
                    !isLoggedIn ? ' Not available' :
                    userData?.subscription_status === "inactive" ? ' No plan, please subscribe!' :
                    userData?.subscription_status === "pro" ? " Starter" :
                    userData?.subscription_status === "ultra_pro" ? " Premium" :
                    'No plan, please subscribe!'
                }
        </p>
        <p className="mb-4"><strong>Next billing date:  </strong> 
        {userData?.subscription_end_date ? new Date(userData.subscription_end_date).toLocaleDateString('en-GB') : 'Not available'}
        </p>
        <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-0  sm:space-x-4">
        <Link to="/payment">
          <Button variant="primary" >Upgrade&nbsp;Plan</Button>
        </Link>
                
          <Button  onClick={handleCancelPlan}  variant="danger">Cancel&nbsp;Plan</Button>
        
        </div>
      </Card>

      <Card title="Payment Method">
        <div className="mb-4">
          {/* <p><strong>Card Number:</strong> {cardDetails.number}</p>
          <p><strong>Expiry Date:</strong> {cardDetails.expiry}</p>
          <p><strong>Cardholder Name:</strong> {cardDetails.name}</p> */}
        </div>
        <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-0  sm:space-x-4">
       
          <Button  onClick={handleUpdateCard} variant="secondary">Update&nbsp;Card</Button>
       
       
          <Button  onClick={handleDeleteCard}  variant="danger">Delete&nbsp;Card</Button>
      
        </div>
      </Card>

      {/* <Card title="Billing History">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">2024-10-15</td>
              <td className="py-2">$29.99</td>
              <td className="py-2 text-green-500">Paid</td>
            </tr>
            <tr>
              <td className="py-2">2024-09-15</td>
              <td className="py-2">$29.99</td>
              <td className="py-2 text-green-500">Paid</td>
            </tr>
          </tbody>
        </table>
      </Card> */}
    </div>
  );
};

export default ManageSubscriptionPage;