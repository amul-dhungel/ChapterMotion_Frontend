import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <section className="contact section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        Let's Create <span className="gradient-text-static">Together</span>
                    </h2>
                    <p className="section-subtitle">Ready to bring your vision to life? Get in touch with us today.</p>
                </div>

                <div className="contact-content">
                    <form className="contact-form card" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                rows="5"
                                placeholder="Tell us about your project"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Send Message</button>
                    </form>

                    <div className="contact-info">
                        <div className="info-item card">
                            <div className="info-icon">📧</div>
                            <div>
                                <h4>Email</h4>
                                <p>hello@chaptermotion.com</p>
                            </div>
                        </div>
                        <div className="info-item card">
                            <div className="info-icon">📱</div>
                            <div>
                                <h4>Phone</h4>
                                <p>+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="info-item card">
                            <div className="info-icon">📍</div>
                            <div>
                                <h4>Location</h4>
                                <p>New York, NY 10001</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
