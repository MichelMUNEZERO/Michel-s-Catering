import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Team from "../components/Team";
import About from "../components/About";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  const [showGallery, setShowGallery] = useState(false);

  const toggleGallery = () => {
    setShowGallery(!showGallery);
  };

  return (
    <>
      <Header toggleGallery={toggleGallery} />
      <Hero />
      <Services />
      <Team />
      <About />
      {showGallery && <Gallery onClose={() => setShowGallery(false)} />}
      <Contact />
      <Footer toggleGallery={toggleGallery} />
    </>
  );
};

export default Home;
