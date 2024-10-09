import React, { useState } from 'react';
import Header from './Header';
import cardbgimg from "./Resource/bgcardimg.png";
import Loader from './Resource/spinner.svg';
import useStore from "./Store";
import axios from 'axios';

function SubscriptionManagement() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setemail] = useState('')

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
    <div>
      <Header />
      <div
        className="w-screen h-screen flex flex-col items-center justify-center p-6"
        style={{
          backgroundImage: `url(${cardbgimg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {loading ? (
          <img src={Loader} alt="Loading..." className="" />
        ) : (
          <>
            <div className='flex flex-col items-center gap-4'>
              <div className='flex gap-2'>
                <button
                  onClick={handleUpdateCard}
                  className="py-2 mx-auto md:mx-0 px-8 box-border rounded-lg flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all font-roboto font-medium text-base"
                >
                  Update Card
                </button>
                <button
                  onClick={handleDeleteCard}
                  className="py-2 mx-auto md:mx-0 px-8 box-border rounded-lg flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all font-roboto font-medium text-base"
                >
                  Delete Card
                </button>
                <button
                  onClick={handleCancelPlan}
                  className="py-2 mx-auto md:mx-0 px-8 box-border rounded-lg flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all font-roboto font-medium text-base"
                >
                  Cancel Plan
                </button>
              </div>
              {message && (
                <p className="text-white bg-black bg-opacity-50 p-2 rounded">{message}</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SubscriptionManagement;