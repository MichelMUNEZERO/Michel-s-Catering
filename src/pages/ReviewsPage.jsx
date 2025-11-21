import React from "react";
import { useNavigate } from "react-router-dom";
import Reviews from "../components/Reviews";

const ReviewsPage = ({ darkMode, toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <div className="reviews-page">
      <header>
        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src="/src/Photo/KAMUTA LTD  LOGO.png" alt="Kamuta Ltd's Logo" />
          <h1>KAMUTA LTD</h1>
        </div>
        <div className="header-container">
          <nav className="main-nav">
            <a href="/" className="nav-link">
              Home
            </a>
            <a href="/#services" className="nav-link">
              Services
            </a>
            <a href="/#team" className="nav-link">
              Meet Our Team
            </a>
            <a href="/#about" className="nav-link">
              About Us
            </a>
            <a
              href="/reviews"
              className="nav-link"
              style={{ textDecoration: "underline" }}
            >
              Reviews
            </a>
            <a href="/#contact" className="nav-link">
              Contact
            </a>
          </nav>
        </div>
        <div className="auth-nav">
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button className="login-btn" onClick={() => navigate("/login")}>
            Log in
          </button>
          <button className="signup-btn" onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </div>
      </header>
      <Reviews />
    </div>
  );
};

export default ReviewsPage;
