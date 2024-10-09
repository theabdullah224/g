import React, { useState } from 'react';
import Header from './Header';
import cardbgimg from "./Resource/bgcardimg.png";
import { useNavigate } from 'react-router-dom';
import Loader from './Resource/spinner.svg'; // Assuming this is the loader image
import useStore from "./Store";

function UpdatePassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // State for loader
    const [newPassword, setNewPassword] = useState(''); // State for new password
    const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
    const [error, setError] = useState(''); // State for error messages
    const { isLoggedIn, setIsLoggedIn } = useStore();

    const handleSubmit = async () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError(''); // Reset error before making request

        try {
            const response = await fetch('https://meeel.xyz/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Assuming you use token-based authentication
                },
                body: JSON.stringify({ new_password: newPassword })
            });

            const data = await response.json();

            if (response.ok) {
                // Handle success (e.g., navigate to login page or show success message)
                navigate('/login'); // Example redirection
            } else {
                // Handle errors from server response
                setError(data.error || "An error occurred");
            }
        } catch (error) {
            setError("An error occurred");
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
                {/* Show loader when loading, otherwise show the form */}
                {loading ? (
                    <img src={Loader} alt="Loading..." className="animate-spin" />
                ) : (
                    <>
                        <div className='flex flex-wrap mt-4 gap-2 flex-col items-start'>
                            <h1 className='text-2xl border-b-8 border-S-Orange leading-none font-bold text-white'>Enter New Password</h1>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 sm:w-[32rem] placeholder-white text-white'
                                placeholder='New Password'
                            />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 sm:w-[32rem] placeholder-white text-white'
                                placeholder='Confirm Password'
                            />
                            {error && <p className='text-red-500'>{error}</p>}
                            <div className='flex flex-wrap w-full gap-2 justify-between'>
                                <button
                                    onClick={handleSubmit}
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
    )
}

export default UpdatePassword;
