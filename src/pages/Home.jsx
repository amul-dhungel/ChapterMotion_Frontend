import React from 'react';
import Hero from '../components/Hero';
import Showcase from '../components/Showcase';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function Home() {
    return (
        <>
            <Hero />
            <Showcase />
            <Services />
            <About />
            <Contact />
            <Footer />
        </>
    );
}

export default Home;
