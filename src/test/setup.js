import { afterEach, beforeAll, afterAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Cleanup after each test case
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock localStorage
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
};

// Set shorter default timeout for waitFor in tests
global.testTimeout = 3000;

// Mock console.error and console.warn to reduce noise in test output
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Warning: ReactDOM.render") ||
        args[0].includes("Not implemented: HTMLFormElement.prototype.submit") ||
        args[0].includes("Contact form error") ||
        args[0].includes("Error loading gallery") ||
        args[0].includes("Error loading reviews") ||
        args[0].includes("Error loading dashboard stats") ||
        args[0].includes("loadReviews"))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args) => {
    // Suppress React act() warnings - these are not failures
    if (
      typeof args[0] === "string" &&
      (args[0].includes("An update to") ||
        args[0].includes("was not wrapped in act") ||
        args[0].includes("When testing, code that causes React state updates"))
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});
