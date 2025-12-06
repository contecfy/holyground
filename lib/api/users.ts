/**
 * User API Functions
 * All user-related API calls
 */

import apiClient from "./client";
import {
  User,
  UpdateProfileRequest,
  UpdatePreferencesRequest,
  ChangePasswordRequest,
} from "./types";

export const usersApi = {
  /**
   * Get current user profile
   */
  getMe: async (): Promise<User> => {
    const response = await apiClient.get<{ user: User }>("/api/auth/me");
    if (!response.success || !response.data?.user) {
      throw new Error(response.message || "Failed to get user profile");
    }
    return response.data.user;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
    const response = await apiClient.patch<{ user: User }>(
      "/api/auth/me",
      data
    );
    if (!response.success || !response.data?.user) {
      throw new Error(response.message || "Failed to update profile");
    }
    return response.data.user;
  },

  /**
   * Update user preferences
   */
  updatePreferences: async (data: UpdatePreferencesRequest): Promise<User> => {
    const response = await apiClient.patch<{ user: User }>(
      "/api/auth/me/preferences",
      data
    );
    if (!response.success || !response.data?.user) {
      throw new Error(response.message || "Failed to update preferences");
    }
    return response.data.user;
  },

  /**
   * Change user password
   */
  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    const response = await apiClient.post("/api/auth/me/change-password", data);
    if (!response.success) {
      throw new Error(response.message || "Failed to change password");
    }
  },

  /**
   * Get user by ID (public profile)
   */
  getUserById: async (userId: string): Promise<User> => {
    const response = await apiClient.get<{ user: User }>(
      `/api/auth/users/${userId}`
    );
    if (!response.success || !response.data?.user) {
      throw new Error(response.message || "Failed to get user");
    }
    return response.data.user;
  },

  /**
   * Get all users (with pagination)
   */
  getAllUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{
    users: User[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);

    const url = `/api/auth/users${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await apiClient.get<{
      users: User[];
      total: number;
      page: number;
      totalPages: number;
    }>(url);

    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to get users");
    }
    return response.data;
  },
};
