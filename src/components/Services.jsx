import React from 'react';
import './Services.css';

const Services = () => {
    const services = [
        {
            title: '2D Animation',
            description: 'Vibrant, engaging 2D animations that tell your story with style and creativity.',
            icon: (
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <rect width="60" height="60" rx="12" fill="url(#serviceGradient1)" />
                    <path d="M20 25L30 20L40 25V40L30 45L20 40V25Z" stroke="white" strokeWidth="2" fill="none" />
                    <defs>
                        <linearGradient id="serviceGradient1" x1="0" y1="0" x2="60" y2="60">
                            <stop offset="0%" stopColor="#4A00E0" />
                            <stop offset="100%" stopColor="#00D2FF" />
                        </linearGradient>
                    </defs>
                </svg>
            )
        },
        {
            title: '3D Animation',
            description: 'Stunning 3D visuals that bring depth and realism to your projects.',
            icon: (
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <rect width="60" height="60" rx="12" fill="url(#serviceGradient2)" />
                    <circle cx="30" cy="30" r="12" stroke="white" strokeWidth="2" fill="none" />
                    <defs>
                        <linearGradient id="serviceGradient2" x1="0" y1="0" x2="60" y2="60">
                            <stop offset="0%" stopColor="#003366" />
                            <stop offset="100%" stopColor="#4A00E0" />
                        </linearGradient>
                    </defs>
                </svg>
            )
        },
        {
            title: 'Motion Graphics',
            description: 'Dynamic motion graphics that elevate your brand and captivate viewers.',
            icon: (
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <rect width="60" height="60" rx="12" fill="url(#serviceGradient3)" />
                    <rect x="15" y="20" width="30" height="20" rx="2" stroke="white" strokeWidth="2" fill="none" />
                    <defs>
                        <linearGradient id="serviceGradient3" x1="0" y1="0" x2="60" y2="60">
                            <stop offset="0%" stopColor="#00D2FF" />
                            <stop offset="100%" stopColor="#4A00E0" />
                        </linearGradient>
                    </defs>
                </svg>
            )
        },
        {
            title: 'Explainer Videos',
            description: 'Clear, concise explainer videos that simplify complex ideas.',
            icon: (
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <rect width="60" height="60" rx="12" fill="url(#serviceGradient4)" />
                    <path d="M25 20L35 30L25 40" stroke="white" strokeWidth="2" fill="none" />
                    <defs>
                        <linearGradient id="serviceGradient4" x1="0" y1="0" x2="60" y2="60">
                            <stop offset="0%" stopColor="#4A00E0" />
                            <stop offset="100%" stopColor="#003366" />
                        </linearGradient>
                    </defs>
                </svg>
            )
        },
        {
            title: 'Character Animation',
            description: 'Memorable characters that connect with your audience emotionally.',
            icon: (
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <rect width="60" height="60" rx="12" fill="url(#serviceGradient5)" />
                    <path d="M30 15L35 25L45 27L37 35L39 45L30 40L21 45L23 35L15 27L25 25L30 15Z" stroke="white" strokeWidth="2" fill="none" />
                    <defs>
                        <linearGradient id="serviceGradient5" x1="0" y1="0" x2="60" y2="60">
                            <stop offset="0%" stopColor="#00D2FF" />
                            <stop offset="100%" stopColor="#003366" />
                        </linearGradient>
                    </defs>
                </svg>
            )
        },
        {
            title: 'Logo Animation',
            description: 'Eye-catching logo animations that make your brand unforgettable.',
            icon: (
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <rect width="60" height="60" rx="12" fill="url(#serviceGradient6)" />
                    <rect x="20" y="20" width="20" height="20" rx="2" stroke="white" strokeWidth="2" fill="none" />
                    <defs>
                        <linearGradient id="serviceGradient6" x1="0" y1="0" x2="60" y2="60">
                            <stop offset="0%" stopColor="#003366" />
                            <stop offset="100%" stopColor="#00D2FF" />
                        </linearGradient>
                    </defs>
                </svg>
            )
        }
    ];

    return (
        <section className="services section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        Our <span className="gradient-text-static">Services</span>
                    </h2>
                    <p className="section-subtitle">Comprehensive animation solutions for every need</p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card card">
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
