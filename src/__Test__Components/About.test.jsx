import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "../components/About";

describe("About Component", () => {
  describe("Rendering", () => {
    it("should render the section title", () => {
      render(<About />);
      expect(screen.getByText("About Us")).toBeInTheDocument();
    });

    it("should render the section subtitle", () => {
      render(<About />);
      expect(
        screen.getByText(/Learn more about our story/i)
      ).toBeInTheDocument();
    });

    it("should render Our Story section", () => {
      render(<About />);
      expect(screen.getByText("Our Story")).toBeInTheDocument();
      expect(screen.getByText(/Founded in 2024/i)).toBeInTheDocument();
    });

    it("should render Our Mission section", () => {
      render(<About />);
      expect(screen.getByText("Our Mission")).toBeInTheDocument();
      expect(
        screen.getByText(
          /We are committed to creating memorable dining experiences/i
        )
      ).toBeInTheDocument();
    });

    it("should render Why Choose Us section", () => {
      render(<About />);
      expect(screen.getByText("Why Choose Us")).toBeInTheDocument();
    });

    it("should render about image", () => {
      render(<About />);
      const image = screen.getByAltText("Our Team");
      expect(image).toBeInTheDocument();
    });
  });

  describe("Why Choose Us List", () => {
    it("should render all list items", () => {
      render(<About />);

      expect(
        screen.getByText("Experienced and professional team")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Fresh, high-quality ingredients")
      ).toBeInTheDocument();
      expect(screen.getByText("Customized menu options")).toBeInTheDocument();
      expect(
        screen.getByText("Exceptional customer service")
      ).toBeInTheDocument();
      expect(screen.getByText("Competitive pricing")).toBeInTheDocument();
    });

    it("should render 5 benefits", () => {
      const { container } = render(<About />);
      const listItems = container.querySelectorAll(".about-text ul li");
      expect(listItems).toHaveLength(5);
    });
  });

  describe("Section Attributes", () => {
    it("should have correct section id", () => {
      const { container } = render(<About />);
      const section = container.querySelector("#about");
      expect(section).toBeInTheDocument();
    });

    it("should have correct class name", () => {
      const { container } = render(<About />);
      const section = container.querySelector(".about-section");
      expect(section).toBeInTheDocument();
    });
  });

  describe("Content Structure", () => {
    it("should have about-content wrapper", () => {
      const { container } = render(<About />);
      const content = container.querySelector(".about-content");
      expect(content).toBeInTheDocument();
    });

    it("should have about-image section", () => {
      const { container } = render(<About />);
      const imageSection = container.querySelector(".about-image");
      expect(imageSection).toBeInTheDocument();
    });

    it("should have about-text section", () => {
      const { container } = render(<About />);
      const textSection = container.querySelector(".about-text");
      expect(textSection).toBeInTheDocument();
    });
  });
});
