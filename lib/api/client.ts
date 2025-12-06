/**
 * API Client Configuration
 * Handles all HTTP requests with interceptors for auth and error handling
 */

import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";
import { ApiResponse } from "./types";

// Get API base URL from environment variable or use default
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000, // 30 seconds
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - Add auth token to requests
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Get token from localStorage (will be managed by auth store)
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("accessToken");
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle errors and token refresh
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError<ApiResponse>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // Handle 401 Unauthorized - Try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
              this.handleLogout();
              return Promise.reject(error);
            }

            // Attempt to refresh token
            const response = await axios.post<
              ApiResponse<{
                tokens: { accessToken: string; refreshToken: string };
              }>
            >(`${API_BASE_URL}/api/auth/refresh`, { refreshToken });

            if (response.data.success && response.data.data?.tokens) {
              const { accessToken, refreshToken: newRefreshToken } =
                response.data.data.tokens;

              // Update tokens in localStorage
              localStorage.setItem("accessToken", accessToken);
              localStorage.setItem("refreshToken", newRefreshToken);

              // Retry original request with new token
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              }
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed - logout user
            this.handleLogout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private handleLogout(): void {
    // Clear tokens
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // Redirect to login page
      window.location.href = "/login";
    }
  }

  // Generic request methods
  async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  // Get the underlying axios instance if needed
  getInstance(): AxiosInstance {
    return this.client;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
