import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import InteractiveVideoPlayer from '../components/InteractiveVideoPlayer';
import MotionCanvasPlayer from '../components/MotionCanvasPlayer';
import './Editor.css';

function Editor() {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedPanel, setSelectedPanel] = useState('properties');
    const [selectedSvgIndex, setSelectedSvgIndex] = useState(1); // 0: left, 1: center, 2: right
    const [showVideo, setShowVideo] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [showMotionCanvas, setShowMotionCanvas] = useState(false);

    const svgOptions = [
        '/animation1.svg',
        '/animation7.svg',
        '/animation2.svg'
    ];

    const handleTestAnimation = () => {
        // Load the HumanEvolution animation
        setCurrentVideo('/manim_animations/media/videos/human_evolution/480p15/HumanEvolution.mp4');
        setShowVideo(true);
        setShowMotionCanvas(false);
    };

    const handleTestMotionCanvas = () => {
        // Show interactive Motion Canvas animation
        setShowMotionCanvas(true);
        setShowVideo(false);
    };

    const handleSend = async () => {
        if (!input.trim() || isGenerating) return;

        setIsGenerating(true);
        const command = input;
        setInput('');

        // Simulate AI response and load SVG
        setTimeout(() => {
            setOutput(command);
            setIsGenerating(false);
        }, 2000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="video-editor">
            {/* Top Toolbar */}
            <header className="editor-toolbar">
                <div className="toolbar-left">
                    <svg className="toolbar-logo" width="180" height="50" viewBox="0 0 600 200" fill="none">
                        <defs>
                            <linearGradient id="heroMotionGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#003366" />
                                <stop offset="50%" stopColor="#4A00E0" />
                                <stop offset="100%" stopColor="#00D2FF" />
                            </linearGradient>
                        </defs>
                        <g transform="translate(50, 50) scale(1.2)">
                            <path
                                d="M10,80 L10,10 C10,4.5 14.5,0 20,0 L50,0 C45,5 45,15 50,20 L50,90 C45,85 45,75 50,70 L20,70 C14.5,70 10,74.5 10,80 Z"
                                fill="#003366" />
                            <path
                                d="M10,80 C10,85.5 14.5,90 20,90 L50,90 C45,85 45,75 50,70 L20,70 C14.5,70 10,74.5 10,80 Z"
                                fill="#002244" />
                            <path d="M50,20 C60,20 75,10 90,0 L110,15 C95,25 75,40 50,35 L50,20 Z"
                                fill="url(#heroMotionGradient)" />
                            <path d="M50,35 C70,40 85,30 100,20 L115,30 C100,45 75,55 50,50 L50,35 Z"
                                fill="url(#heroMotionGradient)" opacity="0.7" />
                            <g fill="#FFFFFF">
                                <rect x="92" y="4" width="4" height="3" rx="1" transform="rotate(-15 94 5.5)" />
                                <rect x="102" y="10" width="4" height="3" rx="1" transform="rotate(-20 104 11.5)" />
                                <rect x="112" y="17" width="4" height="3" rx="1" transform="rotate(-25 114 18.5)" />
                            </g>
                        </g>
                        <g transform="translate(220, 125)">
                            <text fontSize="48" fontFamily="Montserrat" fontWeight="700" fill="#003366">Chapter</text>
                            <text x="215" fontSize="48" fontFamily="Montserrat" fontWeight="400" fill="#4A00E0">Motion</text>
                        </g>
                    </svg>
                </div>

                <div className="toolbar-center">
                    <div className="editor-settings">
                        <button className="setting-btn">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M2 8h12M8 2v12" />
                            </svg>
                            <span>Fade In</span>
                        </button>
                        <button className="setting-btn">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <circle cx="8" cy="8" r="6" stroke="currentColor" fill="none" strokeWidth="1.5" />
                                <path d="M8 5v6" />
                            </svg>
                            <span>Speed: 1x</span>
                        </button>
                        <button className="setting-btn">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M3 8Q8 3 13 8" stroke="currentColor" fill="none" strokeWidth="1.5" />
                            </svg>
                            <span>Ease In-Out</span>
                        </button>
                    </div>
                </div>

                <div className="toolbar-right">
                    <button className="toolbar-btn">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        New Project
                    </button>
                    <button className="toolbar-btn" onClick={handleTestAnimation}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path d="M7 6l5 3-5 3V6z" fill="currentColor" />
                        </svg>
                        Test Video
                    </button>
                    <button className="toolbar-btn" onClick={handleTestMotionCanvas}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="9" r="6" fill="#FF0000" />
                            <path d="M6 12l6-3-6-3z" fill="#FFF" />
                        </svg>
                        Test Interactive
                    </button>
                    <button className="toolbar-btn gradient-btn">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M4 10l4 4 8-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Export
                    </button>
                </div>
            </header>

            {/* Main Workspace */}
            <div className="editor-workspace">
                {/* Left Sidebar - Templates */}
                <aside className="panel panel-left">
                    <div className="panel-header">
                        <h3>Templates</h3>
                    </div>
                    <div className="panel-content">
                        <div className="template-list">
                            <div className="template-item">
                                <div className="template-icon">🎬</div>
                                <span>Explainer Video</span>
                            </div>
                            <div className="template-item">
                                <div className="template-icon">📊</div>
                                <span>Data Visualization</span>
                            </div>
                            <div className="template-item">
                                <div className="template-icon">🎓</div>
                                <span>Educational</span>
                            </div>
                            <div className="template-item">
                                <div className="template-icon">📱</div>
                                <span>Social Media</span>
                            </div>
                            <div className="template-item">
                                <div className="template-icon">🎨</div>
                                <span>Custom</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Center - Animation Preview & Input */}
                <main className="panel panel-center">
                    {/* Animation Preview Area */}
                    <div className="animation-preview-area">
                        {showMotionCanvas ? (
                            <MotionCanvasPlayer
                                onClose={() => setShowMotionCanvas(false)}
                            />
                        ) : showVideo && currentVideo ? (
                            <InteractiveVideoPlayer
                                videoUrl={currentVideo}
                                onClose={() => setShowVideo(false)}
                            />
                        ) : output ? (
                            <>
                                <div className="svg-carousel">
                                    {/* Left SVG */}
                                    <div
                                        className="svg-side svg-left"
                                        onClick={() => setSelectedSvgIndex((prev) => (prev - 1 + 3) % 3)}
                                    >
                                        <img
                                            src={svgOptions[(selectedSvgIndex - 1 + 3) % 3]}
                                            alt="Previous Animation"
                                        />
                                    </div>

                                    {/* Center SVG (Main) */}
                                    <div className="svg-main">
                                        <img
                                            src={svgOptions[selectedSvgIndex]}
                                            alt="Current Animation"
                                            className="svg-animation-display"
                                        />
                                    </div>

                                    {/* Right SVG */}
                                    <div
                                        className="svg-side svg-right"
                                        onClick={() => setSelectedSvgIndex((prev) => (prev + 1) % 3)}
                                    >
                                        <img
                                            src={svgOptions[(selectedSvgIndex + 1) % 3]}
                                            alt="Next Animation"
                                        />
                                    </div>
                                </div>
                                {/* CapCut-Style Timeline */}
                                <div className="capcut-timeline">
                                    <div className="timeline-content">
                                        <div className="timeline-ruler">
                                            <span>0:00</span>
                                            <span>0:03</span>
                                            <span>0:06</span>
                                            <span>0:09</span>
                                            <span>0:12</span>
                                            <span>0:15</span>
                                        </div>
                                        <div className="track-content">
                                            <div className="frame-thumbnails">
                                                <div className="frame-thumb">
                                                    <img src="/animation7.svg" alt="Frame 1" />
                                                </div>
                                                <div className="frame-thumb">
                                                    <img src="/animation7.svg" alt="Frame 2" />
                                                </div>
                                                <div className="frame-thumb">
                                                    <img src="/animation7.svg" alt="Frame 3" />
                                                </div>
                                                <div className="frame-thumb">
                                                    <img src="/animation7.svg" alt="Frame 4" />
                                                </div>
                                                <div className="frame-thumb">
                                                    <img src="/animation7.svg" alt="Frame 5" />
                                                </div>
                                            </div>
                                            <div className="playhead-line"></div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="preview-placeholder-area">
                                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                                    <rect x="10" y="10" width="80" height="80" rx="8" stroke="#E8E8ED" strokeWidth="2" strokeDasharray="8 8" />
                                    <circle cx="50" cy="45" r="20" stroke="#E8E8ED" strokeWidth="2" />
                                    <path d="M42 38L58 45L42 52V38Z" fill="#E8E8ED" />
                                </svg>
                                <h3>Your Animation Will Appear Here</h3>
                                <p>Type a command below to generate your animation</p>
                            </div>
                        )}
                    </div>

                    {/* Command Input Area */}
                    <div className="command-input-area">
                        <div className="command-input-wrapper">
                            <textarea
                                className="command-input"
                                placeholder="Describe your animation... (e.g., 'Create a 30-second explainer video about renewable energy with smooth transitions')"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                rows="2"
                            />
                            <button
                                className="generate-button gradient-btn"
                                onClick={handleSend}
                                disabled={!input.trim() || isGenerating}
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="spinner-small"></div>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 3L10 17M10 3L6 7M10 3L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Generate Animation
                                    </>
                                )}
                            </button>
                        </div>
                        {isGenerating && (
                            <div className="generating-badge-inline">
                                <div className="spinner-small"></div>
                                <span>Generating animation...</span>
                            </div>
                        )}
                    </div>
                </main>

                {/* Right Sidebar - Settings */}
                <aside className="panel panel-right">
                    <div className="panel-header">
                        <div className="panel-tabs">
                            <button
                                className={`panel-tab ${selectedPanel === 'properties' ? 'active' : ''}`}
                                onClick={() => setSelectedPanel('properties')}
                            >
                                Settings
                            </button>
                            <button
                                className={`panel-tab ${selectedPanel === 'effects' ? 'active' : ''}`}
                                onClick={() => setSelectedPanel('effects')}
                            >
                                Style
                            </button>
                        </div>
                    </div>
                    <div className="panel-content">
                        {selectedPanel === 'properties' ? (
                            <div className="properties-panel">
                                <div className="property-group">
                                    <label>Duration</label>
                                    <select className="property-select">
                                        <option>15 seconds</option>
                                        <option>30 seconds</option>
                                        <option>60 seconds</option>
                                        <option>Custom</option>
                                    </select>
                                </div>
                                <div className="property-group">
                                    <label>Resolution</label>
                                    <select className="property-select">
                                        <option>1920x1080 (Full HD)</option>
                                        <option>1280x720 (HD)</option>
                                        <option>3840x2160 (4K)</option>
                                    </select>
                                </div>
                                <div className="property-group">
                                    <label>Frame Rate</label>
                                    <select className="property-select">
                                        <option>30 fps</option>
                                        <option>60 fps</option>
                                    </select>
                                </div>
                                <div className="property-group">
                                    <label>Voice Over</label>
                                    <div className="toggle-switch">
                                        <input type="checkbox" id="voiceover" />
                                        <label htmlFor="voiceover"></label>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="effects-panel">
                                <div className="style-grid">
                                    <div className="style-item active">
                                        <div className="style-preview gradient-bg"></div>
                                        <span>Modern</span>
                                    </div>
                                    <div className="style-item">
                                        <div className="style-preview"></div>
                                        <span>Minimal</span>
                                    </div>
                                    <div className="style-item">
                                        <div className="style-preview"></div>
                                        <span>Corporate</span>
                                    </div>
                                    <div className="style-item">
                                        <div className="style-preview"></div>
                                        <span>Creative</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Editor;
