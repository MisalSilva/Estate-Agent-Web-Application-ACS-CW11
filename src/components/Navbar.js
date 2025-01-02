import React from 'react';
import NestHubLogo1 from './NestHubLogo1.png'; // Make sure to import the logo
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';    

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-logo">
            <a href="Home.js">
                    <img src={NestHubLogo1} alt="NestHub Logo" />
                </a>
            </div>
            <ul className="navbar-links">
                <li><a href="/" >Home</a></li>
                <li><a href="/search" onClick={() => navigate('/search')}>Search Properties</a></li>
                <li><a href="/">Favourites</a></li>
            </ul>
            <div className="login-register-buttons">
                <a href="/login" className='login'>Sign Up</a>
                {/* <a href="/register" className='register'>Register</a> */}
            </div>
        </nav>
    );
};

export default Navbar;