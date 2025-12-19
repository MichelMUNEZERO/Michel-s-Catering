import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Reviews from "../components/Reviews";
import { reviewsAPI } from "../services/api";

// Mock the API
vi.mock("../services/api", () => ({
  reviewsAPI: {
    getAll: vi.fn(),
    create: vi.fn(),
  },
}));

// Mock data for approved reviews from MongoDB
const mockReviews = [
  {
    _id: "1",
    customerName: "Sarah Johnson",
    rating: 5,
    createdAt: "2024-11-15T00:00:00.000Z",
    comment:
      "Absolutely amazing service! The food was delicious and the presentation was stunning. Kamuta Ltd made our wedding day perfect!",
    status: "approved",
  },
  {
    _id: "2",
    customerName: "David Mugisha",
    rating: 5,
    createdAt: "2024-11-10T00:00:00.000Z",
    comment:
      "Professional team and exceptional quality. They catered our corporate event and everyone was impressed with the food and service.",
    status: "approved",
  },
  {
    _id: "3",
    customerName: "Grace Uwase",
    rating: 4,
    createdAt: "2024-11-05T00:00:00.000Z",
    comment:
      "Great experience overall! The food was delicious and the staff was very friendly. Highly recommend for any event.",
    status: "approved",
  },
];

describe("Reviews Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock: return reviews successfully
    reviewsAPI.getAll.mockResolvedValue({
      success: true,
      data: mockReviews,
    });
  });

  describe("Rendering", () => {
    it("should render the reviews section title", async () => {
      render(<Reviews />);
      expect(screen.getByText(/Client Reviews/i)).toBeInTheDocument();
    });

    it("should render initial reviews", async () => {
      render(<Reviews />);

      // Wait for API call to complete
      await waitFor(() => {
        expect(screen.getByText("Sarah Johnson")).toBeInTheDocument();
      });

      expect(screen.getByText("David Mugisha")).toBeInTheDocument();
    });

    it("should render Write Review button", () => {
      render(<Reviews />);
      expect(screen.getByText(/Write a Review/i)).toBeInTheDocument();
    });

    it("should display verified badges for verified reviews", async () => {
      const { container } = render(<Reviews />);

      // Wait for reviews to load
      await waitFor(() => {
        const verifiedBadges = container.querySelectorAll(".verified-badge");
        expect(verifiedBadges.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Review Display", () => {
    it("should render review ratings", async () => {
      const { container } = render(<Reviews />);

      await waitFor(() => {
        const stars = container.querySelectorAll(".fa-star");
        expect(stars.length).toBeGreaterThan(0);
      });
    });

    it("should render review comments", async () => {
      render(<Reviews />);

      await waitFor(() => {
        expect(
          screen.getByText(/Absolutely amazing service!/i)
        ).toBeInTheDocument();
      });
    });

    it("should render review dates", async () => {
      render(<Reviews />);

      await waitFor(() => {
        expect(screen.getByText(/November 15, 2024/i)).toBeInTheDocument();
      });
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

  describe("API Integration", () => {
    it("should show loading state while fetching reviews", () => {
      render(<Reviews />);
      expect(screen.getByText(/Loading reviews.../i)).toBeInTheDocument();
    });

    it("should call API to fetch reviews on mount", async () => {
      render(<Reviews />);

      await waitFor(() => {
        expect(reviewsAPI.getAll).toHaveBeenCalled();
      });
    });

    it("should show empty state when no reviews exist", async () => {
      reviewsAPI.getAll.mockResolvedValue({
        success: true,
        data: [],
      });

      render(<Reviews />);

      await waitFor(() => {
        expect(screen.getByText(/No reviews yet/i)).toBeInTheDocument();
      });
    });

    it("should submit review via API", async () => {
      reviewsAPI.create.mockResolvedValue({
        success: true,
        data: { _id: "new-id", customerName: "New User" },
      });

      // Mock window.alert
      const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

      render(<Reviews />);

      // Open form
      const addButton = screen.getByText(/Write a Review/i);
      fireEvent.click(addButton);

      // Fill form
      fireEvent.change(screen.getByLabelText(/Your Name/i), {
        target: { value: "New User" },
      });
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: "newuser@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/Your Review/i), {
        target: { value: "Great service!" },
      });

      // Submit
      const submitButton = screen.getByText(/Submit Review/i);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(reviewsAPI.create).toHaveBeenCalledWith({
          customerName: "New User",
          email: "newuser@example.com",
          rating: 5,
          comment: "Great service!",
        });
      });

      alertMock.mockRestore();
    });
  });

  describe("Rating Display", () => {
    it("should display 5-star rating correctly", async () => {
      const { container } = render(<Reviews />);

      await waitFor(() => {
        const reviewCards = container.querySelectorAll(".review-card");
        expect(reviewCards.length).toBeGreaterThan(0);
      });
    });

    it("should have star icons", async () => {
      const { container } = render(<Reviews />);

      await waitFor(() => {
        const stars = container.querySelectorAll(".fa-star");
        expect(stars.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Review Stats", () => {
    it("should display average rating", async () => {
      render(<Reviews />);

      await waitFor(() => {
        // Average of mockReviews: (5 + 5 + 4) / 3 = 4.7
        expect(screen.getByText("4.7")).toBeInTheDocument();
      });
    });

    it("should display total review count", async () => {
      const { container } = render(<Reviews />);

      await waitFor(() => {
        const reviews = container.querySelectorAll(".review-card");
        expect(reviews.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Section Structure", () => {
    it("should have reviews-section class", () => {
      const { container } = render(<Reviews />);
      const section = container.querySelector(".reviews-section");
      expect(section).toBeInTheDocument();
    });

    it("should have review-cards container", async () => {
      const { container } = render(<Reviews />);

      await waitFor(() => {
        const cards = container.querySelectorAll(".review-card");
        expect(cards.length).toBeGreaterThan(0);
      });
    });
  });
});
