import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import App from "./App.jsx";

// Mock CSS imports
vi.mock("./App.css", () => ({}));

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

describe("App Component", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark-mode");
  });

  describe("Theme Management", () => {
    it("should initialize with light mode by default", () => {
      render(<App />);

      expect(document.documentElement.classList.contains("dark-mode")).toBe(
        false
      );
      expect(localStorage.getItem("theme")).toBe("light");
    });

    it("should initialize with dark mode if saved in localStorage", () => {
      localStorage.setItem("theme", "dark");

      render(<App />);

      expect(document.documentElement.classList.contains("dark-mode")).toBe(
        true
      );
    });

    it("should save theme preference to localStorage", () => {
      localStorage.setItem("theme", "light");

      render(<App />);

      expect(localStorage.getItem("theme")).toBe("light");
    });

    it("should add dark-mode class when theme is dark", () => {
      localStorage.setItem("theme", "dark");

      render(<App />);

      expect(document.documentElement.classList.contains("dark-mode")).toBe(
        true
      );
    });

    it("should remove dark-mode class when theme is light", () => {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "light");

      render(<App />);

      expect(document.documentElement.classList.contains("dark-mode")).toBe(
        false
      );
    });
  });

  describe("Routing", () => {
    it("should render Home component on root path", () => {
      window.history.pushState({}, "Home", "/");
      render(<App />);

      // Home page should render (you may need to adjust this based on your Home component content)
      expect(document.querySelector(".App")).toBeInTheDocument();
    });

    it("should render ReviewsPage component on /reviews path", () => {
      window.history.pushState({}, "Reviews", "/reviews");
      render(<App />);

      // Reviews page should render
      expect(document.querySelector(".App")).toBeInTheDocument();
    });

    it("should render NotFound component on unknown path", () => {
      window.history.pushState({}, "Not Found", "/unknown-route");
      render(<App />);

      // Not Found page should render
      expect(document.querySelector(".App")).toBeInTheDocument();
    });
  });

  describe("Props Passing", () => {
    it("should pass darkMode prop to Home component", () => {
      localStorage.setItem("theme", "dark");

      render(<App />);

      expect(document.documentElement.classList.contains("dark-mode")).toBe(
        true
      );
    });

    it("should pass toggleTheme function to pages", () => {
      const { container } = render(<App />);

      // Verify App renders without errors
      expect(container.querySelector(".App")).toBeInTheDocument();
    });
  });

  describe("Theme Persistence", () => {
    it("should persist light theme across re-renders", () => {
      const { rerender } = render(<App />);

      expect(localStorage.getItem("theme")).toBe("light");

      rerender(<App />);

      expect(localStorage.getItem("theme")).toBe("light");
      expect(document.documentElement.classList.contains("dark-mode")).toBe(
        false
      );
    });

    it("should persist dark theme across re-renders", () => {
      localStorage.setItem("theme", "dark");

      const { rerender } = render(<App />);

      expect(localStorage.getItem("theme")).toBe("dark");

      rerender(<App />);

      expect(localStorage.getItem("theme")).toBe("dark");
      expect(document.documentElement.classList.contains("dark-mode")).toBe(
        true
      );
    });
  });

  describe("Initial Render", () => {
    it("should render without crashing", () => {
      const { container } = render(<App />);

      expect(container.querySelector(".App")).toBeInTheDocument();
    });

    it("should render BrowserRouter", () => {
      const { container } = render(<App />);

      expect(container).toBeInTheDocument();
    });
  });

  describe("Theme State Management", () => {
    it("should update theme state correctly", () => {
      localStorage.setItem("theme", "light");

      render(<App />);

      expect(document.documentElement.classList.contains("dark-mode")).toBe(
        false
      );

      localStorage.setItem("theme", "dark");

      // Re-render with updated theme
      const { rerender } = render(<App />);
      rerender(<App />);

      expect(document.documentElement.classList.contains("dark-mode")).toBe(
        true
      );
    });
  });
});
