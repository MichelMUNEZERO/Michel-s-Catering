import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";

const renderNotFound = () => {
  return render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );
};

describe("NotFound Component", () => {
  describe("Rendering", () => {
    it("should render 404 error code", () => {
      renderNotFound();
      expect(screen.getByText("404")).toBeInTheDocument();
    });

    it("should render error title", () => {
      renderNotFound();
      expect(screen.getByText("Oops! Page Not Found")).toBeInTheDocument();
    });

    it("should render error message", () => {
      renderNotFound();
      expect(
        screen.getByText(/Sorry, the page you're looking for doesn't exist/i)
      ).toBeInTheDocument();
    });

    it("should render Back to Home button", () => {
      renderNotFound();
      expect(screen.getByText(/Back to Home/i)).toBeInTheDocument();
    });

    it("should render Contact Us button", () => {
      renderNotFound();
      expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
    });

    it("should render utensils icon", () => {
      const { container } = renderNotFound();
      const icon = container.querySelector(".fa-utensils");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Navigation Links", () => {
    it("should have correct link to home page", () => {
      renderNotFound();
      const homeLink = screen.getByText(/Back to Home/i).closest("a");
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("should have correct link to contact section", () => {
      renderNotFound();
      const contactLink = screen.getByText(/Contact Us/i).closest("a");
      expect(contactLink).toHaveAttribute("href", "/#contact");
    });
  });

  describe("Structure", () => {
    it("should have not-found-container", () => {
      const { container } = renderNotFound();
      const notFoundContainer = container.querySelector(".not-found-container");
      expect(notFoundContainer).toBeInTheDocument();
    });

    it("should have not-found-content", () => {
      const { container } = renderNotFound();
      const content = container.querySelector(".not-found-content");
      expect(content).toBeInTheDocument();
    });

    it("should have not-found-buttons", () => {
      const { container } = renderNotFound();
      const buttons = container.querySelector(".not-found-buttons");
      expect(buttons).toBeInTheDocument();
    });
  });

  describe("Button Styling", () => {
    it("should have primary button styling", () => {
      const { container } = renderNotFound();
      const buttons = container.querySelectorAll(".cta-button");
      expect(buttons.length).toBe(2);
    });

    it("should have secondary button class", () => {
      const { container } = renderNotFound();
      const secondaryButton = container.querySelector(".cta-button.secondary");
      expect(secondaryButton).toBeInTheDocument();
    });
  });

  describe("Icons", () => {
    it("should render home icon", () => {
      const { container } = renderNotFound();
      const homeIcon = container.querySelector(".fa-home");
      expect(homeIcon).toBeInTheDocument();
    });

    it("should render envelope icon", () => {
      const { container } = renderNotFound();
      const envelopeIcon = container.querySelector(".fa-envelope");
      expect(envelopeIcon).toBeInTheDocument();
    });
  });
});
