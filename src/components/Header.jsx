import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { CgDarkMode } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { RiTeamLine } from "react-icons/ri";
import { IoIosContact } from "react-icons/io";
import { FaServicestack } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";

const Header = ({ toggleGallery, darkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("mobile-menu-open");
    };
  }, [mobileMenuOpen]);

  const handleLogoClick = () => {
    navigate("/");
    setMobileMenuOpen(false);
  };

  const handleGalleryClick = (e) => {
    e.preventDefault();
    if (toggleGallery) {
      toggleGallery();
    }
    setMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header>
      <div
        className="logo"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <img src="/Photo/KAMUTA LTD  LOGO.png" alt="Kamuta Ltd's Logo" />
        <h1>KAMUTA LTD</h1>
      </div>
      <div className="header-container">
        <nav className={`main-nav ${mobileMenuOpen ? "mobile-nav-open" : ""}`}>
          <a href="#home" className="nav-link" onClick={handleNavClick}>
            <FaHome className="mobile-icon" />
            Home
          </a>
          <a href="#services" className="nav-link" onClick={handleNavClick}>
            <FaServicestack className="mobile-icon" />
            Services
          </a>
          <a href="#team" className="nav-link" onClick={handleNavClick}>
            <RiTeamLine className="mobile-icon" />
            Meet Our Team
          </a>
          <a href="#about" className="nav-link" onClick={handleNavClick}>
            <FcAbout className="mobile-icon" />
            About Us
          </a>
          <a href="#gallery" className="nav-link" onClick={handleGalleryClick}>
            <GrGallery className="mobile-icon" />
            Gallery
          </a>
          <a href="#contact" className="nav-link" onClick={handleNavClick}>
            <IoIosContact className="mobile-icon" />
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
          <CgDarkMode />
        </button>
        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <IoMenuSharp />
        </button>
      </div>
    </header>
  );
};

export default Header;
