import React from 'react'; // Importing React
import './copyright.css'; // Importing the stylesheet for this component
import { Link } from 'react-router-dom';

function Copyright() {
  return (
    <div className='copyright'>
        {/* Copyright text */}
        <p className='cpp text-lg'>© 2024 gbmeals. All rights reserved.</p>
        
        {/* Links to policies and terms */}
        <div>
            <Link className='canchor text-center text-lg' onClick={() => window.scrollTo(0, 0)} to="/privacypolicy">Privacy Policy</Link>
            <Link className='canchor text-center text-lg' onClick={() => window.scrollTo(0, 0)} to="/termsofservices">Terms of Service</Link>
            <Link className='canchor text-center text-lg' onClick={() => window.scrollTo(0, 0)} to="/cookiesetting">Cookies Settings</Link>
        </div>
    </div>
  )
}

export default Copyright; // Exporting the Copyright component as the default export
