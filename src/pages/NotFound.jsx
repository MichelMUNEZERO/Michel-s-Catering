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
      </div>
    </div>
  );
};

export default NotFound;
