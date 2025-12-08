import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Team from "./Team";

describe("Team Component", () => {
  describe("Rendering", () => {
    it("should render the section title", () => {
      render(<Team />);
      expect(screen.getByText("Meet Our Team")).toBeInTheDocument();
    });

    it("should render the section subtitle", () => {
      render(<Team />);
      expect(
        screen.getByText(
          /The talented people behind Kamuta Ltd's exceptional services/i
        )
      ).toBeInTheDocument();
    });

    it("should render all team members", () => {
      render(<Team />);

      expect(screen.getByText("waiters")).toBeInTheDocument();
      expect(screen.getByText("Mind Master")).toBeInTheDocument();
      expect(screen.getByText("Chef")).toBeInTheDocument();
      expect(screen.getByText("Cleaning Staff")).toBeInTheDocument();
    });

    it("should render team member roles", () => {
      render(<Team />);

      expect(screen.getByText("Service Staff")).toBeInTheDocument();
      expect(screen.getByText("Owner")).toBeInTheDocument();
      expect(screen.getByText("Head Chef")).toBeInTheDocument();
      expect(screen.getByText("Janitorial Team")).toBeInTheDocument();
    });
  });

  describe("Team Cards", () => {
    it("should render exactly 4 team members", () => {
      const { container } = render(<Team />);
      const teamCards = container.querySelectorAll(".team-card");
      expect(teamCards).toHaveLength(4);
    });

    it("should render images for all team members", () => {
      render(<Team />);

      const waiterImage = screen.getByAltText("waiters");
      const ownerImage = screen.getByAltText("Mind Master");
      const chefImage = screen.getByAltText("Chef");
      const cleaningImage = screen.getByAltText("Cleaning Staff");

      expect(waiterImage).toBeInTheDocument();
      expect(ownerImage).toBeInTheDocument();
      expect(chefImage).toBeInTheDocument();
      expect(cleaningImage).toBeInTheDocument();
    });

    it("should have correct image sources", () => {
      render(<Team />);

      const images = screen.getAllByRole("img");
      images.forEach((img) => {
        expect(img).toHaveAttribute("src");
        expect(img.getAttribute("src")).toContain("/Photo/Photo's Team/");
      });
    });
  });

  describe("Section Attributes", () => {
    it("should have correct section id", () => {
      const { container } = render(<Team />);
      const section = container.querySelector("#team");
      expect(section).toBeInTheDocument();
    });

    it("should have correct class name", () => {
      const { container } = render(<Team />);
      const section = container.querySelector(".team-section");
      expect(section).toBeInTheDocument();
    });

    it("should have team-grid container", () => {
      const { container } = render(<Team />);
      const grid = container.querySelector(".team-grid");
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Card Structure", () => {
    it("should have team-image divs", () => {
      const { container } = render(<Team />);
      const teamImages = container.querySelectorAll(".team-image");
      expect(teamImages).toHaveLength(4);
    });

    it("should have team-info divs", () => {
      const { container } = render(<Team />);
      const teamInfo = container.querySelectorAll(".team-info");
      expect(teamInfo).toHaveLength(4);
    });

    it("should have team-role paragraphs", () => {
      const { container } = render(<Team />);
      const roles = container.querySelectorAll(".team-role");
      expect(roles).toHaveLength(4);
    });
  });
});
