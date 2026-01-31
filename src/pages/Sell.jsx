import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Upload, X } from 'lucide-react';
import { useListings } from '../context/ListingsContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/scrollAnimations.css';
import './SellBike.css';

const Sell = () => {
    useScrollAnimation();
    const navigate = useNavigate();
    const { addListing } = useListings();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Basic Details
        title: '',
        price: '',
        year: '',
        mileage: '',
        category: 'Supersport',

        // Step 2: Technical Specs
        engine: '',
        power: '',
        weight: '',
        serviceHistory: '',

        // Step 3: Images
        images: [],

        // Step 4: Description
        description: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const validateStep = (step) => {
        const newErrors = {};
        let isValid = true;

        if (step === 1) {
            if (!formData.title.trim()) newErrors.title = 'Title is required';
            if (!formData.price) newErrors.price = 'Price is required';
            if (!formData.year) newErrors.year = 'Year is required';
            else if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1) newErrors.year = 'Enter a valid year';
            if (!formData.mileage) newErrors.mileage = 'Mileage is required';
            if (!formData.category) newErrors.category = 'Category is required';
        }

        if (step === 2) {
            if (!formData.engine) newErrors.engine = 'Engine size is required';
            if (!formData.serviceHistory) newErrors.serviceHistory = 'Service history is required';
        }

        if (step === 3) {
            if (formData.images.length === 0) newErrors.images = 'At least one photo is required';
        }

        if (step === 4) {
            if (!formData.description.trim()) newErrors.description = 'Description is required';
            else if (formData.description.length < 10) newErrors.description = 'Description must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user types
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
                window.scrollTo(0, 0);
            }
        } else {
            // Mark all fields in current step as touched to show errors
            // This is a simplification; for now validation runs on click and shows errors immediately
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        if (!validateStep(4)) return;

        // Create listing object
        const listing = {
            name: formData.title,
            price: parseFloat(formData.price),
            year: formData.year,
            engine: formData.engine,
            mileage: formData.mileage,
            power: formData.power,
            category: formData.category,
            description: formData.description,
            images: formData.images.length > 0 ? formData.images : [
                'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80'
            ]
        };

        addListing(listing);
        setSubmitted(true);

        // Redirect to shop after 2 seconds
        setTimeout(() => {
            navigate('/shop');
        }, 2000);
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        // Convert each file to base64
        const promises = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        // Wait for all conversions to complete
        Promise.all(promises).then(base64Images => {
            updateFormData('images', [...formData.images, ...base64Images]);
        }).catch(error => {
            console.error('Error converting images:', error);
        });
    };

    const removeImage = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        updateFormData('images', newImages);
    };

    if (submitted) {
        return (
            <div className="sell-container">
                <div className="success-card">
                    <div className="success-icon">
                        <Check size={64} />
                    </div>
                    <h1>Listing Submitted!</h1>
                    <p>Your superbike listing has been created. Our team will review it within 24 hours.</p>
                    <button className="btn btn-primary" onClick={() => window.location.href = '/shop'}>
                        View Listings
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="sell-container">
            <div className="sell-header">
                <h1>Sell Your Superbike</h1>
                <p>Create a premium listing in 4 easy steps</p>
            </div>

            {/* Progress Stepper */}
            <div className="progress-stepper">
                {[1, 2, 3, 4].map(step => (
                    <div key={step} className={`step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
                        <div className="step-circle">
                            {currentStep > step ? <Check size={20} /> : step}
                        </div>
                        <div className="step-label">
                            {step === 1 && 'Details'}
                            {step === 2 && 'Specs'}
                            {step === 3 && 'Photos'}
                            {step === 4 && 'Review'}
                        </div>
                        {step < 4 && <div className="step-line"></div>}
                    </div>
                ))}
            </div>

            {/* Form Container */}
            <div className="form-card">
                {/* Step 1: Basic Details */}
                {currentStep === 1 && (
                    <div className="form-step">
                        <h2>Basic Details</h2>
                        <p className="step-description">Tell us about your machine</p>

                        <div className="form-group">
                            <label>Listing Title *</label>
                            <input
                                type="text"
                                placeholder="e.g. 2023 Ducati Panigale V4 S"
                                value={formData.title}
                                onChange={(e) => updateFormData('title', e.target.value)}
                                className={errors.title ? 'input-error' : ''}
                            />
                            {errors.title && <span className="error-message">{errors.title}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Price ($) *</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={(e) => updateFormData('price', e.target.value)}
                                    className={errors.price ? 'input-error' : ''}
                                />
                                {errors.price && <span className="error-message">{errors.price}</span>}
                            </div>
                            <div className="form-group">
                                <label>Category *</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => updateFormData('category', e.target.value)}
                                    className={errors.category ? 'input-error' : ''}
                                >
                                    <option>Supersport</option>
                                    <option>Hyper Naked</option>
                                    <option>Adventure</option>
                                    <option>Cafe Racer</option>
                                    <option>Touring</option>
                                </select>
                                {errors.category && <span className="error-message">{errors.category}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Year *</label>
                                <input
                                    type="number"
                                    placeholder="2024"
                                    value={formData.year}
                                    onChange={(e) => updateFormData('year', e.target.value)}
                                    className={errors.year ? 'input-error' : ''}
                                />
                                {errors.year && <span className="error-message">{errors.year}</span>}
                            </div>
                            <div className="form-group">
                                <label>Mileage (miles) *</label>
                                <input
                                    type="text"
                                    placeholder="1,200"
                                    value={formData.mileage}
                                    onChange={(e) => updateFormData('mileage', e.target.value)}
                                    className={errors.mileage ? 'input-error' : ''}
                                />
                                {errors.mileage && <span className="error-message">{errors.mileage}</span>}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Technical Specs */}
                {currentStep === 2 && (
                    <div className="form-step">
                        <h2>Technical Specifications</h2>
                        <p className="step-description">Performance details</p>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Engine (cc) *</label>
                                <input
                                    type="text"
                                    placeholder="1103"
                                    value={formData.engine}
                                    onChange={(e) => updateFormData('engine', e.target.value)}
                                    className={errors.engine ? 'input-error' : ''}
                                />
                                {errors.engine && <span className="error-message">{errors.engine}</span>}
                            </div>
                            <div className="form-group">
                                <label>Power (HP)</label>
                                <input
                                    type="text"
                                    placeholder="214"
                                    value={formData.power}
                                    onChange={(e) => updateFormData('power', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Weight (kg)</label>
                                <input
                                    type="text"
                                    placeholder="195"
                                    value={formData.weight}
                                    onChange={(e) => updateFormData('weight', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Service History *</label>
                                <select
                                    value={formData.serviceHistory}
                                    onChange={(e) => updateFormData('serviceHistory', e.target.value)}
                                    className={errors.serviceHistory ? 'input-error' : ''}
                                >
                                    <option value="">Select...</option>
                                    <option>Full Dealer</option>
                                    <option>Partial</option>
                                    <option>Independent</option>
                                    <option>None</option>
                                </select>
                                {errors.serviceHistory && <span className="error-message">{errors.serviceHistory}</span>}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Image Upload */}
                {currentStep === 3 && (
                    <div className="form-step">
                        <h2>Upload Photos</h2>
                        <p className="step-description">High-quality images sell faster</p>

                        <div className="upload-zone">
                            <input
                                type="file"
                                id="image-upload"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="image-upload" className={`upload-label ${errors.images ? 'input-error' : ''}`}>
                                <Upload size={48} />
                                <p>Click to upload or drag and drop</p>
                                <span>PNG, JPG up to 10MB</span>
                            </label>
                        </div>
                        {errors.images && <p className="error-message" style={{ marginTop: '-1.5rem', marginBottom: '1.5rem' }}>{errors.images}</p>}

                        {formData.images.length > 0 && (
                            <div className="image-preview-grid">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="image-preview">
                                        <img src={image} alt={`Preview ${index + 1}`} />
                                        <button
                                            className="remove-image"
                                            onClick={() => removeImage(index)}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Step 4: Description & Review */}
                {currentStep === 4 && (
                    <div className="form-step">
                        <h2>Description & Review</h2>
                        <p className="step-description">Final touches</p>

                        <div className="form-group">
                            <label>Description *</label>
                            <textarea
                                rows="6"
                                placeholder="Describe your bike's condition, modifications, service history, and any unique features..."
                                value={formData.description}
                                onChange={(e) => updateFormData('description', e.target.value)}
                                className={errors.description ? 'input-error' : ''}
                            ></textarea>
                            {errors.description && <span className="error-message">{errors.description}</span>}
                        </div>

                        <div className="review-summary">
                            <h3>Listing Summary</h3>
                            <div className="summary-grid">
                                <div className="summary-item">
                                    <span className="summary-label">Title</span>
                                    <span className="summary-value">{formData.title || '-'}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Price</span>
                                    <span className="summary-value">${formData.price || '0'}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Year</span>
                                    <span className="summary-value">{formData.year || '-'}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Mileage</span>
                                    <span className="summary-value">{formData.mileage || '-'} miles</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Engine</span>
                                    <span className="summary-value">{formData.engine || '-'} cc</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Photos</span>
                                    <span className="summary-value">{formData.images.length} uploaded</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="form-actions">
                    {currentStep > 1 && (
                        <button className="btn btn-outline" onClick={handlePrevious}>
                            <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} />
                            Previous
                        </button>
                    )}
                    <div style={{ flex: 1 }}></div>
                    {currentStep < 4 ? (
                        <button className="btn btn-primary" onClick={handleNext}>
                            Next
                            <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Submit Listing
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sell;
