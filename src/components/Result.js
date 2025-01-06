import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heart, HeartOff, Star, Trash2, ExternalLink } from 'lucide-react';
import '../styles/Result.css';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const results = location.state?.results || [];
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [draggedProperty, setDraggedProperty] = useState(null);

    
    useEffect(() => {
        const savedFavorites = localStorage.getItem('propertyFavorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('propertyFavorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (e, property) => {
        e.stopPropagation(); // Prevent triggering the card click when clicking the favorite button
        setFavorites(prevFavorites => {
            const propertyExists = prevFavorites.some(fav => fav.id === property.id);
            if (propertyExists) {
                return prevFavorites.filter(fav => fav.id !== property.id);
            } else {
                return [...prevFavorites, property];
            }
        });
    };

    const clearFavorites = () => {
        setFavorites([]);
        localStorage.removeItem('propertyFavorites');
    };

    const handleDragStart = (e, property) => {
        e.stopPropagation(); // Prevent navigation when starting to drag
        setDraggedProperty(property);
        e.dataTransfer.setData('text/plain', property.id);
        e.currentTarget.classList.add('dragging');
    };

    // Previous drag and drop handlers remain the same...
    const handleDragEnd = (e) => {
        e.currentTarget.classList.remove('dragging');
        setDraggedProperty(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        const dropZone = e.currentTarget;
        dropZone.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e, action) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');

        if (!draggedProperty) return;

        if (action === 'add-to-favorites' && !favorites.some(fav => fav.id === draggedProperty.id)) {
            setFavorites(prev => [...prev, draggedProperty]);
        } else if (action === 'remove-from-favorites' && favorites.some(fav => fav.id === draggedProperty.id)) {
            setFavorites(prev => prev.filter(fav => fav.id !== draggedProperty.id));
        }
    };

    // New function to handle property card clicks
    const handlePropertyClick = (property) => {
        if (property.url) {
            window.open(property.url, '_blank'); // Opens in a new tab
        }
    };

    // Previous formatting functions remain the same...
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
            {/* Header section remains the same */}
            <div className="results-header-container">
                <h2 className="results-header">
                    {showFavorites ? 'Favorite Properties' : 'Search Results'}
                </h2>
                <div className="header-buttons">
                    {showFavorites ? (
                        <>
                            <button 
                                className="clear-favorites-btn"
                                onClick={clearFavorites}
                            >
                                <Trash2 size={20} /> Clear Favorites
                            </button>
                            <button 
                                className="toggle-favorites-btn drop-zone"
                                onClick={() => setShowFavorites(false)}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, 'remove-from-favorites')}
                            >
                                <HeartOff size={20} /> 
                                Drop here to remove from favorites
                            </button>
                        </>
                    ) : (
                        <button 
                            className="toggle-favorites-btn drop-zone"
                            onClick={() => setShowFavorites(true)}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, 'add-to-favorites')}
                        >
                            <Heart size={20} /> 
                            Drop here to add to favorites ({favorites.length})
                        </button>
                    )}
                </div>
            </div>

            <div className="property-grid">
                {displayProperties.length > 0 ? (
                    displayProperties.map((property) => (
                        <div 
                            key={property.id} 
                            className="property-card"
                            onClick={() => handlePropertyClick(property)}
                            draggable
                            onDragStart={(e) => handleDragStart(e, property)}
                            onDragEnd={handleDragEnd}
                        >
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
                                    onClick={(e) => toggleFavorite(e, property)}
                                    aria-label={favorites.some(fav => fav.id === property.id) ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                    <Star size={24} />
                                </button>
                                {property.url && (
                                    <div className="view-details">
                                        <ExternalLink size={20} />
                                        Click to view details
                                    </div>
                                )}
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
                    ))
                ) : (
                    <p className="no-results">
                        {showFavorites ? 'No favorite properties yet.' : 'No properties found matching your criteria.'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Result;