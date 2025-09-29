// Backend API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.PROD
    ? "https://your-backend-url.com/api" // Replace with your deployed backend URL
    : "http://localhost:8000/api",
  endpoints: {
    googleAuth: "/auth/google",
    profile: "/auth/profile",
    verify: "/auth/verify",
    logout: "/auth/logout",
    health: "/health",
  },
};

// API helper functions
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.baseURL}${endpoint}`;
  const token = localStorage.getItem("token");

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Authentication helper functions
export const loginWithGoogle = () => {
  window.location.href = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.googleAuth}`;
};

export const verifyToken = async () => {
  try {
    const response = await apiRequest(API_CONFIG.endpoints.verify, {
      method: "POST",
    });
    return response.data.user;
  } catch {
    // Token is invalid, remove it
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return null;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await apiRequest(API_CONFIG.endpoints.profile);
    return response.data.user;
  } catch (error) {
    console.error("Failed to get user profile:", error);
    return null;
  }
};

export const logout = async () => {
  try {
    await apiRequest(API_CONFIG.endpoints.logout, {
      method: "POST",
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Always clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};
