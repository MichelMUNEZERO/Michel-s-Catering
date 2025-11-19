import React from "react";

const Footer = ({ toggleGallery }) => {
  const handleGalleryClick = (e) => {
    e.preventDefault();
    if (toggleGallery) {
      toggleGallery();
    }
  };

  return (
    <footer>
      {/* 
        Website Designed & Developed by Michel Munezero - Frontend Developer
        Email: michelmunezero25@gmail.com
        LinkedIn: www.linkedin.com/in/michelmunezero
        Instagram: @lehcimunna
        X (Twitter): @lehcimunnaa
      */}
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
              <a href="#gallery" onClick={handleGalleryClick}>
                Gallery
              </a>
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
              <i className="fas fa-envelope"></i> delishkamuta@gmail.com
            </li>
            <li>
              <i className="fas fa-envelope"></i> fridamutesi@gmail.com
            </li>
            <li>
              <i className="fas fa-phone"></i> +250788301848
            </li>
            <li>
              <i className="fas fa-phone"></i> +250788309472
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i> Kigali, Rwanda
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a
              href="https://www.facebook.com/profile.php?id=61568564767283"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/kamuta_ltd?igsh=eGFlYnAzY3hneXVl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://x.com/KamutaLtd?t=mEMRo0_6QsFNGqRvOC84Rw&s=09"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/kamuta-ltd/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://wa.me/qr/CUQINPFSCEHSN1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a
              href="https://www.tiktok.com/@kamuta_ltd?_t=ZM-8sZ9j8wkRmq&_r=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-tiktok"></i>
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
        <p>
          Copyright &copy; 2015 Kamuta Ltd. All Rights Reserved. Designed By
          Michel MUNEZERO
        </p>
      </div>
    </footer>
  );
};

export default Footer;
