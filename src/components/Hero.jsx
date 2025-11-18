import React from "react";

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <h1>Exquisite Catering Services</h1>
        <p>
          Creating unforgettable culinary experiences for your special occasions
        </p>
        <button
          className="cta-button"
          onClick={() =>
            window.open(
              "https://bysubmityourrquesttotheformtroughtoouremail",
              "_blank"
            )
          }
        >
          Book Our Services
        </button>
        {/* // "https://bysubmityourrequesttoourwhatsappnumberdirectresponse", */}
        <button
          className="cta-button"
          onClick={() =>
            window.open("https://wa.me/qr/CUQINPFSCEHSN1", "_blank")
          }
        >
          Book Our Services <i className="fab fa-whatsapp-in"></i>
        </button>
      </div>
    </section>
  );
};

export default Hero;
