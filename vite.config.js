import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    css: true,
    passWithNoTests: true, // Exit successfully if no tests found
    testTimeout: 10000, // 10 second timeout for tests
    hookTimeout: 10000, // 10 second timeout for hooks
    teardownTimeout: 10000, // 10 second timeout for teardown
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "src/test/", "**/*.config.js"],
    },
  },
});
