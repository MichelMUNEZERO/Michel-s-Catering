import React from "react";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="section-title">
        <h2>About Us</h2>
        <p>Learn more about our story and commitment to excellence</p>
      </div>
      <div className="about-content">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Our Team"
          />
        </div>
        <div className="about-text">
          <h3>Our Story</h3>
          <p>
            Founded in 2024, Michel's Catering Services has been serving Kigali
            with exceptional culinary experiences. Our journey began with a
            simple mission: to provide high-quality, delicious food for every
            occasion.
          </p>
          <h3>Our Mission</h3>
          <p>
            We are committed to creating memorable dining experiences through
            our passion for food, attention to detail, and dedication to
            customer satisfaction. Our team of professional chefs and staff work
            tirelessly to ensure every event is a success.
          </p>
          <h3>Why Choose Us</h3>
          <ul>
            <li>Experienced and professional team</li>
            <li>Fresh, high-quality ingredients</li>
            <li>Customized menu options</li>
            <li>Exceptional customer service</li>
            <li>Competitive pricing</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
