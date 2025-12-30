import React from 'react';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <Logo size="small" />
                        <p>Creating stunning animations that captivate and inspire.</p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#about">About Us</a></li>
                                <li><a href="#services">Services</a></li>
                                <li><a href="#showcase">Portfolio</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Follow Us</h4>
                            <ul>
                                <li><a href="#">Instagram</a></li>
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">LinkedIn</a></li>
                                <li><a href="#">YouTube</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 Chapter Motion. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
