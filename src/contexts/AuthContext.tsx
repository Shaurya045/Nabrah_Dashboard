import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface AuthContextType {
  user: any | null;
  login: (username: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  requestVerifyToken: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth-token");
      if (token) {
        // In a real application, you would validate the token here
        setUser({ token });
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  // useEffect(() => {
  //   if (
  //     isAuthenticated &&
  //     (location.pathname === "/signin" || location.pathname === "/signup")
  //   ) {
  //     navigate("/project");
  //   }
  // }, [isAuthenticated, location, navigate]);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    console.log(1)
    try {
    // Create URLSearchParams for x-www-form-urlencoded format
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    
      const response = await fetch("https://api.nabrah.ai/api/auth/jwt/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),  // Use URLSearchParams as body
    });

      if (!response.ok) {
        throw new Error("Login failed");
      }
    console.log(2)
      const data = await response.json();
      console.log(3)
      localStorage.setItem("auth-token", data.access_token);
      setUser(data.user);
      setIsAuthenticated(true);
      navigate("/project");
    } catch (error) {
      console.log(4)
      throw new Error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.nabrah.ai/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, is_active: true, is_superuser: false, is_verified: false }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      navigate("/signin");
    } catch (error) {
      throw new Error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.nabrah.ai/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send password reset email");
      }

      return await response.json();
    } catch (error) {
      throw new Error("Failed to process forgot password request");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.nabrah.ai/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      return await response.json();
    } catch (error) {
      throw new Error("Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  const requestVerifyToken = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.nabrah.ai/api/auth/request-verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to request verification token");
      }

      return await response.json();
    } catch (error) {
      throw new Error("Failed to request verification token");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.nabrah.ai/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify email");
      }

      return await response.json();
    } catch (error) {
      throw new Error("Failed to verify email");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("https://api.nabrah.ai/api/auth/jwt/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(token)
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }
      localStorage.removeItem("auth-token");
      setUser(null);
      setIsAuthenticated(false);
      navigate("/signin");
    } catch (error) {
      throw new Error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const value = {
    user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    requestVerifyToken,
    verifyEmail,
    isAuthenticated,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}