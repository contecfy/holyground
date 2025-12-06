/**
 * Authentication Hooks
 * React Query hooks for authentication operations
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth-store";
import { authApi } from "@/lib/api/auth";
import { RegisterRequest, LoginRequest } from "@/lib/api/types";
import { useRouter } from "next/navigation";

/**
 * Hook for user registration
 */
export const useRegister = () => {
  const { setAuth, setLoading } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      setAuth(data.user, data.tokens);
      setLoading(false);
      // Redirect to app after successful registration
      router.push("/app");
    },
    onError: (error: Error) => {
      setLoading(false);
      throw error;
    },
  });
};

/**
 * Hook for user login
 */
export const useLogin = () => {
  const { setAuth, setLoading } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      setAuth(data.user, data.tokens);
      setLoading(false);
      // Redirect to app after successful login
      router.push("/app");
    },
    onError: (error: Error) => {
      setLoading(false);
      throw error;
    },
  });
};

/**
 * Hook for token refresh
 */
export const useRefreshToken = () => {
  const { setTokens } = useAuthStore();

  return useMutation({
    mutationFn: (refreshToken: string) =>
      authApi.refreshToken({ refreshToken }),
    onSuccess: (tokens) => {
      setTokens(tokens);
    },
  });
};

/**
 * Hook for user logout
 */
export const useLogout = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
      // Clear auth state
      logout();
      // Redirect to login
      router.push("/login");
    },
    onError: () => {
      // Even if logout fails on server, clear local state
      queryClient.clear();
      logout();
      router.push("/login");
    },
  });
};

/**
 * Hook to check if user is authenticated
 */
export const useIsAuthenticated = () => {
  const { isAuthenticated, user } = useAuthStore();
  return { isAuthenticated, user };
};
