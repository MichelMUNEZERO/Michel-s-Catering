import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  describe("Rendering", () => {
    it("should render Quick Links section", () => {
      render(<Footer />);
      expect(screen.getByText("Quick Links")).toBeInTheDocument();
    });

    it("should render Contact Information section", () => {
      render(<Footer />);
      expect(screen.getByText("Contact Information")).toBeInTheDocument();
    });

    it("should render all navigation links", () => {
      render(<Footer />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Services")).toBeInTheDocument();
      expect(screen.getByText("Meet Our Team")).toBeInTheDocument();
      expect(screen.getByText("About Us")).toBeInTheDocument();
      expect(screen.getByText("Reviews")).toBeInTheDocument();
      expect(screen.getByText("Gallery")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });
  });

  describe("Gallery Toggle", () => {
    it("should call toggleGallery when gallery link is clicked", () => {
      const toggleGallery = vi.fn();
      render(<Footer toggleGallery={toggleGallery} />);

      const galleryLink = screen.getByText("Gallery");
      fireEvent.click(galleryLink);

      expect(toggleGallery).toHaveBeenCalledTimes(1);
    });

    it("should not throw error if toggleGallery is not provided", () => {
      render(<Footer />);

      const galleryLink = screen.getByText("Gallery");
      expect(() => fireEvent.click(galleryLink)).not.toThrow();
    });
  });

  describe("Footer Links", () => {
    it("should have correct href attributes", () => {
      render(<Footer />);

      const homeLink = screen.getByText("Home").closest("a");
      const servicesLink = screen.getByText("Services").closest("a");
      const contactLink = screen.getByText("Contact").closest("a");

      expect(homeLink).toHaveAttribute("href", "#home");
      expect(servicesLink).toHaveAttribute("href", "#services");
      expect(contactLink).toHaveAttribute("href", "#contact");
    });
  });

  describe("Footer Structure", () => {
    it("should render footer element", () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
    });

    it("should have footer-content wrapper", () => {
      const { container } = render(<Footer />);
      const content = container.querySelector(".footer-content");
      expect(content).toBeInTheDocument();
    });

    it("should have footer sections", () => {
      const { container } = render(<Footer />);
      const sections = container.querySelectorAll(".footer-section");
      expect(sections.length).toBeGreaterThan(0);
    });

    it("should display copyright information", () => {
      render(<Footer />);
      expect(screen.getByText(/Copyright.*Kamuta Ltd/i)).toBeInTheDocument();
    });
  });
});
