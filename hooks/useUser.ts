/**
 * User Hooks
 * React Query hooks for user operations
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth-store";
import { usersApi } from "@/lib/api/users";
import {
  UpdateProfileRequest,
  UpdatePreferencesRequest,
  ChangePasswordRequest,
} from "@/lib/api/types";

/**
 * Hook to get current user profile
 */
export const useMe = () => {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["user", "me"],
    queryFn: () => usersApi.getMe(),
    enabled: isAuthenticated, // Only fetch if authenticated
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 1,
  });
};

/**
 * Hook to update user profile
 */
export const useUpdateProfile = () => {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => usersApi.updateProfile(data),
    onSuccess: (updatedUser) => {
      // Update auth store
      setUser(updatedUser);
      // Update React Query cache
      queryClient.setQueryData(["user", "me"], updatedUser);
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

/**
 * Hook to update user preferences
 */
export const useUpdatePreferences = () => {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePreferencesRequest) =>
      usersApi.updatePreferences(data),
    onSuccess: (updatedUser) => {
      // Update auth store
      setUser(updatedUser);
      // Update React Query cache
      queryClient.setQueryData(["user", "me"], updatedUser);
    },
  });
};

/**
 * Hook to change user password
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => usersApi.changePassword(data),
  });
};

/**
 * Hook to get user by ID (public profile)
 */
export const useUser = (userId: string | null) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => usersApi.getUserById(userId!),
    enabled: !!userId, // Only fetch if userId is provided
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
};

/**
 * Hook to get all users (with pagination)
 */
export const useUsers = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => usersApi.getAllUsers(params),
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
  });
};
