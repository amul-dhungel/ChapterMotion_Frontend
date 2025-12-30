import React, { useEffect, useRef, useState } from 'react';
import './About.css';

const About = () => {
    const [stats, setStats] = useState({ projects: 0, clients: 0, awards: 0 });
    const statsRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    animateStats();
                    setHasAnimated(true);
                }
            },
            { threshold: 0.5 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, [hasAnimated]);

    const animateStats = () => {
        const duration = 2000;
        const steps = 50;
        const stepTime = duration / steps;

        const targets = { projects: 500, clients: 200, awards: 50 };
        const increments = {
            projects: targets.projects / steps,
            clients: targets.clients / steps,
            awards: targets.awards / steps
        };

        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            setStats({
                projects: Math.min(Math.floor(increments.projects * currentStep), targets.projects),
                clients: Math.min(Math.floor(increments.clients * currentStep), targets.clients),
                awards: Math.min(Math.floor(increments.awards * currentStep), targets.awards)
            });

            if (currentStep >= steps) {
                clearInterval(interval);
            }
        }, stepTime);
    };

    return (
        <section className="about section">
            <div className="container">
                <div className="about-content">
                    <div className="about-text">
                        <h2 className="section-title">
                            About <span className="gradient-text-static">Chapter Motion</span>
                        </h2>
                        <p>
                            We are a passionate team of animators, designers, and storytellers dedicated to creating
                            exceptional animated content that resonates with audiences worldwide.
                        </p>
                        <p>
                            With years of experience and a commitment to excellence, we transform ideas into captivating
                            visual experiences that drive results and leave lasting impressions.
                        </p>

                        <div className="stats" ref={statsRef}>
                            <div className="stat-item">
                                <h3 className="gradient-text-static">{stats.projects}+</h3>
                                <p>Projects Completed</p>
                            </div>
                            <div className="stat-item">
                                <h3 className="gradient-text-static">{stats.clients}+</h3>
                                <p>Happy Clients</p>
                            </div>
                            <div className="stat-item">
                                <h3 className="gradient-text-static">{stats.awards}+</h3>
                                <p>Awards Won</p>
                            </div>
                        </div>
                    </div>

                    <div className="about-visual">
                        <div className="floating-card card">
                            <h4>Our Mission</h4>
                            <p>
                                To bring stories to life through innovative animation that inspires, engages, and transforms.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
