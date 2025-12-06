/**
 * Authentication API Functions
 * All auth-related API calls
 */

import apiClient from "./client";
import {
  RegisterRequest,
  LoginRequest,
  RefreshTokenRequest,
  AuthResponse,
} from "./types";

export const authApi = {
  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/api/auth/register",
      data
    );
    if (!response.success || !response.data) {
      throw new Error(response.message || "Registration failed");
    }
    return response.data;
  },

  /**
   * Login user
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/api/auth/login",
      data
    );
    if (!response.success || !response.data) {
      throw new Error(response.message || "Login failed");
    }
    return response.data;
  },

  /**
   * Refresh access token
   */
  refreshToken: async (
    data: RefreshTokenRequest
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const response = await apiClient.post<{
      tokens: { accessToken: string; refreshToken: string };
    }>("/api/auth/refresh", data);
    if (!response.success || !response.data?.tokens) {
      throw new Error(response.message || "Token refresh failed");
    }
    return response.data.tokens;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/api/auth/logout");
    } catch (error) {
      // Even if logout fails on server, we should clear local state
      console.error("Logout error:", error);
    }
  },
};
