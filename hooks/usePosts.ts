/**
 * Posts Hooks
 * React Query hooks for post operations
 */

import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { postsApi } from "@/lib/api/posts";
import {
  CreatePostRequest,
  UpdatePostRequest,
  ListPostsParams,
  CreateAnswerRequest,
  UpdateAnswerRequest,
  Post,
} from "@/lib/api/types";

/**
 * Hook to list posts with pagination
 */
export const usePosts = (params?: ListPostsParams) => {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => postsApi.listPosts(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
};

/**
 * Hook to list posts with infinite scroll
 */
export const useInfinitePosts = (params?: Omit<ListPostsParams, "page">) => {
  return useInfiniteQuery({
    queryKey: ["posts", "infinite", params],
    queryFn: ({ pageParam = 1 }) =>
      postsApi.listPosts({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000,
  });
};

/**
 * Hook to get a single post by ID
 */
export const usePost = (postId: string | null) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => postsApi.getPost(postId!),
    enabled: !!postId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to create a post
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => postsApi.createPost(data),
    onSuccess: () => {
      // Invalidate posts list to refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

/**
 * Hook to update a post
 */
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      data,
    }: {
      postId: string;
      data: UpdatePostRequest;
    }) => postsApi.updatePost(postId, data),
    onSuccess: (updatedPost, variables) => {
      // Update the specific post in cache
      queryClient.setQueryData(["post", variables.postId], updatedPost);
      // Invalidate posts list
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

/**
 * Hook to delete a post
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postsApi.deletePost(postId),
    onSuccess: (_, postId) => {
      // Remove post from cache
      queryClient.removeQueries({ queryKey: ["post", postId] });
      // Invalidate posts list
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

/**
 * Hook to upvote a post
 */
export const useUpvotePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postsApi.upvotePost(postId),
    onMutate: async (postId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["post", postId] });

      // Snapshot previous value
      const previousPost = queryClient.getQueryData(["post", postId]);

      // Optimistically update
      queryClient.setQueryData(["post", postId], (old: Post | undefined) => {
        if (!old) return old;
        return {
          ...old,
          upvoteCount: old.upvoteCount + 1,
        };
      });

      return { previousPost };
    },
    onError: (err, postId, context) => {
      // Rollback on error
      if (context?.previousPost) {
        queryClient.setQueryData(["post", postId], context.previousPost);
      }
    },
    onSuccess: (_, postId) => {
      // Invalidate to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

/**
 * Hook to remove upvote from post
 */
export const useRemoveUpvote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postsApi.removeUpvote(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["post", postId] });
      const previousPost = queryClient.getQueryData(["post", postId]);

      queryClient.setQueryData(["post", postId], (old: Post | undefined) => {
        if (!old) return old;
        return {
          ...old,
          upvoteCount: Math.max(0, old.upvoteCount - 1),
        };
      });

      return { previousPost };
    },
    onError: (err, postId, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(["post", postId], context.previousPost);
      }
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

/**
 * Hook to downvote a post
 */
export const useDownvotePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postsApi.downvotePost(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["post", postId] });
      const previousPost = queryClient.getQueryData(["post", postId]);

      queryClient.setQueryData(["post", postId], (old: Post | undefined) => {
        if (!old) return old;
        return {
          ...old,
          downvoteCount: old.downvoteCount + 1,
        };
      });

      return { previousPost };
    },
    onError: (err, postId, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(["post", postId], context.previousPost);
      }
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

/**
 * Hook to remove downvote from post
 */
export const useRemoveDownvote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postsApi.removeDownvote(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["post", postId] });
      const previousPost = queryClient.getQueryData(["post", postId]);

      queryClient.setQueryData(["post", postId], (old: Post | undefined) => {
        if (!old) return old;
        return {
          ...old,
          downvoteCount: Math.max(0, old.downvoteCount - 1),
        };
      });

      return { previousPost };
    },
    onError: (err, postId, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(["post", postId], context.previousPost);
      }
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

/**
 * Hook to get vote status for a post
 */
export const usePostVoteStatus = (postId: string | null) => {
  return useQuery({
    queryKey: ["post", postId, "vote-status"],
    queryFn: () => postsApi.getVoteStatus(postId!),
    enabled: !!postId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

/**
 * Hook to bookmark a post
 */
export const useBookmarkPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postsApi.bookmarkPost(postId),
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

/**
 * Hook to remove bookmark from post
 */
export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postsApi.removeBookmark(postId),
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

/**
 * Hook to get answers for a post
 */
export const usePostAnswers = (
  postId: string | null,
  params?: { page?: number; limit?: number }
) => {
  return useQuery({
    queryKey: ["post", postId, "answers", params],
    queryFn: () => postsApi.getPostAnswers(postId!, params),
    enabled: !!postId,
    staleTime: 2 * 60 * 1000,
  });
};

/**
 * Hook to create an answer
 */
export const useCreateAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      data,
    }: {
      postId: string;
      data: CreateAnswerRequest;
    }) => postsApi.createAnswer(postId, data),
    onSuccess: (_, variables) => {
      // Invalidate answers list
      queryClient.invalidateQueries({
        queryKey: ["post", variables.postId, "answers"],
      });
      // Update post answer count
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

/**
 * Hook to update an answer
 */
export const useUpdateAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      answerId,
      data,
    }: {
      postId: string;
      answerId: string;
      data: UpdateAnswerRequest;
    }) => postsApi.updateAnswer(postId, answerId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["post", variables.postId, "answers"],
      });
    },
  });
};

/**
 * Hook to delete an answer
 */
export const useDeleteAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, answerId }: { postId: string; answerId: string }) =>
      postsApi.deleteAnswer(postId, answerId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["post", variables.postId, "answers"],
      });
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

/**
 * Hook to upvote an answer
 */
export const useUpvoteAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, answerId }: { postId: string; answerId: string }) =>
      postsApi.upvoteAnswer(postId, answerId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["post", variables.postId, "answers"],
      });
    },
  });
};

/**
 * Hook to downvote an answer
 */
export const useDownvoteAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, answerId }: { postId: string; answerId: string }) =>
      postsApi.downvoteAnswer(postId, answerId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["post", variables.postId, "answers"],
      });
    },
  });
};

/**
 * Hook to remove vote from answer
 */
export const useRemoveAnswerVote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, answerId }: { postId: string; answerId: string }) =>
      postsApi.removeAnswerVote(postId, answerId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["post", variables.postId, "answers"],
      });
    },
  });
};
