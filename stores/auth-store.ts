/**
 * Authentication Store (Zustand)
 * Manages authentication state with persistence
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, AuthTokens } from "@/lib/api/types";

interface AuthState {
  // State
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setAuth: (user: User, tokens: AuthTokens) => void;
  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,

      // Set authentication (user + tokens)
      setAuth: (user: User, tokens: AuthTokens) => {
        // Store tokens in localStorage for API client
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", tokens.accessToken);
          localStorage.setItem("refreshToken", tokens.refreshToken);
        }

        set({
          user,
          tokens,
          isAuthenticated: true,
        });
      },

      // Update user only
      setUser: (user: User) => {
        set({ user });
      },

      // Update tokens only
      setTokens: (tokens: AuthTokens) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", tokens.accessToken);
          localStorage.setItem("refreshToken", tokens.refreshToken);
        }

        set({ tokens });
      },

      // Logout - clear all auth state
      logout: () => {
        // Clear localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          // Clear persisted Zustand state
          localStorage.removeItem("auth-storage");
        }

        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
        });
      },

      // Set loading state
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        // Only persist user and tokens, not loading/authenticated flags
        user: state.user,
        tokens: state.tokens,
      }),
      onRehydrateStorage: () => (state) => {
        // After rehydration, set isAuthenticated based on user/tokens
        if (state) {
          state.isAuthenticated = !!(state.user && state.tokens);

          // Sync tokens to localStorage if they exist
          if (state.tokens && typeof window !== "undefined") {
            localStorage.setItem("accessToken", state.tokens.accessToken);
            localStorage.setItem("refreshToken", state.tokens.refreshToken);
          }
        }
      },
    }
  )
);
