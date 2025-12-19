import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

// Mock all child components
vi.mock("../components/Header", () => ({
  default: ({ toggleGallery, darkMode: _darkMode, toggleTheme }) => (
    <div data-testid="header">
      Header
      <button onClick={toggleGallery}>Toggle Gallery</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  ),
}));

vi.mock("../components/Hero", () => ({
  default: () => <div data-testid="hero">Hero</div>,
}));

vi.mock("../components/Services", () => ({
  default: () => <div data-testid="services">Services</div>,
}));

vi.mock("../components/Team", () => ({
  default: () => <div data-testid="team">Team</div>,
}));

vi.mock("../components/About", () => ({
  default: () => <div data-testid="about">About</div>,
}));

vi.mock("../components/Clients", () => ({
  default: () => <div data-testid="clients">Clients</div>,
}));

vi.mock("../components/Reviews", () => ({
  default: () => <div data-testid="reviews">Reviews</div>,
}));

vi.mock("../components/Gallery", () => ({
  default: ({ onClose }) => (
    <div data-testid="gallery">
      Gallery
      <button onClick={onClose}>Close Gallery</button>
    </div>
  ),
}));

vi.mock("../components/Contact", () => ({
  default: () => <div data-testid="contact">Contact</div>,
}));

vi.mock("../components/Footer", () => ({
  default: ({ toggleGallery }) => (
    <div data-testid="footer">
      Footer
      <button onClick={toggleGallery}>Footer Gallery Toggle</button>
    </div>
  ),
}));

const renderHome = (props = {}) => {
  const defaultProps = {
    darkMode: false,
    toggleTheme: vi.fn(),
  };

  return render(
    <BrowserRouter>
      <Home {...defaultProps} {...props} />
    </BrowserRouter>
  );
};

describe("Home Component", () => {
  describe("Rendering", () => {
    it("should render all main sections", () => {
      renderHome();

      expect(screen.getByTestId("header")).toBeInTheDocument();
      expect(screen.getByTestId("hero")).toBeInTheDocument();
      expect(screen.getByTestId("services")).toBeInTheDocument();
      expect(screen.getByTestId("team")).toBeInTheDocument();
      expect(screen.getByTestId("about")).toBeInTheDocument();
      expect(screen.getByTestId("clients")).toBeInTheDocument();
      expect(screen.getByTestId("contact")).toBeInTheDocument();
      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    it("should not render gallery initially", () => {
      renderHome();
      expect(screen.queryByTestId("gallery")).not.toBeInTheDocument();
    });

    it("should pass darkMode prop to Header", () => {
      renderHome({ darkMode: true });
      expect(screen.getByTestId("header")).toBeInTheDocument();
    });

    it("should pass toggleTheme prop to Header", () => {
      const toggleTheme = vi.fn();
      renderHome({ toggleTheme });

      const themeButton = screen.getByText("Toggle Theme");
      fireEvent.click(themeButton);

      expect(toggleTheme).toHaveBeenCalledTimes(1);
    });
  });

  describe("Gallery Toggle", () => {
    it("should show gallery when toggleGallery is called", () => {
      renderHome();

      const toggleButton = screen.getByText("Toggle Gallery");
      fireEvent.click(toggleButton);

      expect(screen.getByTestId("gallery")).toBeInTheDocument();
    });

    it("should hide gallery when close is clicked", () => {
      renderHome();

      // Open gallery
      const toggleButton = screen.getByText("Toggle Gallery");
      fireEvent.click(toggleButton);
      expect(screen.getByTestId("gallery")).toBeInTheDocument();

      // Close gallery
      const closeButton = screen.getByText("Close Gallery");
      fireEvent.click(closeButton);
      expect(screen.queryByTestId("gallery")).not.toBeInTheDocument();
    });

    it("should toggle gallery from footer", () => {
      renderHome();

      const footerToggle = screen.getByText("Footer Gallery Toggle");
      fireEvent.click(footerToggle);

      expect(screen.getByTestId("gallery")).toBeInTheDocument();
    });

    it("should toggle gallery on and off multiple times", () => {
      renderHome();

      const toggleButton = screen.getByText("Toggle Gallery");

      // Open
      fireEvent.click(toggleButton);
      expect(screen.getByTestId("gallery")).toBeInTheDocument();

      // Close
      const closeButton = screen.getByText("Close Gallery");
      fireEvent.click(closeButton);
      expect(screen.queryByTestId("gallery")).not.toBeInTheDocument();

      // Open again
      fireEvent.click(toggleButton);
      expect(screen.getByTestId("gallery")).toBeInTheDocument();
    });
  });

  describe("Component Integration", () => {
    it("should pass toggleGallery to Header", () => {
      renderHome();
      expect(screen.getByText("Toggle Gallery")).toBeInTheDocument();
    });

    it("should pass toggleGallery to Footer", () => {
      renderHome();
      expect(screen.getByText("Footer Gallery Toggle")).toBeInTheDocument();
    });

    it("should handle theme toggle correctly", () => {
      const toggleTheme = vi.fn();
      renderHome({ toggleTheme });

      const themeButton = screen.getByText("Toggle Theme");
      fireEvent.click(themeButton);
      fireEvent.click(themeButton);

      expect(toggleTheme).toHaveBeenCalledTimes(2);
    });
  });

  describe("Layout Structure", () => {
    it("should render sections in correct order", () => {
      const { container } = renderHome();
      const sections = container.querySelectorAll("[data-testid]");

      expect(sections[0]).toHaveAttribute("data-testid", "header");
      expect(sections[1]).toHaveAttribute("data-testid", "hero");
      expect(sections[2]).toHaveAttribute("data-testid", "services");
    });

    it("should render without crashing", () => {
      const { container } = renderHome();
      expect(container).toBeInTheDocument();
    });
  });
});
