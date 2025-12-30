import React from 'react';
import './Showcase.css';

const Showcase = () => {
    const videos = [
        { title: 'Tech Product Launch', description: 'Modern explainer animation for SaaS platform', duration: '1:45' },
        { title: 'Fashion Campaign', description: 'Dynamic social media animation series', duration: '0:30' },
        { title: 'Educational Series', description: 'Engaging character-driven storytelling', duration: '2:00' },
        { title: 'Brand Identity', description: 'Sleek logo reveal and brand animations', duration: '0:15' },
        { title: 'Data Visualization', description: 'Complex data brought to life', duration: '1:20' },
        { title: 'Architectural Walkthrough', description: 'Immersive 3D environment showcase', duration: '1:55' }
    ];

    return (
        <section className="showcase section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        Featured <span className="gradient-text-static">Work</span>
                    </h2>
                    <p className="section-subtitle">Explore our latest animated masterpieces</p>
                </div>

                <div className="featured-video card">
                    <div className="video-placeholder">
                        <div className="play-button">
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                <circle cx="40" cy="40" r="40" fill="url(#playGradient)" opacity="0.9" />
                                <path d="M32 25L55 40L32 55V25Z" fill="white" />
                                <defs>
                                    <linearGradient id="playGradient" x1="0" y1="0" x2="80" y2="80">
                                        <stop offset="0%" stopColor="#4A00E0" />
                                        <stop offset="100%" stopColor="#00D2FF" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="video-overlay">
                            <h3>Brand Story Animation</h3>
                            <p>2:30 min</p>
                        </div>
                    </div>
                </div>

                <div className="video-grid">
                    {videos.map((video, index) => (
                        <div key={index} className="video-card card">
                            <div className="video-container">
                                <div className="video-placeholder">
                                    <div className="play-button small">
                                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                                            <circle cx="25" cy="25" r="25" fill="url(#playGradient2)" opacity="0.9" />
                                            <path d="M20 15L35 25L20 35V15Z" fill="white" />
                                            <defs>
                                                <linearGradient id="playGradient2" x1="0" y1="0" x2="50" y2="50">
                                                    <stop offset="0%" stopColor="#4A00E0" />
                                                    <stop offset="100%" stopColor="#00D2FF" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div className="video-overlay">
                                        <p>{video.duration}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="video-info">
                                <h3>{video.title}</h3>
                                <p>{video.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Showcase;
