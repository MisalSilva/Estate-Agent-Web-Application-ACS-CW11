import React, { useState } from 'react';

const Search = ({ onSearch }) => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(filters);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Type: 
                <select name="type" onChange={handleChange}>
                    <option value="">Any</option>
                    <option value="house">House</option>
                    <option value="flat">Flat</option>
                </select>
            </label>

            <label>Bedrooms: 
                <input type="number" name="bedrooms" onChange={handleChange} />
            </label>

            <label>Bathrooms: 
                <input type="number" name="bathrooms" onChange={handleChange} />
            </label>

            <label>Tenure Type: 
                <select name="tenure" onChange={handleChange}>
                    <option value="">Any</option>
                    <option value="freehold">Freehold</option>
                    <option value="leasehold">Leasehold</option>
                </select>
            </label>

            <label>Location: 
                <input type="text" name="location" onChange={handleChange} />
            </label>

            <label>Price Range: 
                <input type="number" name="minPrice" placeholder="Min" onChange={handleChange} />
                <input type="number" name="maxPrice" placeholder="Max" onChange={handleChange} />
            </label>

            <label>Date Added: 
                <input type="date" name="dateAdded" onChange={handleChange} />
            </label>

            <button type="submit">Search</button>
        </form>
    );
};

export default Search;
