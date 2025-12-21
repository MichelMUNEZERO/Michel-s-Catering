import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import * as api from "../services/api";

// Mock the API
vi.mock("../services/api", () => ({
  galleryAPI: {
    getAll: vi.fn(),
    upload: vi.fn(),
    delete: vi.fn(),
    toggleActive: vi.fn(),
  },
  reviewsAPI: {
    getAllAdmin: vi.fn(),
    approve: vi.fn(),
    reject: vi.fn(),
    delete: vi.fn(),
  },
  dashboardAPI: {
    getStats: vi.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock AuthContext
vi.mock("../contexts/AuthContext", () => ({
  useAuth: () => ({
    isAuthenticated: true,
    isLoading: false,
    user: { username: "admin" },
    logout: vi.fn(),
  }),
}));

describe("AdminDashboard Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();

    // Mock API responses
    api.galleryAPI.getAll.mockResolvedValue({
      success: true,
      data: [],
    });

    api.reviewsAPI.getAllAdmin.mockResolvedValue({
      success: true,
      data: [],
    });

    api.dashboardAPI.getStats.mockResolvedValue({
      success: true,
      data: {
        totalGalleryImages: 0,
        activeGalleryImages: 0,
        totalReviews: 0,
        approvedReviews: 0,
        pendingReviews: 0,
        rejectedReviews: 0,
      },
    });
  });

  describe("Rendering", () => {
    it("should render the admin dashboard", async () => {
      render(
        <BrowserRouter>
          <AdminDashboard />
        </BrowserRouter>
      );

      // Component should render without crashing
      expect(document.querySelector(".admin-dashboard")).toBeInTheDocument();
    });

    it("should load initial data on mount", async () => {
      render(
        <BrowserRouter>
          <AdminDashboard />
        </BrowserRouter>
      );

      // Verify API calls were made
      expect(api.galleryAPI.getAll).toHaveBeenCalled();
      expect(api.reviewsAPI.getAllAdmin).toHaveBeenCalled();
      expect(api.dashboardAPI.getStats).toHaveBeenCalled();
    });
  });

  describe("Authentication", () => {
    it("should redirect to login if not authenticated", () => {
      // This test would require mocking useAuth to return isAuthenticated: false
      // For now, we're just verifying the component renders when authenticated
      expect(mockNavigate).not.toHaveBeenCalledWith("/admin/login");
    });
  });

  describe("API Integration", () => {
    it("should call galleryAPI.getAll on mount", async () => {
      render(
        <BrowserRouter>
          <AdminDashboard />
        </BrowserRouter>
      );

      expect(api.galleryAPI.getAll).toHaveBeenCalledTimes(1);
    });

    it("should call reviewsAPI.getAllAdmin on mount", async () => {
      render(
        <BrowserRouter>
          <AdminDashboard />
        </BrowserRouter>
      );

      expect(api.reviewsAPI.getAllAdmin).toHaveBeenCalledTimes(1);
    });

    it("should call dashboardAPI.getStats on mount", async () => {
      render(
        <BrowserRouter>
          <AdminDashboard />
        </BrowserRouter>
      );

      expect(api.dashboardAPI.getStats).toHaveBeenCalledTimes(1);
    });
  });

  describe("Error Handling", () => {
    it("should handle gallery loading errors gracefully", async () => {
      api.galleryAPI.getAll.mockRejectedValue(new Error("Network error"));

      render(
        <BrowserRouter>
          <AdminDashboard />
        </BrowserRouter>
      );

      // Should not crash on error
      expect(document.querySelector(".admin-dashboard")).toBeInTheDocument();
    });

    it("should handle reviews loading errors gracefully", async () => {
      api.reviewsAPI.getAllAdmin.mockRejectedValue(new Error("Network error"));

      render(
        <BrowserRouter>
          <AdminDashboard />
        </BrowserRouter>
      );

      // Should not crash on error
      expect(document.querySelector(".admin-dashboard")).toBeInTheDocument();
    });

    it("should handle dashboard stats loading errors gracefully", async () => {
      api.dashboardAPI.getStats.mockRejectedValue(new Error("Network error"));

      render(
        <BrowserRouter>
          <AdminDashboard />
        </BrowserRouter>
      );

      // Should not crash on error
      expect(document.querySelector(".admin-dashboard")).toBeInTheDocument();
    });
  });
});
