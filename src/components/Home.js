import React from 'react';
import '../styles/Home.css';

function Home() {
    const scrollToSearchContent = () => {
        document.querySelector('.search-content').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="home">
            <div className="home-content">
                <h1>Welcome to <span className="highlight">NestHub</span></h1>
                <p>
                    Simplify your estate management with transparency, speed, and accuracy.
                </p>
                <button className="explore-button" onClick={scrollToSearchContent}>
                    Explore Now
                </button>
            </div>
            <div className="search-content">
                <h2>Find Your Ideal Property</h2>
                <p>
                    Discover properties that suit your requirements and connect with agents easily.
                </p>
                <div className="search-actions">
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search for properties..."
                    />
                    <button className="search-button">Search Now</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
