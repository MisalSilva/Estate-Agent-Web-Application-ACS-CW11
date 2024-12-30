import React from 'react';
import '../styles/Home.css';

function Home() {
    return (
        <div className="home">
            <div className="home-content">
                <h1>Welcome to NestHub</h1>
                <p>
                    Manage all your estate-related tasks efficiently and with ease. 
                    Our system ensures transparency, speed, and accuracy in every step.
                </p>
                <button className="explore-button">Explore Now</button>
            </div>
            <div className="search-content">
                <p>Search properties, ensure it's upto your requirements and contact the agents</p>
                {/* <input type="text" placeholder="Search for properties" />
                <button className="search-button">Search</button> */}
                <button className="explore-button">Search Now</button>                
            </div>
        </div>
    );
}

export default Home;
