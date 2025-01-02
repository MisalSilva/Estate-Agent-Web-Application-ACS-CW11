import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Result.css';

const Result = () => {
    const location = useLocation();
    const results = location.state?.results || [];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const formatDate = (added) => {
        if (!added) return '';
        return `${added.day} ${added.month} ${added.year}`;
    };

    return (
        <div className="results-container">
            <h2 className="results-header">Search Results</h2>
            {results.length > 0 ? (
                <div className="property-grid">
                    {results.map((property) => (
                        <div key={property.id} className="property-card">
                            <div className="property-image">
                                <img 
                                    src={property.picture} 
                                    alt={`${property.type} in ${property.location}`}
                                    onError={(e) => {
                                        e.target.src = '/placeholder-property.jpg'; // Fallback image
                                    }}
                                />
                            </div>
                            <div className="property-details">
                                <h4 className="property-type">{property.type}</h4>
                                <p className="property-price">{formatPrice(property.price)}</p>
                                <p className="property-info">
                                    <strong>{property.bedrooms}</strong> {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                                </p>
                                <p className="property-info">
                                    <strong>Tenure:</strong> {property.tenure}
                                </p>
                                <p className="property-info">
                                    <strong>Location:</strong> {property.location}
                                </p>
                                <div className="property-description">
                                    {property.description}
                                </div>
                                <p className="property-date">
                                    Added: {formatDate(property.added)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-results">No properties found matching your criteria.</p>
            )}
        </div>
    );
};

export default Result;