import React from "react";
import "../Clients.css";

const Clients = () => {
  const clientLogos = [
    {
      src: "/src/Photo/Our client's Logo/Discovery School logo.jpg",
      alt: "Discovery School",
    },
    {
      src: "/src/Photo/Our client's Logo/logo FAO.png",
      alt: "FAO",
    },
    {
      src: "/src/Photo/Our client's Logo/LOGO-PAM-300x151.jpg",
      alt: "PAM",
    },
    {
      src: "/src/Photo/Our client's Logo/portrait_ur_logo.jpg",
      alt: "University of Rwanda",
    },
    {
      src: "/src/Photo/Our client's Logo/REG LOGO.png",
      alt: "REG",
    },
    {
      src: "/src/Photo/Our client's Logo/UNDP LOGO.png",
      alt: "UNDP",
    },
  ];

  return (
    <section className="clients-section">
      <div className="section-title">
        <h2>Our Clients</h2>
        <p>Proud to serve leading organizations across Rwanda</p>
      </div>
      <div className="scroller-container">
        <div className="scroller">
          {/* First set of cards */}
          {clientLogos.map((client, index) => (
            <div key={`client-${index}`} className="card">
              <img src={client.src} alt={client.alt} className="card-image" />
            </div>
          ))}

          {/* Duplicate set for seamless looping */}
          {clientLogos.map((client, index) => (
            <div key={`client-duplicate-${index}`} className="card">
              <img src={client.src} alt={client.alt} className="card-image" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
