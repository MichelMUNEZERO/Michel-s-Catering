import React, { useState } from "react";

const Contact = () => {
  const [showMap, setShowMap] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);

    try {
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
    } catch (_error) {
      alert(
        "❌ Failed to send message. Please try WhatsApp or call us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    // WhatsApp number (use international format without + or spaces)
    const message = "Hello! I'm interested in your catering services.";
    const url = `https://api.whatsapp.com/send?phone=250788309472&text=${encodeURIComponent(
      message
    )}`;

    // Open WhatsApp
    window.open(url, "_blank");
  };

  const handleLocationClick = () => {
    // Toggle map display or open in new tab
    setShowMap(!showMap);
  };

  const _openGoogleMaps = () => {
    // Open Google Maps with exact KAMUTA location
    const url =
      "https://www.google.com/maps/place/KAMUTA/@-1.9601887,30.1254034,1141m/data=!3m1!1e3!4m15!1m8!3m7!1s0x19dca7a206ea481d:0x2ad9a414dcfd7c08!2sKK+61+St,+Kigali!3b1!8m2!3d-1.9617775!4d30.1347594!16s%2Fg%2F12xqg4_tm!3m5!1s0x19dca763f677eedb:0xbd8af6c65569355e!8m2!3d-1.9610126!4d30.1209256!16s%2Fg%2F11hwyk331r?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D";
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
          <div
            className="info-item clickable-location"
            onClick={handleLocationClick}
            onMouseEnter={() => setShowMap(true)}
            style={{ cursor: "pointer", position: "relative" }}
          >
            <i className="fas fa-map-marker-alt"></i>
            <h3>Location</h3>
            <p>KK61st Kn5rd kigali</p>
            <p>Kigali, Rwanda</p>

            {showMap && (
              <div
                className="map-preview"
                onMouseLeave={() => setShowMap(false)}
              >
                <div className="map-preview-header">
                  <h4>Our Location</h4>
                </div>
                <iframe
                  title="Kamuta Ltd Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5366728395637!2d30.118336475728!3d-1.9610126979960456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca763f677eedb%3A0xbd8af6c65569355e!2sKAMUTA!5e0!3m2!1sen!2srw!4v1700000000000!5m2!1sen!2srw"
                  width="100%"
                  height="350"
                  style={{ border: 0, borderRadius: "8px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
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
            <button
              type="submit"
              className="cta-button submit-email-btn"
              disabled={isSubmitting}
            >
              <i
                className={
                  isSubmitting ? "fas fa-spinner fa-spin" : "fas fa-envelope"
                }
              ></i>
              {isSubmitting ? " Sending..." : " Send via Email"}
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
