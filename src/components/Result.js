import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Heart, HeartOff, Star } from 'lucide-react';
import '../styles/Result.css';

const Result = () => {
    const location = useLocation();
    const results = location.state?.results || [];
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);

    // Load favorites from localStorage on component mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem('propertyFavorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('propertyFavorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (property) => {
        setFavorites(prevFavorites => {
            const propertyExists = prevFavorites.some(fav => fav.id === property.id);
            if (propertyExists) {
                return prevFavorites.filter(fav => fav.id !== property.id);
            } else {
                return [...prevFavorites, property];
            }
        });
    };

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

    const displayProperties = showFavorites ? favorites : results;

    return (
        <div className="results-container">
            <div className="results-header-container">
                <h2 className="results-header">
                    {showFavorites ? 'Favorite Properties' : 'Search Results'}
                </h2>
                <button 
                    className="toggle-favorites-btn"
                    onClick={() => setShowFavorites(!showFavorites)}
                >
                    {showFavorites ? (
                        <>
                            <HeartOff size={20} /> Show All Properties
                        </>
                    ) : (
                        <>
                            <Heart size={20} /> Show Favorites ({favorites.length})
                        </>
                    )}
                </button>
            </div>

            {displayProperties.length > 0 ? (
                <div className="property-grid">
                    {displayProperties.map((property) => (
                        <div key={property.id} className="property-card">
                            <div className="property-image">
                                <img 
                                    src={property.picture} 
                                    alt={`${property.type} in ${property.location}`}
                                    onError={(e) => {
                                        e.target.src = '/placeholder-property.jpg';
                                    }}
                                />
                                <button 
                                    className={`favorite-btn ${favorites.some(fav => fav.id === property.id) ? 'favorited' : ''}`}
                                    onClick={() => toggleFavorite(property)}
                                    aria-label={favorites.some(fav => fav.id === property.id) ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                    <Star size={24} />
                                </button>
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
                <p className="no-results">
                    {showFavorites ? 'No favorite properties yet.' : 'No properties found matching your criteria.'}
                </p>
            )}
        </div>
    );
};

export default Result;