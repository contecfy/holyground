/**
 * Posts API Functions
 * All post-related API calls
 */

import apiClient from "./client";
import {
  Post,
  Answer,
  CreatePostRequest,
  UpdatePostRequest,
  ListPostsParams,
  ListPostsResponse,
  ListAnswersResponse,
  CreateAnswerRequest,
  UpdateAnswerRequest,
  VoteStatus,
} from "./types";

export const postsApi = {
  /**
   * List posts with filters and pagination
   */
  listPosts: async (params?: ListPostsParams): Promise<ListPostsResponse> => {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.category) queryParams.append("category", params.category);
    if (params?.tags) queryParams.append("tags", params.tags);
    if (params?.authorId) queryParams.append("authorId", params.authorId);
    if (params?.search) queryParams.append("search", params.search);
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);
    if (params?.hasMedia !== undefined)
      queryParams.append("hasMedia", params.hasMedia.toString());
    if (params?.hasVerses !== undefined)
      queryParams.append("hasVerses", params.hasVerses.toString());

    const url = `/api/posts${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await apiClient.get<ListPostsResponse>(url);

    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to fetch posts");
    }
    return response.data;
  },

  /**
   * Get post by ID
   */
  getPost: async (postId: string): Promise<Post> => {
    const response = await apiClient.get<{ post: Post }>(
      `/api/posts/${postId}`
    );
    if (!response.success || !response.data?.post) {
      throw new Error(response.message || "Failed to get post");
    }
    return response.data.post;
  },

  /**
   * Create a new post
   */
  createPost: async (data: CreatePostRequest): Promise<Post> => {
    const response = await apiClient.post<{ post: Post }>("/api/posts", data);
    if (!response.success || !response.data?.post) {
      throw new Error(response.message || "Failed to create post");
    }
    return response.data.post;
  },

  /**
   * Update a post
   */
  updatePost: async (
    postId: string,
    data: UpdatePostRequest
  ): Promise<Post> => {
    const response = await apiClient.patch<{ post: Post }>(
      `/api/posts/${postId}`,
      data
    );
    if (!response.success || !response.data?.post) {
      throw new Error(response.message || "Failed to update post");
    }
    return response.data.post;
  },

  /**
   * Delete a post
   */
  deletePost: async (postId: string): Promise<void> => {
    const response = await apiClient.delete(`/api/posts/${postId}`);
    if (!response.success) {
      throw new Error(response.message || "Failed to delete post");
    }
  },

  /**
   * Upvote a post
   */
  upvotePost: async (postId: string): Promise<void> => {
    const response = await apiClient.post(`/api/posts/${postId}/upvote`);
    if (!response.success) {
      throw new Error(response.message || "Failed to upvote post");
    }
  },

  /**
   * Remove upvote from post
   */
  removeUpvote: async (postId: string): Promise<void> => {
    const response = await apiClient.delete(`/api/posts/${postId}/upvote`);
    if (!response.success) {
      throw new Error(response.message || "Failed to remove upvote");
    }
  },

  /**
   * Downvote a post
   */
  downvotePost: async (postId: string): Promise<void> => {
    const response = await apiClient.post(`/api/posts/${postId}/downvote`);
    if (!response.success) {
      throw new Error(response.message || "Failed to downvote post");
    }
  },

  /**
   * Remove downvote from post
   */
  removeDownvote: async (postId: string): Promise<void> => {
    const response = await apiClient.delete(`/api/posts/${postId}/downvote`);
    if (!response.success) {
      throw new Error(response.message || "Failed to remove downvote");
    }
  },

  /**
   * Get user's vote status for a post
   */
  getVoteStatus: async (postId: string): Promise<VoteStatus> => {
    const response = await apiClient.get<{ status: VoteStatus }>(
      `/api/posts/${postId}/vote-status`
    );
    if (!response.success || !response.data?.status) {
      throw new Error(response.message || "Failed to get vote status");
    }
    return response.data.status;
  },

  /**
   * Share a post
   */
  sharePost: async (
    postId: string,
    data?: { sharedTo?: string; message?: string }
  ): Promise<void> => {
    const response = await apiClient.post(`/api/posts/${postId}/share`, data);
    if (!response.success) {
      throw new Error(response.message || "Failed to share post");
    }
  },

  /**
   * Bookmark a post
   */
  bookmarkPost: async (postId: string): Promise<void> => {
    const response = await apiClient.post(`/api/posts/${postId}/bookmark`);
    if (!response.success) {
      throw new Error(response.message || "Failed to bookmark post");
    }
  },

  /**
   * Remove bookmark from post
   */
  removeBookmark: async (postId: string): Promise<void> => {
    const response = await apiClient.delete(`/api/posts/${postId}/bookmark`);
    if (!response.success) {
      throw new Error(response.message || "Failed to remove bookmark");
    }
  },

  /**
   * Pin a post
   */
  pinPost: async (postId: string): Promise<void> => {
    const response = await apiClient.post(`/api/posts/${postId}/pin`);
    if (!response.success) {
      throw new Error(response.message || "Failed to pin post");
    }
  },

  /**
   * Unpin a post
   */
  unpinPost: async (postId: string): Promise<void> => {
    const response = await apiClient.post(`/api/posts/${postId}/unpin`);
    if (!response.success) {
      throw new Error(response.message || "Failed to unpin post");
    }
  },

  /**
   * Lock a post
   */
  lockPost: async (postId: string): Promise<void> => {
    const response = await apiClient.post(`/api/posts/${postId}/lock`);
    if (!response.success) {
      throw new Error(response.message || "Failed to lock post");
    }
  },

  /**
   * Unlock a post
   */
  unlockPost: async (postId: string): Promise<void> => {
    const response = await apiClient.post(`/api/posts/${postId}/unlock`);
    if (!response.success) {
      throw new Error(response.message || "Failed to unlock post");
    }
  },

  /**
   * Get answers for a post
   */
  getPostAnswers: async (
    postId: string,
    params?: { page?: number; limit?: number }
  ): Promise<ListAnswersResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const url = `/api/posts/${postId}/answers${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await apiClient.get<ListAnswersResponse>(url);

    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to get answers");
    }
    return response.data;
  },

  /**
   * Create an answer (comment) on a post
   */
  createAnswer: async (
    postId: string,
    data: CreateAnswerRequest
  ): Promise<Answer> => {
    const response = await apiClient.post<{ answer: Answer }>(
      `/api/posts/${postId}/answers`,
      data
    );
    if (!response.success || !response.data?.answer) {
      throw new Error(response.message || "Failed to create answer");
    }
    return response.data.answer;
  },

  /**
   * Update an answer
   */
  updateAnswer: async (
    postId: string,
    answerId: string,
    data: UpdateAnswerRequest
  ): Promise<Answer> => {
    const response = await apiClient.patch<{ answer: Answer }>(
      `/api/posts/${postId}/answers/${answerId}`,
      data
    );
    if (!response.success || !response.data?.answer) {
      throw new Error(response.message || "Failed to update answer");
    }
    return response.data.answer;
  },

  /**
   * Delete an answer
   */
  deleteAnswer: async (postId: string, answerId: string): Promise<void> => {
    const response = await apiClient.delete(
      `/api/posts/${postId}/answers/${answerId}`
    );
    if (!response.success) {
      throw new Error(response.message || "Failed to delete answer");
    }
  },

  /**
   * Upvote an answer
   */
  upvoteAnswer: async (postId: string, answerId: string): Promise<void> => {
    const response = await apiClient.post(
      `/api/posts/${postId}/answers/${answerId}/upvote`
    );
    if (!response.success) {
      throw new Error(response.message || "Failed to upvote answer");
    }
  },

  /**
   * Downvote an answer
   */
  downvoteAnswer: async (postId: string, answerId: string): Promise<void> => {
    const response = await apiClient.post(
      `/api/posts/${postId}/answers/${answerId}/downvote`
    );
    if (!response.success) {
      throw new Error(response.message || "Failed to downvote answer");
    }
  },

  /**
   * Remove vote from an answer
   */
  removeAnswerVote: async (postId: string, answerId: string): Promise<void> => {
    const response = await apiClient.delete(
      `/api/posts/${postId}/answers/${answerId}/vote`
    );
    if (!response.success) {
      throw new Error(response.message || "Failed to remove vote");
    }
  },
};
