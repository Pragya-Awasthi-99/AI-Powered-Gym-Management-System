/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let restoredUser = null;
  
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
  
    if (token && storedUser) {
      try {
        restoredUser = JSON.parse(storedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.clear();
      }
    }
  
    setUser(restoredUser);
    setLoading(false);
  }, []);
  

  // 🔐 LOGIN
  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);

    // ✅ SUPPORT BOTH BACKEND RESPONSE STYLES
    const token = res.data.token || res.data?.data?.token;
    const userData = res.data.user || res.data?.data?.user;

    if (!token || !userData) {
      throw new Error("Invalid login response");
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    return userData;
  };

  // 📝 SIGNUP
  const signup = async (data) => {
    const res = await api.post("/auth/signup", data);

    const token = res.data.token || res.data?.data?.token;
    const userData = res.data.user || res.data?.data?.user;

    if (!token || !userData) {
      throw new Error("Invalid signup response");
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    return userData;
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
