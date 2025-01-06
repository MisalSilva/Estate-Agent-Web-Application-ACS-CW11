import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();
    
    return (
        <div className="home">
            <div className="home-content">
                <h1>Welcome to <span className="highlight">NestHub</span></h1>
                <h3>Your Personal Estate Agent</h3>
                <p>Simplify your Estate management with NESTHUB and find your Dream Property.</p>
                <button className="explore-button" onClick={() => navigate('/search')}>
                    Explore Now
                </button>
            </div>
            <div className="search-content">
                <h2>Find Your Dream Property</h2>
                <p>
                    Discover properties that matches your requirements and connect with agents easily.
                </p>
                <div className="search-actions">
                    <button className="search-button" onClick={() => navigate('/search')}>
                        Search Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
