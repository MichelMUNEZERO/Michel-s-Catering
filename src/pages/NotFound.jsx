import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">
          <i className="fas fa-utensils"></i>
        </div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oops! Page Not Found</h2>
        <p className="not-found-text">
          Sorry, the page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        <div className="not-found-buttons">
          <Link to="/" className="cta-button">
            <i className="fas fa-home"></i> Back to Home
          </Link>
          <a href="/#contact" className="cta-button secondary">
            <i className="fas fa-envelope"></i> Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
