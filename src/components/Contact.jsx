import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send to all three email addresses
      const emails = [
        "michelmunezero25@gmail.com",
        "delishkamuta@gmail.com",
        "fridamutesi@gmail.com",
      ];

      const emailData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "Service Inquiry from Website",
        message: formData.message,
        _cc: "delishkamuta@gmail.com,fridamutesi@gmail.com", // CC the other emails
      };

      const response = await fetch(
        "https://formsubmit.co/ajax/michelmunezero25@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );

      if (response.ok) {
        alert(
          "✅ Message sent successfully to all team members! We'll get back to you soon."
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      alert(
        "❌ Failed to send message. Please try WhatsApp or call us directly."
      );
    }
  };

  const handleWhatsApp = () => {
    // WhatsApp number (use international format without + or spaces)
    const message = "Hello! I'm interested in your catering services.";
    const url = `https://api.whatsapp.com/send?phone=250788301848&text=${encodeURIComponent(
      message
    )}`;

    // Open WhatsApp
    window.open(url, "_blank");
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-title">
        <h2>Contact Us</h2>
        <p>Get in touch with us for your next event</p>
      </div>
      <div className="contact-container">
        <div className="contact-info">
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Location</h3>
            <p>Kigali, Rwanda</p>
          </div>
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <h3>Phone</h3>
            <p>+250788301848</p>
            <p>+250788309472</p>
          </div>
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <h3>Email</h3>
            <p>delishkamuta@gmail.com</p>
            <p>fridamutesi@gmail.com</p>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
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
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="contact-buttons">
            <button type="submit" className="cta-button submit-email-btn">
              <i className="fas fa-envelope"></i> Send via Email
            </button>
            <button
              type="button"
              className="cta-button whatsapp-btn"
              onClick={handleWhatsApp}
            >
              <i className="fab fa-whatsapp"></i> Chat on WhatsApp
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
