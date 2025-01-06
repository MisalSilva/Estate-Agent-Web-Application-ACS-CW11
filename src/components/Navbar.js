import React, { useState } from 'react';
import NestHubLogo1 from './NestHubLogo1.png'; // Make sure to import the logo
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <a href="/" onClick={() => navigate('/')}>
                        <img src={NestHubLogo1} alt="NestHub Logo" />
                    </a>
                </div>
                <button className="navbar-toggle" onClick={toggleMenu}>
                    <span className="navbar-toggle-icon">&#9776;</span>
                </button>
                <ul className={`navbar-links ${isMenuOpen ? 'navbar-links-active' : ''}`}>
                    <li><a href="/" onClick={() => navigate('/')}>Home</a></li>
                    <li><a href="/search" onClick={() => navigate('/search')}>Search Properties</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
