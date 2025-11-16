import React from "react";

const Header = () => {
  return (
    <header>
      <div className="logo">
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
        <button className="login-btn">Log in</button>
        <button className="signup-btn">Sign up</button>
      </div>
    </header>
  );
};

export default Header;
