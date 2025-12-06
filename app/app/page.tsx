"use client";

import QuestionCard from "@/components/common/question-card";
import Button from "@/components/ui/button";
import { useInfinitePosts } from "@/hooks/usePosts";
import { formatDistanceToNow } from "date-fns";

export default function AppHome() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfinitePosts({
    limit: 20,
    sortBy: "recent",
  });

  // Flatten all pages into a single array
  const posts = data?.pages.flatMap((page) => page.posts) || [];

  // Format post data for QuestionCard component
  const formattedPosts = posts.map((post) => {
    // Handle author - backend should populate author, but provide fallback
    const author = post.author || {
      id: post.authorId,
      username: "user",
      firstName: "User",
      lastName: "",
      displayName: "User",
      avatar: undefined,
      reputation: 0,
      level: 1,
    };

    return {
      id: post.id,
      question: post.title,
      content: post.content,
      author: {
        name:
          author.displayName ||
          `${author.firstName} ${author.lastName}` ||
          "User",
        username: author.username || "username",
        avatar: author.avatar,
        reputation: author.reputation || 0,
        level: author.level || 1,
      },
      topics: post.tags || [],
      books: post.verses?.map((v) => v.book) || [],
      answerCount: post.answerCount || 0,
      upvotes: post.upvoteCount || 0,
      views: post.viewCount || 0,
      timestamp: post.createdAt
        ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
        : "just now",
      images:
        post.media?.filter((m) => m.type === "image").map((m) => m.url) || [],
    };
  });

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="py-4 px-0 md:px-4 border-t border-b border-[#e8dfd0]/80 bg-[#f5f1eb]/30 animate-pulse"
            >
              <div className="h-6 bg-[#e8dfd0] rounded mb-3 w-3/4" />
              <div className="h-4 bg-[#e8dfd0] rounded mb-2 w-full" />
              <div className="h-4 bg-[#e8dfd0] rounded mb-4 w-2/3" />
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-[#e8dfd0] rounded w-16" />
                <div className="h-6 bg-[#e8dfd0] rounded w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
          <p className="text-red-700">
            Failed to load posts. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}

      {/* Posts Feed */}
      <div className="space-y-4">
        {formattedPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#6b5d4a]">
              No posts yet. Be the first to share!
            </p>
          </div>
        ) : (
          formattedPosts.map((post) => <QuestionCard key={post.id} {...post} />)
        )}
      </div>

      {/* Load More */}
      {hasNextPage && (
        <div className="mt-8 text-center">
          <Button
            buttonType="secondary"
            buttonVariant="outline"
            buttonText={isFetchingNextPage ? "Loading..." : "Load More Posts"}
            onClick={() => fetchNextPage()}
            buttonDisabled={isFetchingNextPage}
            className="w-full md:w-auto"
          />
        </div>
      )}
    </div>
  );
}
