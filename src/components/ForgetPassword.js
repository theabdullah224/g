import React, { useState } from "react";
import Header from "./Header";
import cardbgimg from "./Resource/bgcardimg.png";
import { useNavigate } from "react-router-dom";
import Loader from "./Resource/spinner.svg";
import axios from 'axios';

function ForgetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // New state for error message

  const handleSubmit = async () => {
    setLoading(true);
    setError(""); // Clear previous errors
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
    }

    try {
      const response = await axios.post('https://meeel.xyz/forgot-password', { email });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        // console.log("--------------->", localStorage.getItem('authToken'));
        navigate("/verification");
      }
    } catch (error) {
      if (error.message.includes('psycopg2.OperationalError') && error.message.includes('SSL connection has been closed unexpectedly')) {
        setError("Please rewrite your email without spacing Please Try Again!");
      }else{
        setError(error.message);
      }
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          setError(data.error || "Email is required");
        } else if (status === 404) {
          setError(data.error || "User not found. Please sign up first.");
        } else {
          setError(data.error || "An unexpected error occurred. Please try again later.");
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
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
            <div className="flex flex-wrap mt-4 gap-2 flex-col items-start">
              <h1 className="text-2xl border-b-8 border-S-Orange leading-none font-bold text-white">
                Trouble logging in?
              </h1>
              <p className="text-white text-lg my-2 max-w-[35rem]">
                Enter your email and we'll send you a link to get back into your
                account.
              </p>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 sm:w-[32rem] placeholder-white text-white"
                placeholder="Email Address"
              />
              {error && <p className="text-red-500 mt-2">{error}</p>} {/* Error message display */}
              <div className="flex flex-wrap w-full gap-2 justify-between">
                <button
                  onClick={handleSubmit}
                  className="py-2 px-12 w-[200px] box-border select-none rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white hover:cursor-pointer text-white font-roboto font-medium text-base"
                >
                  Submit
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;