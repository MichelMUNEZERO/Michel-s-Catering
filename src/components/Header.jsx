import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header>
      <div
        className="logo"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
          alt="Michel's Catering Logo"
        />
        <h1>Michel's Catering</h1>
      </div>
      <div className="header-container">
        <nav className="main-nav">
          <a href="#home" className="nav-link">
            Home
          </a>
          <a href="#services" className="nav-link">
            Services
          </a>
          <a href="#about" className="nav-link">
            About Us
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </nav>
      </div>
      <div className="auth-nav">
        <button className="login-btn" onClick={handleLogin}>
          Log in
        </button>
        <button className="signup-btn" onClick={handleSignup}>
          Sign up
        </button>
      </div>
    </header>
  );
};

export default Header;
