import React from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    
    <nav className="navbar navbar-expand-md navbar-dark  bg-dark mb-2">
      <footer className="footer bg-dark text-light fixed-bottom py-4 mb-1"></footer>
      <div className="container">
        <Link className="navbar-brand mx-auto d-flex align-items-center gap-2" to="/">
          <img src={logo} alt="Logo" style={{ height: '40px' }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarCollapse">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Careers">Jobs</Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link" to="/Description">Test Description</Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link" to="/Tutorial">AI Tutorials</Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link" to="/Register">Register for AI Exam</Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link" to=""></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
