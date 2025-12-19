import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Clients from "../components/Clients";

describe("Clients Component", () => {
  describe("Rendering", () => {
    it("should render the section title", () => {
      render(<Clients />);
      expect(screen.getByText("Our Clients")).toBeInTheDocument();
    });

    it("should render the section subtitle", () => {
      render(<Clients />);
      expect(
        screen.getByText(/Proud to serve leading organizations/i)
      ).toBeInTheDocument();
    });

    it("should render all client logos", () => {
      render(<Clients />);

      expect(screen.getAllByAltText("Discovery School").length).toBeGreaterThan(
        0
      );
      expect(screen.getAllByAltText("FAO").length).toBeGreaterThan(0);
      expect(screen.getAllByAltText("PAM").length).toBeGreaterThan(0);
      expect(
        screen.getAllByAltText("University of Rwanda").length
      ).toBeGreaterThan(0);
      expect(screen.getAllByAltText("REG").length).toBeGreaterThan(0);
      expect(screen.getAllByAltText("UNDP").length).toBeGreaterThan(0);
    });
  });

  describe("Client Logos", () => {
    it("should render exactly 6 unique client logos", () => {
      const { container } = render(<Clients />);
      const uniqueClients = container.querySelectorAll(".card img");

      // Should have duplicates for seamless scrolling (6 original + 6 duplicates + 6 third set = 18)
      expect(uniqueClients.length).toBe(18);
    });

    it("should have correct src attributes for logos", () => {
      render(<Clients />);

      const discoveryLogo = screen.getAllByAltText("Discovery School")[0];
      const faoLogo = screen.getAllByAltText("FAO")[0];

      expect(discoveryLogo).toHaveAttribute(
        "src",
        "/Photo/Our client's Logo/Discovery School logo.jpg"
      );
      expect(faoLogo).toHaveAttribute(
        "src",
        "/Photo/Our client's Logo/logo FAO.png"
      );
    });
  });

  describe("Scroller Animation", () => {
    it("should have scroller-container", () => {
      const { container } = render(<Clients />);
      const scrollerContainer = container.querySelector(".scroller-container");
      expect(scrollerContainer).toBeInTheDocument();
    });

    it("should have scroller element", () => {
      const { container } = render(<Clients />);
      const scroller = container.querySelector(".scroller");
      expect(scroller).toBeInTheDocument();
    });

    it("should render duplicate set for seamless looping", () => {
      const { container } = render(<Clients />);
      const cards = container.querySelectorAll(".card");

      // Should have triple the logos for seamless scrolling
      expect(cards.length).toBe(18); // 6 originals + 6 duplicates + 6 third set
    });
  });

  describe("Section Structure", () => {
    it("should have clients-section class", () => {
      const { container } = render(<Clients />);
      const section = container.querySelector(".clients-section");
      expect(section).toBeInTheDocument();
    });

    it("should have section-title", () => {
      const { container } = render(<Clients />);
      const title = container.querySelector(".section-title");
      expect(title).toBeInTheDocument();
    });

    it("should have card elements", () => {
      const { container } = render(<Clients />);
      const cards = container.querySelectorAll(".card");
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  describe("Images", () => {
    it("should have card-image class on all images", () => {
      const { container } = render(<Clients />);
      const images = container.querySelectorAll(".card-image");
      expect(images.length).toBe(18);
    });

    it("should render images with proper attributes", () => {
      render(<Clients />);
      const images = screen.getAllByRole("img");

      images.forEach((img) => {
        expect(img).toHaveAttribute("src");
        expect(img).toHaveAttribute("alt");
        expect(img).toHaveClass("card-image");
      });
    });
  });

  describe("Client List", () => {
    it("should include international organizations", () => {
      render(<Clients />);
      expect(screen.getAllByAltText("FAO")[0]).toBeInTheDocument();
      expect(screen.getAllByAltText("UNDP")[0]).toBeInTheDocument();
    });

    it("should include educational institutions", () => {
      render(<Clients />);
      expect(screen.getAllByAltText("Discovery School")[0]).toBeInTheDocument();
      expect(
        screen.getAllByAltText("University of Rwanda")[0]
      ).toBeInTheDocument();
    });

    it("should include government organizations", () => {
      render(<Clients />);
      expect(screen.getAllByAltText("REG")[0]).toBeInTheDocument();
    });
  });
});
