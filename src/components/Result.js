import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const results = location.state?.results || [];

    return (
        <div>
            <h2>Search Results</h2>
            {results.length > 0 ? (
                results.map((property) => (
                    <div key={property.id}>
                        <h3>{property.type}</h3>
                        <p>Bedrooms: {property.bedrooms}</p>
                        <p>Bathrooms: {property.bathrooms}</p>
                        <p>Tenure: {property.tenure}</p>
                        <p>Location: {property.location}</p>
                        <p>Price: £{property.price}</p>
                        <p>Date Added: {property.dateAdded}</p>
                    </div>
                ))
            ) : (
                <p>No properties found.</p>
            )}
        </div>
    );
};

export default Result;
