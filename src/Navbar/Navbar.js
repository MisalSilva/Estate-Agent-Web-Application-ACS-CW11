import React from 'react';
import NestHubLogo from './NestHubLogo.png'; // Make sure to import the logo
//import './Navbar.css'; // Make sure to create a CSS file for styling

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
            <a href="/">
                    <img src={NestHubLogo} alt="NestHub Logo" />
                </a>
            </div>
            <ul className="navbar-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;