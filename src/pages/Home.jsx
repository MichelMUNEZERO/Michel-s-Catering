import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Team from "../components/Team";
import About from "../components/About";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Team />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
