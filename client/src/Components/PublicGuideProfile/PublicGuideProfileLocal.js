import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './PublicGuideProfileLocal.css';
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import { FaWhatsapp, FaImages, FaUserTie, FaTimes } from 'react-icons/fa';

const PublicGuideProfileLocal = () => {
    const { id } = useParams();
    const [isAboutExpanded, setIsAboutExpanded] = useState(false);
    const [showPhotos, setShowPhotos] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Slideshow images
    const slides = [
        'slide1.jpg',
        'slide2.jpg',
        'slide3.jpg',
        'slide4.jpg',
        'slide5.jpg',
        'slide6.jpg',
        'slide7.jpg',
        'slide8.jpg',
        'slide9.jpg',
        'slide10.jpg',
        'slide11.jpg',
        'slide12.jpg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 4 * 5000);

        return () => clearInterval(interval);
    }, []);

    // Mock data for the guide
    const guide = {
        fullName: "Imeth Weerakkody",
        profilePhoto: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        averageRating: 3.3,
        professionalDetails: {
            experienceYears: 4,
            specialties: ["Historical Tours", "Nature Walks", "City Tours"],
            languagesSpoken: ["English", "Spanish", "French"],
            tourRegions: ["Colombo", "Kandy", "Galle"]
        },
        pricing: {
            rateType: "daily",
            hourlyRate: 25,
            dailyRate: 150
        },
        contact: {
            phone: "+94-9876543"
        },
        additionalInfo: {
            bio: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC."
        },
        availability: "Monday to Saturday, 9 AM - 6 PM"
    };

    // Other mock data remains the same
    const reviews = [
        {
            reviewerName: "Alice Johnson",
            reviewerEmail: "alice@example.com",
            reviewText: "Excellent tour guide! Very knowledgeable and friendly.",
            rating: 5,
            isVerified: true
        },
        {
            reviewerName: "Bob Wilson",
            reviewerEmail: "bob@example.com",
            reviewText: "Great experience exploring the city with John.",
            rating: 4.5,
            isVerified: true
        }
    ];

    const tourPhotos = [
        {
            imagePath: "/Backgrounds/Background1.png"
        },
        {
            imagePath: "/Backgrounds/Background1.png"
        },
        {
            imagePath: "/Backgrounds/Background1.png"
        }
    ];

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? "star-rating" : "star-rating empty-star"}>
                    ★
                </span>
            );
        }
        return <div>{stars}</div>;
    };

    const getCloudinaryUrl = (imagePath) => {
        if (!imagePath) return '/default-profile.png';
        return imagePath;
    };

    const handleImageClick = (imagePath) => {
        setSelectedImage(imagePath);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <Header />
            <div className="local-guide-container-background">
                <div className="background-slideshow">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`background-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{
                                backgroundImage: `url(/Slideshow/${slide})`,
                            }}
                        />
                    ))}
                </div>
                <div className="local-guide-container">
                    <div className="local-guide-header">
                        <div className="local-guide-details">
                            <h1 className="local-guide-name">{guide.fullName}</h1>

                            <div className="local-guide-rating">
                                <div className="local-guide-rating-item">
                                    <span className="local-guide-years-number">{guide.professionalDetails?.experienceYears || '0'}</span>
                                    <span className="local-guide-rating-title">Years</span>
                                </div>
                                <div className="local-guide-rating-item">
                                    <span className="local-guide-ratings-number">★{(Number(guide.averageRating) || 0).toFixed(2)}</span>
                                    <span className="local-guide-rating-title">Rating</span>
                                </div>
                                <div className="local-guide-rating-item">
                                    <span className="local-guide-hours-number">
                                        {guide.pricing?.rateType === 'hourly' ? (
                                            `$${guide.pricing?.hourlyRate || "0"}`
                                        ) : (
                                            `$${guide.pricing?.dailyRate || "0"}`
                                        )}
                                    </span>
                                    <span className="local-guide-rating-title">
                                        {guide.pricing?.rateType === 'hourly' ? 'Hourly Rate' : 'Daily Rate'}
                                    </span>
                                </div>
                            </div>

                            <div className="local-guide-contact-info">
                                <span className="local-guide-phone">
                                    <FaWhatsapp className="whatsapp-icon" /> {guide.contact?.phone || "Phone not provided"}
                                </span>
                            </div>
                        </div>

                        <div className="local-guide-photo">
                            <img
                                src={getCloudinaryUrl(guide.profilePhoto)}
                                alt={guide.fullName}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/default-profile.png';
                                }}
                            />
                        </div>
                    </div>

                    <div className="local-guide-divider"></div>

                    <div className="local-guide-about">
                        <h2>About Me</h2>
                        <div className={`about-content ${isAboutExpanded ? 'expanded' : 'collapsed'}`}>
                            <p>{guide.additionalInfo?.bio || "No bio added yet."}</p>
                        </div>
                        <button
                            className="see-more-button"
                            onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                        >
                            {isAboutExpanded ? 'See Less' : 'See More'}
                        </button>
                    </div>

                    <div className="local-guide-divider"></div>

                    <div className="local-guide-toggle-section">
                        <div className="local-guide-toggle-slider">
                            <button
                                className={`toggle-option ${showPhotos ? 'active' : ''}`}
                                onClick={() => setShowPhotos(true)}
                            >
                                <FaImages className="toggle-icon" color={showPhotos ? "white" : "inherit"} />
                                <span className="toggle-text">Tour Photos</span>
                            </button>
                            <button
                                className={`toggle-option ${!showPhotos ? 'active' : ''}`}
                                onClick={() => setShowPhotos(false)}
                            >
                                <FaUserTie className="toggle-icon" color={!showPhotos ? "white" : "inherit"} />
                                <span className="toggle-text">Professional Details</span>
                            </button>
                            <div className={`slider ${showPhotos ? 'left' : 'right'}`}></div>
                        </div>

                        {showPhotos ? (
                            <div className="local-guide-photos">
                                <h2 className="local-guide-photos-title">Tour Photos</h2>
                                <div className="local-guide-photos-grid">
                                    {tourPhotos.length > 0 ? (
                                        tourPhotos.map((photo, index) => (
                                            <div key={index} className="local-guide-photo-card">
                                                <img
                                                    src={photo.imagePath}
                                                    alt="Tour"
                                                    className="local-guide-photo-img"
                                                    loading="lazy"
                                                    onClick={() => handleImageClick(photo.imagePath)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <p>No tour photos uploaded yet.</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="local-guide-professional">
                                <h2>Professional Details</h2>
                                <p><strong>Specialties:</strong> {guide.professionalDetails?.specialties?.join(", ") || "Not specified"}</p>
                                <p><strong>Languages:</strong> {guide.professionalDetails?.languagesSpoken?.join(", ") || "Not specified"}</p>
                                <p><strong>Experience:</strong> {guide.professionalDetails?.experienceYears || "0"} years</p>
                                <p><strong>Tour Regions:</strong> {guide.professionalDetails?.tourRegions?.join(", ") || "Not specified"}</p>
                                <p>
                                    <strong>Hourly Rate:</strong>
                                    <span className={guide.pricing?.rateType === 'hourly' ? 'local-guide-highlighted-rate' : ''}>
                                        ${guide.pricing?.hourlyRate || "0"}
                                    </span>
                                    {guide.pricing?.rateType === 'hourly' && ' (Selected)'}
                                </p>
                                <p>
                                    <strong>Daily Rate:</strong>
                                    <span className={guide.pricing?.rateType === 'daily' ? 'local-guide-highlighted-rate' : ''}>
                                        ${guide.pricing?.dailyRate || "0"}
                                    </span>
                                    {guide.pricing?.rateType === 'daily' && ' (Selected)'}
                                </p>
                                <p><strong>Availability:</strong> {guide.availability || "Not specified"}</p>
                            </div>
                        )}
                    </div>

                    <div className="local-guide-divider"></div>

                    <div className="reviews-section">
                        <h2 className="reviews-title">REVIEWS</h2>
                        <h3 className="reviews-subtitle">What Fellow Tourist Say About {guide.fullName}</h3>

                        <div className="reviews-grid">
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <div key={index} className="review-card">
                                        <div className="reviewer-info">
                                            <div className="reviewer-avatar">
                                                {review.reviewerEmail.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="reviewer-details">
                                                <h4 className="reviewer-name">{review.reviewerName || review.reviewerEmail.split('@')[0]}</h4>
                                                <p className="reviewer-title">Verified Client</p>
                                                {review.isVerified && (
                                                    <span className="verified-badge">Verified Review</span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="review-text">"{review.reviewText}"</p>
                                        <div className="review-rating">
                                            <div className="stars">{renderStars(review.rating)}</div>
                                            <div className="rating-number">{review.rating.toFixed(1)}</div>
                                            <span className="rating-label">Rating</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-reviews">No verified reviews yet.</p>
                            )}
                        </div>

                        <Link to={`/guides/${id}/add-review`} className="guide-button edit-button write-review">
                            Write a review
                        </Link>
                    </div>

                    {/* Image Modal */}
                    {selectedImage && (
                        <div className="image-modal-overlay" onClick={handleCloseModal}>
                            <div className="image-modal-content" onClick={e => e.stopPropagation()}>
                                <button className="image-modal-close" onClick={handleCloseModal}>
                                    <FaTimes />
                                </button>
                                <img src={selectedImage} alt="Full size" className="image-modal-img" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PublicGuideProfileLocal;