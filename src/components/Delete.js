import React, { useState } from 'react';
import Header from './Header';
import cardbgimg from "./Resource/bgcardimg.png";
import { useNavigate } from 'react-router-dom';
import Loader from './Resource/spinner.svg';
import useStore from "./Store";
import axios from 'axios';

function DeleteAccount() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
      setLoading(true);
      setError("");
      try {
          const response = await axios.post('https://meeel.xyz/initiate-delete-account', loginData);
          console.log(response); // Log the response

          // Store token in local storage
          localStorage.setItem('token', response.data.token);

          navigate('/DeleteConfirmation');
      } catch (err) {
          console.error(err); // Log the entire error
          setError(err.response?.data?.error || "An error occurred");
      } finally {
          setLoading(false);
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
          <img src={Loader} alt="Loading..." className="animate-spin" />
        ) : (
          <>
            <div className='flex flex-wrap mt-4 gap-2 flex-col items-start'>
              <h1 className='text-2xl border-b-8 border-S-Orange leading-none font-bold text-white'>Delete Account</h1>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className='border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 sm:w-[32rem] placeholder-white text-white'
                placeholder='Email Address'
              />
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className='border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 sm:w-[32rem] placeholder-white text-white'
                placeholder='Password'
              />
              {error && <p className="text-red-500 mt-2">{error}</p>} 
              <div className='flex flex-wrap w-full gap-2 justify-between '>
                <button
                  onClick={handleDelete}
                  className='py-2 px-12 w-[200px] box-border select-none rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white hover:cursor-pointer text-white font-roboto font-medium text-base'
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DeleteAccount;