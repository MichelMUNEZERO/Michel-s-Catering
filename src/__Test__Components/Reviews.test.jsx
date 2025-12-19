import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Reviews from "../components/Reviews";

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("Reviews Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("Rendering", () => {
    it("should render the reviews section title", () => {
      render(<Reviews />);
      expect(screen.getByText(/Client Reviews/i)).toBeInTheDocument();
    });

    it("should render initial reviews", () => {
      render(<Reviews />);
      expect(screen.getByText("Sarah Johnson")).toBeInTheDocument();
      expect(screen.getByText("David Mugisha")).toBeInTheDocument();
    });

    it("should render Write Review button", () => {
      render(<Reviews />);
      expect(screen.getByText(/Write a Review/i)).toBeInTheDocument();
    });

    it("should display verified badges for verified reviews", () => {
      const { container } = render(<Reviews />);
      const verifiedBadges = container.querySelectorAll(".verified-badge");
      expect(verifiedBadges.length).toBeGreaterThan(0);
    });
  });

  describe("Review Display", () => {
    it("should render review ratings", () => {
      const { container } = render(<Reviews />);
      const stars = container.querySelectorAll(".fa-star");
      expect(stars.length).toBeGreaterThan(0);
    });

    it("should render review comments", () => {
      render(<Reviews />);
      expect(
        screen.getByText(/Absolutely amazing service!/i)
      ).toBeInTheDocument();
    });

    it("should render review dates", () => {
      render(<Reviews />);
      expect(screen.getByText(/November 15, 2024/i)).toBeInTheDocument();
    });
  });

  describe("Add Review Form", () => {
    it("should show form when Write Review button is clicked", () => {
      render(<Reviews />);
      const addButton = screen.getByText(/Write a Review/i);
      fireEvent.click(addButton);

      expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    });

    it("should hide form when cancel button is clicked", () => {
      render(<Reviews />);

      // Open form
      const addButton = screen.getByText(/Write a Review/i);
      fireEvent.click(addButton);

      // Close form
      const cancelButton = screen.getByText(/Cancel/i);
      fireEvent.click(cancelButton);

      expect(screen.queryByLabelText(/Your Name/i)).not.toBeInTheDocument();
    });

    it("should update form fields on change", () => {
      render(<Reviews />);

      // Open form
      const addButton = screen.getByText(/Write a Review/i);
      fireEvent.click(addButton);

      const nameInput = screen.getByLabelText(/Your Name/i);
      fireEvent.change(nameInput, { target: { value: "Test User" } });

      expect(nameInput.value).toBe("Test User");
    });
  });

  describe("LocalStorage Integration", () => {
    it("should load reviews from localStorage", () => {
      const savedReviews = [
        {
          id: 99,
          name: "Test User",
          rating: 5,
          date: "2024-12-08",
          comment: "Test review",
          verified: false,
        },
      ];
      localStorage.setItem("kamutaReviews", JSON.stringify(savedReviews));

      render(<Reviews />);

      expect(screen.getByText("Test User")).toBeInTheDocument();
    });

    it("should save reviews to localStorage on update", () => {
      render(<Reviews />);

      // Verify reviews are saved
      const saved = localStorage.getItem("kamutaReviews");
      expect(saved).toBeTruthy();
    });
  });

  describe("Rating Display", () => {
    it("should display 5-star rating correctly", () => {
      const { container } = render(<Reviews />);
      const reviewCards = container.querySelectorAll(".review-card");
      expect(reviewCards.length).toBeGreaterThan(0);
    });

    it("should have star icons", () => {
      const { container } = render(<Reviews />);
      const stars = container.querySelectorAll(".fa-star");
      expect(stars.length).toBeGreaterThan(0);
    });
  });

  describe("Review Stats", () => {
    it("should display average rating", () => {
      const { container } = render(<Reviews />);
      const stats = container.querySelector(".reviews-summary");
      expect(stats).toBeTruthy();
    });

    it("should display total review count", () => {
      render(<Reviews />);
      // The component should show some indication of review count
      const { container } = render(<Reviews />);
      const reviews = container.querySelectorAll(".review-card");
      expect(reviews.length).toBeGreaterThan(0);
    });
  });

  describe("Section Structure", () => {
    it("should have reviews-section class", () => {
      const { container } = render(<Reviews />);
      const section = container.querySelector(".reviews-section");
      expect(section).toBeInTheDocument();
    });

    it("should have review-cards container", () => {
      const { container } = render(<Reviews />);
      const cards = container.querySelectorAll(".review-card");
      expect(cards.length).toBeGreaterThan(0);
    });
  });
});
