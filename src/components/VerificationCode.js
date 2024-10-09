import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import cardbgimg from "./Resource/bgcardimg.png";
import Loader from './Resource/spinner.svg';
import useStore from "./Store";

function ForgetPassword() {
    
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { setIsLoggedIn } = useStore();

    const handleVerifyCode = async () => {
        setLoading(true);
        setError("");
        console.log(verificationCode); // Ensure this logs correctly
        try {
            const response = await axios.post('https://meeel.xyz/verify-code', {
                verification_code: verificationCode
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
    
            // console.log("-===========>>>>", localStorage.getItem('authToken'));
    
            if (response.status === 200) {
                const { reset_token } = response.data;
                localStorage.setItem('reset_token', reset_token);
                navigate('/updatepassword');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || "An error occurred. Please try again.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
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
                    <img src={Loader} alt="Loading..." className="animate-spin" />
                ) : (
                    <>
                        <div className='flex flex-wrap mt-4 gap-2 flex-col items-start'>
                            <h1 className='text-2xl border-b-8 border-S-Orange leading-none font-bold text-white'>Enter Verification Code</h1>
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
                                    className='py-2 px-12 w-[200px] box-border select-none rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white hover:cursor-pointer text-white font-roboto font-medium text-base'
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