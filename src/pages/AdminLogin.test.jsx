import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import { AuthProvider } from "../contexts/AuthContext";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("AdminLogin Component", () => {
  const mockToggleTheme = vi.fn();
  const mockLogin = vi.fn();

  const renderComponent = (darkMode = false) => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <AdminLogin darkMode={darkMode} toggleTheme={mockToggleTheme} />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    mockToggleTheme.mockClear();
    mockLogin.mockClear();
  });

  describe("Rendering", () => {
    it("should render the login form", () => {
      renderComponent();
      expect(screen.getByText("Admin Login")).toBeInTheDocument();
      expect(
        screen.getByText("Kamuta Ltd Gallery Management")
      ).toBeInTheDocument();
    });

    it("should render username input", () => {
      renderComponent();
      const usernameInput = screen.getByPlaceholderText("Enter username");
      expect(usernameInput).toBeInTheDocument();
      expect(usernameInput).toHaveAttribute("type", "text");
      expect(usernameInput).toHaveAttribute("required");
    });

    it("should render password input", () => {
      renderComponent();
      const passwordInput = screen.getByPlaceholderText("Enter password");
      expect(passwordInput).toBeInTheDocument();
      expect(passwordInput).toHaveAttribute("type", "password");
      expect(passwordInput).toHaveAttribute("required");
    });

    it("should render login button", () => {
      renderComponent();
      const loginButton = screen.getByRole("button", { name: /login/i });
      expect(loginButton).toBeInTheDocument();
      expect(loginButton).toHaveAttribute("type", "submit");
    });

    it("should render theme toggle button", () => {
      renderComponent();
      const themeToggle = screen.getByLabelText("Toggle dark mode");
      expect(themeToggle).toBeInTheDocument();
    });

    it("should render back to website link", () => {
      renderComponent();
      const backLink = screen.getByText(/back to website/i);
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute("href", "/");
    });
  });

  describe("Theme Toggle", () => {
    it("should show moon icon in light mode", () => {
      const { container } = renderComponent(false);
      const moonIcon = container.querySelector(".fa-moon");
      expect(moonIcon).toBeInTheDocument();
    });

    it("should show sun icon in dark mode", () => {
      const { container } = renderComponent(true);
      const sunIcon = container.querySelector(".fa-sun");
      expect(sunIcon).toBeInTheDocument();
    });

    it("should call toggleTheme when theme button is clicked", () => {
      renderComponent();
      const themeToggle = screen.getByLabelText("Toggle dark mode");
      fireEvent.click(themeToggle);
      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });
  });

  describe("Form Interaction", () => {
    it("should update username on input change", () => {
      renderComponent();
      const usernameInput = screen.getByPlaceholderText("Enter username");
      fireEvent.change(usernameInput, { target: { value: "admin" } });
      expect(usernameInput).toHaveValue("admin");
    });

    it("should update password on input change", () => {
      renderComponent();
      const passwordInput = screen.getByPlaceholderText("Enter password");
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      expect(passwordInput).toHaveValue("password123");
    });

    it("should not submit form with empty fields", () => {
      renderComponent();
      const form = screen
        .getByRole("button", { name: /login/i })
        .closest("form");
      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      form.dispatchEvent(submitEvent);
      // Form validation should prevent submission
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe("Icons", () => {
    it("should render lock icon in header", () => {
      const { container } = renderComponent();
      const headerIcon = container.querySelector(
        ".admin-login-header .fa-lock"
      );
      expect(headerIcon).toBeInTheDocument();
    });

    it("should render user icon in username field", () => {
      const { container } = renderComponent();
      const userIcon = container.querySelector(".fa-user");
      expect(userIcon).toBeInTheDocument();
    });

    it("should render key icon in password field", () => {
      const { container } = renderComponent();
      const keyIcon = container.querySelector(".fa-key");
      expect(keyIcon).toBeInTheDocument();
    });

    it("should render sign-in icon in login button", () => {
      const { container } = renderComponent();
      const signInIcon = container.querySelector(".fa-sign-in-alt");
      expect(signInIcon).toBeInTheDocument();
    });
  });

  describe("CSS Classes", () => {
    it("should have admin-login-container class", () => {
      const { container } = renderComponent();
      expect(
        container.querySelector(".admin-login-container")
      ).toBeInTheDocument();
    });

    it("should have admin-login-box class", () => {
      const { container } = renderComponent();
      expect(container.querySelector(".admin-login-box")).toBeInTheDocument();
    });

    it("should have admin-login-form class", () => {
      const { container } = renderComponent();
      expect(container.querySelector(".admin-login-form")).toBeInTheDocument();
    });
  });

  describe("Labels", () => {
    it("should have username label", () => {
      renderComponent();
      expect(screen.getByText("Username")).toBeInTheDocument();
    });

    it("should have password label", () => {
      renderComponent();
      expect(screen.getByText("Password")).toBeInTheDocument();
    });

    it("should have correct label for attributes", () => {
      renderComponent();
      const usernameLabel = screen.getByText("Username").closest("label");
      const passwordLabel = screen.getByText("Password").closest("label");
      expect(usernameLabel).toHaveAttribute("for", "username");
      expect(passwordLabel).toHaveAttribute("for", "password");
    });
  });
});
