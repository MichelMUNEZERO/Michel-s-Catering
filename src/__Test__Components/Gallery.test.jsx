import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Gallery from "../components/Gallery";
import * as api from "../services/api";

// Mock the API
vi.mock("../services/api", () => ({
  galleryAPI: {
    getAll: vi.fn(),
  },
}));

describe("Gallery Component", () => {
  const mockOnClose = vi.fn();

  const mockGalleryData = Array.from({ length: 30 }, (_, i) => ({
    _id: `${i + 1}`,
    imageUrl: `/Photo/Gallery Photos/image-${i + 1}.jpg`,
    title: `Gallery ${i + 1}`,
    isActive: true,
  }));

  beforeEach(() => {
    mockOnClose.mockClear();
    // Mock successful API response
    api.galleryAPI.getAll.mockResolvedValue({
      success: true,
      data: mockGalleryData,
    });
  });

  describe("Rendering", () => {
    it("should render the gallery title", async () => {
      render(<Gallery onClose={mockOnClose} />);
      expect(screen.getByText("Our Gallery")).toBeInTheDocument();
    });

    it("should render the gallery subtitle", async () => {
      render(<Gallery onClose={mockOnClose} />);
      expect(
        screen.getByText(/Explore our catering services/i)
      ).toBeInTheDocument();
    });

    it("should render close button", async () => {
      render(<Gallery onClose={mockOnClose} />);
      const closeButton = screen.getByRole("button", { name: "" });
      expect(closeButton).toBeInTheDocument();
    });

    it("should render all gallery images", async () => {
      const { container } = render(<Gallery onClose={mockOnClose} />);
      await waitFor(() => {
        const galleryItems = container.querySelectorAll(".gallery-item");
        expect(galleryItems).toHaveLength(30);
      });
    });

    it("should render images with correct alt text", async () => {
      render(<Gallery onClose={mockOnClose} />);
      await waitFor(() => {
        expect(screen.getByAltText("Gallery 1")).toBeInTheDocument();
      });
      expect(screen.getByAltText("Gallery 30")).toBeInTheDocument();
    });
  });

  describe("Close Functionality", () => {
    it("should call onClose when close button is clicked", () => {
      render(<Gallery onClose={mockOnClose} />);
      const closeButton = screen.getByRole("button");
      fireEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Lightbox Functionality", () => {
    it("should open lightbox when image is clicked", async () => {
      const { container } = render(<Gallery onClose={mockOnClose} />);
      await waitFor(() => {
        const firstImage = container.querySelector(".gallery-item");
        expect(firstImage).toBeInTheDocument();
      });

      const firstImage = container.querySelector(".gallery-item");
      fireEvent.click(firstImage);

      const lightbox = container.querySelector(".lightbox");
      expect(lightbox).toBeInTheDocument();
    });

    it("should display selected image in lightbox", async () => {
      const { container } = render(<Gallery onClose={mockOnClose} />);
      await waitFor(() => {
        const firstImage = container.querySelector(".gallery-item");
        expect(firstImage).toBeInTheDocument();
      });

      const firstImage = container.querySelector(".gallery-item");
      fireEvent.click(firstImage);

      const lightboxImage = screen.getByAltText("Full view");
      expect(lightboxImage).toBeInTheDocument();
    });

    it("should close lightbox when clicked", async () => {
      const { container } = render(<Gallery onClose={mockOnClose} />);

      // Wait for images to load
      await waitFor(() => {
        const firstImage = container.querySelector(".gallery-item");
        expect(firstImage).toBeInTheDocument();
      });

      // Open lightbox
      const firstImage = container.querySelector(".gallery-item");
      fireEvent.click(firstImage);

      // Close lightbox
      const lightbox = container.querySelector(".lightbox");
      fireEvent.click(lightbox);

      expect(container.querySelector(".lightbox")).not.toBeInTheDocument();
    });

    it("should not render lightbox initially", async () => {
      const { container } = render(<Gallery onClose={mockOnClose} />);
      const lightbox = container.querySelector(".lightbox");
      expect(lightbox).not.toBeInTheDocument();
    });
  });

  describe("Section Attributes", () => {
    it("should have correct section id", () => {
      const { container } = render(<Gallery onClose={mockOnClose} />);
      const section = container.querySelector("#gallery");
      expect(section).toBeInTheDocument();
    });

    it("should have correct class names", () => {
      const { container } = render(<Gallery onClose={mockOnClose} />);
      const section = container.querySelector(".gallery-section");
      expect(section).toBeInTheDocument();
    });
  });

  describe("Gallery Grid", () => {
    it("should have gallery-grid container", async () => {
      const { container } = render(<Gallery onClose={mockOnClose} />);
      const grid = container.querySelector(".gallery-grid");
      expect(grid).toBeInTheDocument();
    });

    it("should have gallery overlay on items", async () => {
      const { container } = render(<Gallery onClose={mockOnClose} />);
      await waitFor(() => {
        const overlays = container.querySelectorAll(".gallery-overlay");
        expect(overlays.length).toBeGreaterThan(0);
      });
    });
  });
});
