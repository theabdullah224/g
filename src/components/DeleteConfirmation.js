import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import cardbgimg from "./Resource/bgcardimg.png";
import Loader from './Resource/spinner.svg';
import useStore from "./Store";

function DeleteConfirmation() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem('token')

  const handleVerifyCode = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.post('https://meeel.xyz/confirm-delete-account', { verification_code: verificationCode }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem('user')
      alert("Account Deleted Successfuly")
      navigate('/'); // Redirect to home page after successful deletion
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <Header/>
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
            <div className='flex flex-wrap mt-4 gap-2 flex-col items-start'>
              <h1 className='text-2xl border-b-8 border-S-Orange leading-none font-bold text-white'>Delete Account</h1>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className='border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 sm:w-[32rem] placeholder-white text-white'
                placeholder='Enter Code'
              />
              {error && <p className="text-red-500">{error}</p>}
              <div className='flex flex-wrap w-full gap-2 justify-between'>
                <button
                  onClick={handleVerifyCode}
                  className='py-2 px-12 w-[200px] box-border select-none rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white hover:cursor-pointer hover:bg-red-600 transition-all  text-white font-roboto font-medium text-base'
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DeleteConfirmation;