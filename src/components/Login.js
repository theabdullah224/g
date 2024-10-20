import React, { useState } from 'react';
import Header from './Header';
import cardbgimg from "./Resource/bgcardimg.png";
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Resource/spinner.svg';
import useStore from "./Store";

function Login() {
    const API_BASE_URL = "https://meeel.xyz";
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); // New state for error message
    const { isLoggedIn, setIsLoggedIn } = useStore();
    // const { isAdmin, setIsAdmin } = useStore();
    const [isAdmin, setIsAdmin] = useState("")
    
    const navi = ()=>{
        
        navigate("/forgotpassword")
    }


    const handleLogin = async () => {
        setLoading(true);
        setError(""); // Clear previous errors
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(loginData.email)) {
            setError("Please enter a valid email address");
            setLoading(false);
            return;
        }


        
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }

            localStorage.setItem("user", JSON.stringify(data));

            setIsLoggedIn(true);
            setIsAdmin(data.is_admin)
            
            localStorage.setItem('admin',data.is_admin)
            setTimeout(() => {
                if(data.is_admin===true){
                    navigate('/admin')
                }else{
                    navigate('/myaccount');
                    window.location.reload(true);
                }   
            }, 1000);
        } catch (error) {
            
             // Set the error message
             if (error.message.includes('psycopg2.OperationalError') && error.message.includes('SSL connection has been closed unexpectedly')) {
                setError("Invalid email or password, Please Try Again!");
              }else{
                setError(error.message);
              }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            {/* <Header /> */}
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
                        <div className='flex flex-wrap mt-4 gap-2 flex-col items-center   sm:items-start'>
                            <h1 className='text-2xl border-b-8 border-S-Orange leading-none font-bold text-white'>Log In</h1>
                            <form action=""  onSubmit={(e) => {
   // Prevents the page from reloading
    handleLogin(); // Calls your login function
  }} className='flex flex-wrap mt-4 gap-2 flex-col items-center   sm:items-start'>

                            <input
                                type="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleChange}
                                className='border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 w-full sm:w-[32rem] placeholder-white text-white'
                                placeholder='Email Address'
                                />
                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                                className='border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 w-full sm:w-[32rem] placeholder-white text-white'
                                placeholder='Password'
                                />
                            {error && <p className="text-red-500 mt-2">{error}</p>} {/* Error message display */}
                            <div className='flex flex-wrap w-full gap-2 justify-between '>
                                <span onClick={navi} className="text-white  hover:cursor-pointer" >Forgot password?</span>
                                <button
                                type="submit"
                                // onClick={handleLogin}
                                className='py-2 px-12 sm:w-[200px] box-border select-none rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white hover:cursor-pointer text-white font-roboto font-medium text-base'
                                >
                                    Login
                                </button>
                            </div>
                                </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Login;