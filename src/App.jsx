import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyChoose from './components/WhyChoose';
import Services from './components/Services';
import Team from './components/Team';
import Download from './components/Download';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen visible={loading} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyChoose />
        <Services />
        <Team />
        <Download />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
