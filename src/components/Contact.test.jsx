import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Contact from "./Contact";

// Mock fetch
global.fetch = vi.fn();

describe("Contact Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.open = vi.fn();
    global.alert = vi.fn();
  });

  describe("Rendering", () => {
    it("should render the contact form", () => {
      render(<Contact />);

      expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Your Email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Subject/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Your Message/i)).toBeInTheDocument();
    });

    it("should render submit button", () => {
      render(<Contact />);
      expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
    });

    it("should render WhatsApp button", () => {
      render(<Contact />);
      expect(screen.getByText(/WhatsApp/i)).toBeInTheDocument();
    });

    it("should render contact information", () => {
      render(<Contact />);
      expect(screen.getByText(/250788309472/i)).toBeInTheDocument();
      expect(screen.getByText(/delishkamuta@gmail.com/i)).toBeInTheDocument();
    });
  });

  describe("Form Handling", () => {
    it("should update form fields on change", () => {
      render(<Contact />);

      const nameInput = screen.getByPlaceholderText(/Your Name/i);
      const emailInput = screen.getByPlaceholderText(/Your Email/i);

      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });

      expect(nameInput.value).toBe("John Doe");
      expect(emailInput.value).toBe("john@example.com");
    });

    it("should handle form submission successfully", async () => {
      global.fetch.mockResolvedValueOnce({ ok: true });

      render(<Contact />);

      fireEvent.change(screen.getByPlaceholderText(/Your Name/i), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Your Email/i), {
        target: { value: "john@example.com" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Your Message/i), {
        target: { value: "Test message" },
      });

      const submitButton = screen.getByRole("button", {
        name: /send/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });

    it("should clear form after successful submission", async () => {
      global.fetch.mockResolvedValueOnce({ ok: true });

      render(<Contact />);

      const nameInput = screen.getByPlaceholderText(/Your Name/i);
      const emailInput = screen.getByPlaceholderText(/Your Email/i);
      const messageInput = screen.getByPlaceholderText(/Your Message/i);

      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.change(messageInput, { target: { value: "Test message" } });

      const submitButton = screen.getByRole("button", {
        name: /send/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(nameInput.value).toBe("");
        expect(emailInput.value).toBe("");
        expect(messageInput.value).toBe("");
      });
    });

    it("should show alert on submission failure", async () => {
      global.fetch.mockRejectedValueOnce(new Error("Network error"));

      render(<Contact />);

      fireEvent.change(screen.getByPlaceholderText(/Your Name/i), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Your Email/i), {
        target: { value: "john@example.com" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Your Message/i), {
        target: { value: "Test message" },
      });

      const submitButton = screen.getByRole("button", {
        name: /send/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalled();
      });
    });
  });

  describe("WhatsApp Integration", () => {
    it("should open WhatsApp with correct parameters", () => {
      render(<Contact />);

      const whatsappButton = screen.getByText(/WhatsApp/i);
      fireEvent.click(whatsappButton);

      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("250788309472"),
        "_blank"
      );
    });
  });

  describe("Section Attributes", () => {
    it("should have correct section id", () => {
      const { container } = render(<Contact />);
      const section = container.querySelector("#contact");
      expect(section).toBeInTheDocument();
    });
  });
});
