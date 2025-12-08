import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ReviewsPage from "./ReviewsPage";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock Reviews component
vi.mock("../components/Reviews", () => ({
  default: () => <div data-testid="reviews">Reviews Component</div>,
}));

const renderReviewsPage = (props = {}) => {
  const defaultProps = {
    darkMode: false,
    toggleTheme: vi.fn(),
  };

  return render(
    <BrowserRouter>
      <ReviewsPage {...defaultProps} {...props} />
    </BrowserRouter>
  );
};

describe("ReviewsPage Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe("Rendering", () => {
    it("should render the page", () => {
      renderReviewsPage();
      expect(screen.getByTestId("reviews")).toBeInTheDocument();
    });

    it("should render logo and company name", () => {
      renderReviewsPage();
      expect(screen.getByAltText("Kamuta Ltd's Logo")).toBeInTheDocument();
      expect(screen.getByText("KAMUTA LTD")).toBeInTheDocument();
    });

    it("should render navigation links", () => {
      renderReviewsPage();

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Services")).toBeInTheDocument();
      expect(screen.getByText("Meet Our Team")).toBeInTheDocument();
      expect(screen.getByText("About Us")).toBeInTheDocument();
      expect(screen.getByText("Reviews")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("should render theme toggle button", () => {
      renderReviewsPage();
      expect(screen.getByLabelText("Toggle dark mode")).toBeInTheDocument();
    });

    it("should render Reviews component", () => {
      renderReviewsPage();
      expect(screen.getByTestId("reviews")).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("should navigate to home when logo is clicked", () => {
      renderReviewsPage();

      const logo = screen.getByAltText("Kamuta Ltd's Logo");
      fireEvent.click(logo);

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("should navigate to home when company name is clicked", () => {
      renderReviewsPage();

      const companyName = screen.getByText("KAMUTA LTD");
      fireEvent.click(companyName);

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("should have correct navigation link hrefs", () => {
      renderReviewsPage();

      const homeLink = screen.getByText("Home").closest("a");
      const servicesLink = screen.getByText("Services").closest("a");
      const contactLink = screen.getByText("Contact").closest("a");

      expect(homeLink).toHaveAttribute("href", "/");
      expect(servicesLink).toHaveAttribute("href", "/#services");
      expect(contactLink).toHaveAttribute("href", "/#contact");
    });
  });

  describe("Theme Toggle", () => {
    it("should call toggleTheme when theme button is clicked", () => {
      const toggleTheme = vi.fn();
      renderReviewsPage({ toggleTheme });

      const themeButton = screen.getByLabelText("Toggle dark mode");
      fireEvent.click(themeButton);

      expect(toggleTheme).toHaveBeenCalledTimes(1);
    });

    it("should display sun emoji when dark mode is active", () => {
      renderReviewsPage({ darkMode: true });

      const themeButton = screen.getByLabelText("Toggle dark mode");
      expect(themeButton).toHaveTextContent("☀️");
    });

    it("should display moon emoji when light mode is active", () => {
      renderReviewsPage({ darkMode: false });

      const themeButton = screen.getByLabelText("Toggle dark mode");
      expect(themeButton).toHaveTextContent("🌙");
    });
  });

  describe("Active Link Styling", () => {
    it("should underline the Reviews link", () => {
      renderReviewsPage();

      const reviewsLink = screen.getByText("Reviews").closest("a");
      expect(reviewsLink).toHaveStyle({ textDecoration: "underline" });
    });
  });

  describe("Page Structure", () => {
    it("should have reviews-page class", () => {
      const { container } = renderReviewsPage();
      const page = container.querySelector(".reviews-page");
      expect(page).toBeInTheDocument();
    });

    it("should render header", () => {
      const { container } = renderReviewsPage();
      const header = container.querySelector("header");
      expect(header).toBeInTheDocument();
    });

    it("should have main-nav navigation", () => {
      const { container } = renderReviewsPage();
      const nav = container.querySelector(".main-nav");
      expect(nav).toBeInTheDocument();
    });
  });

  describe("Props Handling", () => {
    it("should handle darkMode prop correctly", () => {
      const { rerender } = renderReviewsPage({ darkMode: false });
      expect(screen.getByLabelText("Toggle dark mode")).toHaveTextContent("🌙");

      rerender(
        <BrowserRouter>
          <ReviewsPage darkMode={true} toggleTheme={vi.fn()} />
        </BrowserRouter>
      );
      expect(screen.getByLabelText("Toggle dark mode")).toHaveTextContent("☀️");
    });

    it("should handle toggleTheme prop correctly", () => {
      const toggleTheme1 = vi.fn();
      const toggleTheme2 = vi.fn();

      const { rerender } = renderReviewsPage({ toggleTheme: toggleTheme1 });

      fireEvent.click(screen.getByLabelText("Toggle dark mode"));
      expect(toggleTheme1).toHaveBeenCalled();

      rerender(
        <BrowserRouter>
          <ReviewsPage darkMode={false} toggleTheme={toggleTheme2} />
        </BrowserRouter>
      );

      fireEvent.click(screen.getByLabelText("Toggle dark mode"));
      expect(toggleTheme2).toHaveBeenCalled();
    });
  });
});
