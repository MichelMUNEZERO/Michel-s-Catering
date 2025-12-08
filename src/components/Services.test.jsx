import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Services from "./Services";

describe("Services Component", () => {
  describe("Rendering", () => {
    it("should render the section title", () => {
      render(<Services />);
      expect(screen.getByText("Our Services")).toBeInTheDocument();
    });

    it("should render all service cards", () => {
      render(<Services />);

      expect(screen.getByText("Delivery Service")).toBeInTheDocument();
      expect(screen.getByText("Wedding Catering")).toBeInTheDocument();
      expect(screen.getByText("Small Parties")).toBeInTheDocument();
      expect(screen.getByText("Corporate Events")).toBeInTheDocument();
      expect(screen.getByText("Meeting Catering")).toBeInTheDocument();
      expect(screen.getByText("Fine Dining")).toBeInTheDocument();
    });

    it("should render service descriptions", () => {
      render(<Services />);

      expect(
        screen.getByText(
          /Fresh, delicious meals delivered right to your doorstep/i
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Make your special day unforgettable/i)
      ).toBeInTheDocument();
    });

    it("should render service images with correct alt text", () => {
      render(<Services />);

      const deliveryImage = screen.getByAltText("Delivery Service");
      const weddingImage = screen.getByAltText("Wedding Catering");

      expect(deliveryImage).toBeInTheDocument();
      expect(weddingImage).toBeInTheDocument();
    });
  });

  describe("Service Count", () => {
    it("should render all 6 services", () => {
      render(<Services />);

      // Check all 6 service titles are present
      expect(screen.getByText("Delivery Service")).toBeInTheDocument();
      expect(screen.getByText("Wedding Catering")).toBeInTheDocument();
      expect(screen.getByText("Small Parties")).toBeInTheDocument();
      expect(screen.getByText("Corporate Events")).toBeInTheDocument();
      expect(screen.getByText("Meeting Catering")).toBeInTheDocument();
      expect(screen.getByText("Fine Dining")).toBeInTheDocument();
    });
  });

  describe("Section Attributes", () => {
    it("should have correct section id", () => {
      const { container } = render(<Services />);
      const section = container.querySelector("#services");
      expect(section).toBeInTheDocument();
    });

    it("should have correct class name", () => {
      const { container } = render(<Services />);
      const section = container.querySelector(".services-section");
      expect(section).toBeInTheDocument();
    });
  });

  describe("Images", () => {
    it("should have images with src attributes", () => {
      render(<Services />);

      const images = screen.getAllByRole("img");
      images.forEach((img) => {
        expect(img).toHaveAttribute("src");
      });
    });
  });
});
