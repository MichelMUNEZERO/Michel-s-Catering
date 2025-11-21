import React from "react";

const Hero = () => {
  const handleEmailClick = () => {
    // Scroll to contact form
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWhatsApp = () => {
    const message = "Hello! I'd like to book your catering services.";
    const url = `https://api.whatsapp.com/send?phone=250788309472&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <h1 className="hero-title">Delish Kamuta Catering Services</h1>
        <span>Quality is our priority</span> {/* slogan */}
        <p>
          Creating unforgettable culinary experiences for your special occasions
        </p>
        <div className="hero-buttons">
          <button
            className="cta-button hero-email-btn"
            onClick={handleEmailClick}
          >
            <i className="fas fa-envelope"></i> Book via Email
          </button>
          <button
            className="cta-button hero-whatsapp-btn"
            onClick={handleWhatsApp}
          >
            <i className="fab fa-whatsapp"></i> Book via WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
