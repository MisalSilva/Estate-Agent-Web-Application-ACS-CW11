import React from 'react';

const Result = ({ results }) => {
    return (
        <div>
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
