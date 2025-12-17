import React, { createContext, useState, useContext, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user has a token and verify it
    const verifyToken = async () => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        try {
          const response = await authAPI.verify();
          if (response.success) {
            setIsAuthenticated(true);
            setUser(response.user);
          } else {
            localStorage.removeItem("adminToken");
          }
        } catch (err) {
          console.error("Token verification failed:", err);
          localStorage.removeItem("adminToken");
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  const login = async (username, password) => {
    try {
      setError(null);
      const response = await authAPI.login(username, password);

      if (response.success) {
        localStorage.setItem("adminToken", response.token);
        setIsAuthenticated(true);
        setUser(response.user);
        return { success: true };
      }
      return { success: false, error: "Login failed" };
    } catch (err) {
      const errorMessage = err.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("adminToken");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
