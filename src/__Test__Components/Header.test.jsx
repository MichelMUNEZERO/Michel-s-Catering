import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderHeader = (props = {}) => {
  const defaultProps = {
    toggleGallery: vi.fn(),
    darkMode: false,
    toggleTheme: vi.fn(),
  };

  return render(
    <BrowserRouter>
      <Header {...defaultProps} {...props} />
    </BrowserRouter>
  );
};

describe("Header Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe("Rendering", () => {
    it("should render the logo and company name", () => {
      renderHeader();

      expect(screen.getByAltText("Kamuta Ltd's Logo")).toBeInTheDocument();
      expect(screen.getByText("KAMUTA LTD")).toBeInTheDocument();
    });

    it("should render all navigation links", () => {
      renderHeader();

      const links = [
        "Home",
        "Services",
        "Meet Our Team",
        "About Us",
        "Gallery",
        "Contact",
      ];
      links.forEach((linkText) => {
        expect(screen.getAllByText(linkText)[0]).toBeInTheDocument();
      });
    });

    it("should render theme toggle button", () => {
      renderHeader();

      const themeButton = screen.getByLabelText("Toggle dark mode");
      expect(themeButton).toBeInTheDocument();
    });

    it("should render mobile menu toggle button", () => {
      renderHeader();

      const menuButton = screen.getByLabelText("Toggle mobile menu");
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe("Logo Click Navigation", () => {
    it("should navigate to home page when logo is clicked", () => {
      renderHeader();

      const logo = screen.getByAltText("Kamuta Ltd's Logo");
      fireEvent.click(logo);

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("should navigate to home page when company name is clicked", () => {
      renderHeader();

      const companyName = screen.getByText("KAMUTA LTD");
      fireEvent.click(companyName);

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  describe("Theme Toggle", () => {
    it("should call toggleTheme when theme button is clicked", () => {
      const toggleTheme = vi.fn();
      renderHeader({ toggleTheme });

      const themeButton = screen.getByLabelText("Toggle dark mode");
      fireEvent.click(themeButton);

      expect(toggleTheme).toHaveBeenCalledTimes(1);
    });
  });

  describe("Gallery Toggle", () => {
    it("should call toggleGallery when gallery link is clicked", () => {
      const toggleGallery = vi.fn();
      renderHeader({ toggleGallery });

      const galleryLinks = screen.getAllByText("Gallery");
      fireEvent.click(galleryLinks[0]);

      expect(toggleGallery).toHaveBeenCalledTimes(1);
    });

    it("should not throw error if toggleGallery is not provided", () => {
      renderHeader({ toggleGallery: undefined });

      const galleryLinks = screen.getAllByText("Gallery");
      expect(() => fireEvent.click(galleryLinks[0])).not.toThrow();
    });
  });

  describe("Mobile Menu", () => {
    it("should open mobile menu when hamburger is clicked", () => {
      renderHeader();

      const menuButton = screen.getByLabelText("Toggle mobile menu");
      fireEvent.click(menuButton);

      const nav = document.querySelector(".main-nav");
      expect(nav).toHaveClass("mobile-nav-open");
    });

    it("should close mobile menu when close button is clicked", () => {
      renderHeader();

      // Open menu
      const menuButton = screen.getByLabelText("Toggle mobile menu");
      fireEvent.click(menuButton);

      // Close menu
      const closeButton = screen.getByLabelText("Close mobile menu");
      fireEvent.click(closeButton);

      const nav = document.querySelector(".main-nav");
      expect(nav).not.toHaveClass("mobile-nav-open");
    });

    it("should close mobile menu when navigation link is clicked", () => {
      renderHeader();

      // Open menu
      const menuButton = screen.getByLabelText("Toggle mobile menu");
      fireEvent.click(menuButton);

      // Click a navigation link
      const serviceLinks = screen.getAllByText("Services");
      fireEvent.click(serviceLinks[0]);

      const nav = document.querySelector(".main-nav");
      expect(nav).not.toHaveClass("mobile-nav-open");
    });

    it("should close mobile menu when logo is clicked", () => {
      renderHeader();

      // Open menu
      const menuButton = screen.getByLabelText("Toggle mobile menu");
      fireEvent.click(menuButton);

      // Click logo
      const logo = screen.getByAltText("Kamuta Ltd's Logo");
      fireEvent.click(logo);

      const nav = document.querySelector(".main-nav");
      expect(nav).not.toHaveClass("mobile-nav-open");
    });

    it("should add mobile-menu-open class to body when menu opens", () => {
      renderHeader();

      const menuButton = screen.getByLabelText("Toggle mobile menu");
      fireEvent.click(menuButton);

      expect(document.body.classList.contains("mobile-menu-open")).toBe(true);
    });

    it("should remove mobile-menu-open class from body when menu closes", () => {
      renderHeader();

      const menuButton = screen.getByLabelText("Toggle mobile menu");

      // Open menu
      fireEvent.click(menuButton);
      expect(document.body.classList.contains("mobile-menu-open")).toBe(true);

      // Close menu
      fireEvent.click(menuButton);
      expect(document.body.classList.contains("mobile-menu-open")).toBe(false);
    });
  });

  describe("Navigation Links", () => {
    it("should have correct href for each navigation link", () => {
      renderHeader();

      const expectedLinks = [
        { text: "Home", href: "#home" },
        { text: "Services", href: "#services" },
        { text: "Meet Our Team", href: "#team" },
        { text: "About Us", href: "#about" },
        { text: "Gallery", href: "#gallery" },
        { text: "Contact", href: "#contact" },
      ];

      expectedLinks.forEach(({ text, href }) => {
        const links = screen.getAllByText(text);
        const link = links.find((el) => el.tagName === "A");
        expect(link).toHaveAttribute("href", href);
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper aria-labels on buttons", () => {
      renderHeader();

      expect(screen.getByLabelText("Toggle dark mode")).toBeInTheDocument();
      expect(screen.getByLabelText("Toggle mobile menu")).toBeInTheDocument();
    });

    it("should have close button with aria-label when mobile menu is open", () => {
      renderHeader();

      const menuButton = screen.getByLabelText("Toggle mobile menu");
      fireEvent.click(menuButton);

      expect(screen.getByLabelText("Close mobile menu")).toBeInTheDocument();
    });
  });

  describe("Cleanup on Unmount", () => {
    it("should remove mobile-menu-open class from body on unmount", () => {
      const { unmount } = renderHeader();

      // Open menu
      const menuButton = screen.getByLabelText("Toggle mobile menu");
      fireEvent.click(menuButton);

      expect(document.body.classList.contains("mobile-menu-open")).toBe(true);

      // Unmount component
      unmount();

      expect(document.body.classList.contains("mobile-menu-open")).toBe(false);
    });
  });
});
