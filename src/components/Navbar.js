import React from 'react';
import NestHubLogo1 from './NestHubLogo1.png'; // Make sure to import the logo
import '../styles/Navbar.css';



function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
            <a href="/">
                    <img src={NestHubLogo1} alt="NestHub Logo" />
                </a>
            </div>
            <ul className="navbar-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
            <div className="navbar-login">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
        </nav>
    );
};

export default Navbar;