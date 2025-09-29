// Backend API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.PROD
    ? "https://healthcare-backend-h52l.onrender.com/api"
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
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    credentials: "include", // Important for CORS with credentials
    mode: "cors", // Explicitly set CORS mode
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);

    // Handle non-JSON responses
    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error(
        data.message ||
          data ||
          `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);

    // Handle network errors
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Network error: Unable to connect to server");
    }

    throw error;
  }
};

// Health check function
export const checkBackendHealth = async () => {
  try {
    const response = await apiRequest(API_CONFIG.endpoints.health);
    return response.status === "success";
  } catch (error) {
    console.error("Backend health check failed:", error);
    return false;
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
