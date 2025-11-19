import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleGallery }) => {
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

  const handleGalleryClick = (e) => {
    e.preventDefault();
    if (toggleGallery) {
      toggleGallery();
    }
  };

  return (
    <header>
      <div
        className="logo"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <img src="/src/Photo/KAMUTA LTD  LOGO.png" alt="Kamuta Ltd's Logo" />
        <h1>KAMUTA LTD</h1>
      </div>
      <div className="header-container">
        <nav className="main-nav">
          <a href="#home" className="nav-link">
            Home
          </a>
          <a href="#services" className="nav-link">
            Services
          </a>
          <a href="#team" className="nav-link">
            Meet Our Team
          </a>
          <a href="#about" className="nav-link">
            About Us
          </a>
          <a href="#gallery" className="nav-link" onClick={handleGalleryClick}>
            Gallery
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
