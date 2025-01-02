import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Search.css';
import propertiesData from '../data/properties.json'; // Import the JSON file

const Search = () => {
    const [filters, setFilters] = useState({
        type: '',
        bedrooms: '',
        bathrooms: '',
        tenure: '',
        location: '',
        minPrice: '',
        maxPrice: '',
        dateAdded: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    // Function to calculate the date range for recently added
    const calculateDateRange = (recentAdded) => {
        const today = new Date();
        switch (recentAdded) {
            case '3days':
                return new Date(today.setDate(today.getDate() - 3));
            case '7days':
                return new Date(today.setDate(today.getDate() - 7));
            case '14days':
                return new Date(today.setDate(today.getDate() - 14));
            case '1month':
                return new Date(today.setMonth(today.getMonth() - 1));
            default:
                return null; // "anytime" doesn't filter by date
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Access the `properties` array from the imported JSON
        const properties = propertiesData.properties;

        if (!Array.isArray(properties)) {
            console.error('Expected properties to be an array:', properties);
            return;
        }

        // Filter properties based on search criteria
        const results = properties.filter((property) => {
            const matchesType = filters.type ? property.type.toLowerCase() === filters.type.toLowerCase() : true;
            const matchesBedrooms = filters.bedrooms ? property.bedrooms === parseInt(filters.bedrooms) : true;
            const matchesTenure = filters.tenure ? property.tenure.toLowerCase() === filters.tenure.toLowerCase() : true;
            const matchesLocation = filters.location
                ? property.location.toLowerCase().includes(filters.location.toLowerCase())
                : true;
            const matchesPrice =
                (filters.minPrice ? property.price >= parseInt(filters.minPrice) : true) &&
                (filters.maxPrice ? property.price <= parseInt(filters.maxPrice) : true);
            // Adjust the matchesDate filter logic
            const matchesDate = filters.recentAdded !== 'anytime'
                ? new Date(property.added.year, property.added.month - 1, property.added.day) >= calculateDateRange(filters.recentAdded)
                : true;

            return matchesType && matchesBedrooms && matchesTenure && matchesLocation && matchesPrice && matchesDate;
        });

        // Navigate to results page with filtered data
        navigate('/results', { state: { results } });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Type:
                <select name="type" onChange={handleChange}>
                    <option value="">Any</option>
                    <option value="house">House</option>
                    <option value="flat">Flat</option>
                </select>
            </label>
            <label>
                Bedrooms:
                <input type="number" name="bedrooms" onChange={handleChange} />
            </label>
            <label>
                Tenure:
                <select name="tenure" onChange={handleChange}>
                    <option value="">Any</option>
                    <option value="freehold">Freehold</option>
                    <option value="leasehold">Leasehold</option>
                </select>
            </label>
            <label>
                Location:
                <input type="text" name="location" onChange={handleChange} />
            </label>
            <label>
                Price Range:
                <input type="number" name="minPrice" placeholder="Min" onChange={handleChange} />
                <br></br>
                <input type="number" name="maxPrice" placeholder="Max" onChange={handleChange} />
            </label>
            <label>
                Added to the site:
                <select name="recentAdded" onChange={handleChange}>
                    <option value="anytime">Anytime</option>
                    <option value="3days">Last 3 Days</option>
                    <option value="7days">Last 7 Days</option>
                    <option value="14days">Last 14 Days</option>
                    <option value="1month">Last Month</option>
                </select>
            </label>
            <button type="submit">Search</button>
        </form>
    );
};

export default Search;
