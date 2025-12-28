/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

// Helper function to get initial user state from localStorage
const getInitialUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    // Clear corrupted data
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage immediately to avoid flash of unauthenticated state
  const [user, setUser] = useState(getInitialUser);

  // Restore auth state on mount - ensures token and user are synchronized
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // If we have a token but no user, or vice versa, clear everything
    if ((token && !storedUser) || (!token && storedUser)) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      return;
    }

    // If both exist, ensure user state is set
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  const login = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      if (res.data.success && res.data.data) {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        setUser(res.data.data.user);
        return { success: true };
      }
      throw new Error(res.data.message || "Login failed");
    } catch (error) {
      console.error("Login error:", error);
      throw error.response?.data || error;
    }
  };

  const signup = async (data) => {
    try {
      const res = await api.post("/auth/signup", data);
      if (res.data.success && res.data.data) {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        setUser(res.data.data.user);
        return { success: true };
      }
      throw new Error(res.data.message || "Signup failed");
    } catch (error) {
      console.error("Signup error:", error);
      throw error.response?.data || error;
    }
  };

  const logout = () => {
    // Clear all auth-related data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Clear user state
    setUser(null);
    // Optionally clear any other cached data if needed
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
