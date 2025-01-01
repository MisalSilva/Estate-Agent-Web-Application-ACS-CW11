import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import properties from '../data/properties.json';

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Filter properties
        const results = properties.filter((property) => {
            const matchesType = filters.type ? property.type === filters.type : true;
            const matchesBedrooms = filters.bedrooms ? property.bedrooms === parseInt(filters.bedrooms) : true;
            const matchesBathrooms = filters.bathrooms ? property.bathrooms === parseInt(filters.bathrooms) : true;
            const matchesTenure = filters.tenure ? property.tenure === filters.tenure : true;
            const matchesLocation = filters.location ? property.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
            const matchesPrice =
                (filters.minPrice ? property.price >= parseInt(filters.minPrice) : true) &&
                (filters.maxPrice ? property.price <= parseInt(filters.maxPrice) : true);
            const matchesDate = filters.dateAdded ? new Date(property.dateAdded) >= new Date(filters.dateAdded) : true;

            return matchesType && matchesBedrooms && matchesBathrooms && matchesTenure && matchesLocation && matchesPrice && matchesDate;
        });

        // Navigate to results page with filtered data
        navigate('/results', { state: { results } });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Inputs for filters */}
            <label>Type: <select name="type" onChange={handleChange}>
                <option value="">Any</option>
                <option value="house">House</option>
                <option value="flat">Flat</option>
            </select></label>
            <label>Bedrooms: <input type="number" name="bedrooms" onChange={handleChange} /></label>
            <label>Bathrooms: <input type="number" name="bathrooms" onChange={handleChange} /></label>
            <label>Tenure: <select name="tenure" onChange={handleChange}>
                <option value="">Any</option>
                <option value="freehold">Freehold</option>
                <option value="leasehold">Leasehold</option>
            </select></label>
            <label>Location: <input type="text" name="location" onChange={handleChange} /></label>
            <label>Price Range: 
                <input type="number" name="minPrice" placeholder="Min" onChange={handleChange} />
                <input type="number" name="maxPrice" placeholder="Max" onChange={handleChange} />
            </label>
            <label>Date Added: <input type="date" name="dateAdded" onChange={handleChange} /></label>
            <button type="submit">Search</button>
        </form>
    );
};

export default Search;
