import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#team">Meet Our Team</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#gallery">Gallery</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Information</h4>
          <ul>
            <li>
              <i className="fas fa-envelope"></i> michelmunezero25@gmail.com
            </li>
            <li>
              <i className="fas fa-phone"></i> +250 791 268 906
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i> Kigali, Rwanda
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://wa.me/qr/CUQINPFSCEHSN1">
              <i className="fab fa-whatsapp-in"></i>
            </a>
            <a href="#">
              <i className="fab fa-tiktok-in"></i>
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Business Hours</h4>
          <ul>
            <li>Monday - Friday: 8:00 AM - 6:00 PM</li>
            <li>Saturday: 9:00 AM - 5:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2024 Michel's Catering Services. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
