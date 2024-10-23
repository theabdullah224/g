import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Logo from "./Resource/logo.png";
import Logo2 from "./Resource/logo2.png";
import Facebook from "./Resource/fb.svg";
import x from './Resource/x.svg'; // Assuming x is Twitter
import insta from "./Resource/insta.svg";
import linkedin from './Resource/in.svg';
import youtube from './Resource/yt.svg';
import mail from './Resource/mail.png';
import call from './Resource/call.png';
import location from './Resource/location.png';
import './footer.css';
// Footer 
function Footer() {
  return (
    <footer className='footer'>
      <div className="fcol1">
        <img className='logof' src={Logo2} alt="Logo" />
        <p className='footerp text-Text2 text-md font-bold' style={{margin:"20px 0px 0px 0px "}}>Get Control Our Your Health</p>
        <p className='pt-4 text-Text1 text-xl font-bold'>Follow Us</p>
        <div className="logos  w-fit">
          <a href="https://www.facebook.com" className=' w-fit' target="_blank" rel="noopener noreferrer">
            <img src={Facebook} alt="Facebook" className="fb" />
          </a>
          <a href="https://www.instagram.com/gbmeals/" target="_blank" rel="noopener noreferrer">
            <img src={insta} alt="Instagram" className="fb" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={x} alt="Twitter" className="fb" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="LinkedIn" className="fb" />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <img src={youtube} alt="YouTube" className="fb" />
          </a>
        </div>
      </div>
      <div className="fcol1 fcol2">
        <h4 className='footerh4 text-Text1 text-2xl font-bold'>Quick&nbsp;Links</h4>
        <ul className='ulf '>
          <li><Link className='text-md font-bold text-Text2' onClick={() => window.scrollTo(0, 0)} to="/">Home</Link></li>
          <li><Link className='text-md font-bold text-Text2' onClick={() => window.scrollTo(0, 0)} to="/aboutus">About Us</Link></li>
          <li><Link className='text-md font-bold text-Text2' onClick={() => window.scrollTo(0, 0)} to="/plans">Meal Plans</Link></li>      
          {/* <li><Link className='text-md font-bold text-Text2' onClick={() => window.scrollTo(0, 0)} to="/plans">Plan Type</Link></li> */}
        </ul>
      </div>
      <div className="fcol1 fcol3">
        <h4 className='footerh4 text-2xl font-bold text-Text1'>Contact&nbsp;Info</h4>
        <div>
          <img src={location} alt="Location" className="location mt-2" />
          <p className='footerp text-md font-bold text-Text2'>15 Neptune Ct, Vanguard Way, Cardiff, CF24 5PJ</p>
        </div>
        {/* <div>
          <img src={call} alt="Phone" className="location" />
          <p className='footerp text-md font-bold text-Text2'>1800 123 4567</p>
        </div> */}
        <div>
          <img src={mail} alt="Email" className="location" />
          <p className='footerp text-md font-bold text-Text2'>team@gbmeals.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
