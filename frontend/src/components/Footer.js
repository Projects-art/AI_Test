import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

const Footer = () => {
  return (
    
    <footer className="footer bg-dark text-light fixed-bottom py-4 mb-1">
      <div className="container text-center">
         <div className="row justify-content-center">
        <ul className="list-inline mb-0">
          <li className="list-inline-item mx-2">
            <Link className="text-light text-decoration-none" to="https://www.facebook.com/share/19umeP2vK1/">Facebook</Link>
          </li>
         
          <li className="list-inline-item mx-2">
            <Link className="text-light text-decoration-none" to="https://www.linkedin.com/in/softwellet-innovative-technologies-pvt-ltd-096ba6384?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">LinkedIn</Link>
          </li>
          <li className="list-inline-item mx-2">
            <Link className="text-light text-decoration-none" to="https://www.instagram.com/softwellet?igsh=MXd3M2t6M2xkZmFhNw==">Instagram</Link>
          </li>
          <li className="list-inline-item mx-2">
            <Link className="text-light text-decoration-none" to="https://forms.gle/5jcXvkXT1X3JWgE87"> My Cv</Link>
          </li>
          <li className="list-inline-item mx-2">
            <span className="small">&copy; {new Date().getFullYear()} Softwallet Innovative Technologies Pvt. Ltd.</span>
          </li>
        </ul>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
