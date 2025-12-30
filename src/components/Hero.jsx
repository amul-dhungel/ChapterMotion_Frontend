import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showGradient, setShowGradient] = useState(false);

  console.log('Hero component rendered!', { typedText, showGradient });

  const fullText = 'Bringing Stories to Life';

  const animations = [
    { src: '/animation1.svg', title: 'Ecosystem Dynamics', duration: 24000 },
    { src: '/animation7.svg', title: 'Data Visualization', duration: 15000 },
    { src: '/animation3.svg', title: 'Scientific Animation', duration: 22000 }
  ];

  // Typing animation effect
  useEffect(() => {
    console.log('Typing effect running, typedText length:', typedText.length, 'fullText length:', fullText.length);

    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (typedText.length === fullText.length && !showGradient) {
      const timeout = setTimeout(() => {
        console.log('Showing gradient text now');
        setShowGradient(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // SVG carousel effect
  useEffect(() => {
    // Force SVG to reload and restart animation from beginning
    setAnimationKey(prev => prev + 1);

    const timer = setTimeout(() => {
      setCurrentAnimation((prev) => (prev + 1) % animations.length);
    }, animations[currentAnimation].duration);

    return () => clearTimeout(timer);
  }, [currentAnimation]);

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="container">
        <div className="hero-split">
          {/* Left Side - Content */}
          <div className="hero-left">
            <div className="hero-logo">
              <Logo size="medium" />
            </div>

            <h1 className="hero-motto">
              {typedText}
              {typedText.length < fullText.length && <span className="typing-cursor">|</span>}
              {showGradient && (
                <>
                  <br />
                  <span className="gradient-text gradient-reveal" style={{ visibility: 'visible' }}>
                    Through Motion
                  </span>
                  {console.log('Gradient text element rendered!')}
                </>
              )}
            </h1>

            <p className="hero-description">
              You craft 2D stunning animated motion picture that captivate audiences and elevate your teaching, learning and story telling experiences.
            </p>

            <div className="hero-buttons">
              <button className="btn btn-primary">View Our Work</button>
              <button className="btn btn-secondary" onClick={() => navigate('/editor')}>Start a Project</button>
            </div>
          </div>

          {/* Right Side - Pyramid SVG Showcase */}
          <div className="hero-right">
            <div className="pyramid-showcase">
              {/* Large Top Animation - Currently Playing */}
              <div className="animation-card large">
                <div className="animation-frame">
                  <img
                    src={`${animations[currentAnimation].src}?t=${animationKey}`}
                    alt={animations[currentAnimation].title}
                    className="svg-animation"
                    key={`${currentAnimation}-${animationKey}`}
                  />
                </div>
              </div>

              {/* Bottom Two Smaller Animations */}
              <div className="pyramid-bottom">
                <div className="animation-card small">
                  <div className="animation-frame">
                    <img
                      src={animations[(currentAnimation + 1) % animations.length].src}
                      alt={animations[(currentAnimation + 1) % animations.length].title}
                      className="svg-animation"
                    />
                  </div>
                </div>

                <div className="animation-card small">
                  <div className="animation-frame">
                    <img
                      src={animations[(currentAnimation + 2) % animations.length].src}
                      alt={animations[(currentAnimation + 2) % animations.length].title}
                      className="svg-animation"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;

