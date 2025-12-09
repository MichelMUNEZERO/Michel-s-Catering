import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Hero from "../components/Hero";

describe("Hero Component", () => {
  beforeEach(() => {
    // Mock window.open
    window.open = vi.fn();
  });

  describe("Rendering", () => {
    it("should render the hero title", () => {
      render(<Hero />);
      expect(
        screen.getByText("Delish Kamuta Catering Services")
      ).toBeInTheDocument();
    });

    it("should render the slogan", () => {
      render(<Hero />);
      expect(screen.getByText("Quality is our priority")).toBeInTheDocument();
    });

    it("should render the description", () => {
      render(<Hero />);
      expect(
        screen.getByText(/Creating unforgettable culinary experiences/i)
      ).toBeInTheDocument();
    });

    it("should render both CTA buttons", () => {
      render(<Hero />);
      expect(screen.getByText(/Book via Email/i)).toBeInTheDocument();
      expect(screen.getByText(/Book via WhatsApp/i)).toBeInTheDocument();
    });
  });

  describe("Email Button", () => {
    it("should scroll to contact section when email button is clicked", () => {
      const mockScrollIntoView = vi.fn();
      const contactSection = document.createElement("div");
      contactSection.id = "contact";
      contactSection.scrollIntoView = mockScrollIntoView;
      document.body.appendChild(contactSection);

      render(<Hero />);

      const emailButton = screen.getByText(/Book via Email/i);
      fireEvent.click(emailButton);

      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });

      document.body.removeChild(contactSection);
    });

    it("should not throw error if contact section does not exist", () => {
      render(<Hero />);

      const emailButton = screen.getByText(/Book via Email/i);
      expect(() => fireEvent.click(emailButton)).not.toThrow();
    });
  });

  describe("WhatsApp Button", () => {
    it("should open WhatsApp with correct phone number and message", () => {
      render(<Hero />);

      const whatsappButton = screen.getByText(/Book via WhatsApp/i);
      fireEvent.click(whatsappButton);

      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("250788309472"),
        "_blank"
      );
      const callArgs = window.open.mock.calls[0][0];
      expect(callArgs).toContain("Hello");
      expect(callArgs).toContain("book");
    });

    it("should encode WhatsApp message properly", () => {
      render(<Hero />);

      const whatsappButton = screen.getByText(/Book via WhatsApp/i);
      fireEvent.click(whatsappButton);

      const callArgs = window.open.mock.calls[0][0];
      expect(callArgs).toContain("https://api.whatsapp.com/send");
      expect(callArgs).toContain("phone=250788309472");
    });
  });

  describe("Section Attributes", () => {
    it("should have correct section id", () => {
      const { container } = render(<Hero />);
      const section = container.querySelector("#home");
      expect(section).toBeInTheDocument();
    });

    it("should have correct class name", () => {
      const { container } = render(<Hero />);
      const section = container.querySelector(".hero-section");
      expect(section).toBeInTheDocument();
    });
  });
});
