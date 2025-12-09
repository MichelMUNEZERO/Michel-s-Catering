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

    it("should render utensils icon", () => {
      const { container } = renderNotFound();
      const icon = container.querySelector(".fa-utensils");
      expect(icon).toBeInTheDocument();
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

    it("should have not-found-icon", () => {
      const { container } = renderNotFound();
      const icon = container.querySelector(".not-found-icon");
      expect(icon).toBeInTheDocument();
    });

    it("should have not-found-title", () => {
      const { container } = renderNotFound();
      const title = container.querySelector(".not-found-title");
      expect(title).toBeInTheDocument();
    });

    it("should have not-found-subtitle", () => {
      const { container } = renderNotFound();
      const subtitle = container.querySelector(".not-found-subtitle");
      expect(subtitle).toBeInTheDocument();
    });
  });
});
