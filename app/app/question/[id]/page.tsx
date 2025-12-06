"use client";

import React from "react";
import { useParams } from "next/navigation";
import QuestionCard from "@/components/common/question-card";
import AnswerList from "@/components/common/answer-list";
import AnswerForm from "@/components/common/answer-form";
import Button from "@/components/ui/button";
import { usePost, usePostAnswers, usePosts } from "@/hooks/usePosts";
import { formatDistanceToNow } from "date-fns";

export default function QuestionPage() {
  const params = useParams();
  const postId = params?.id as string;

  const {
    data: post,
    isLoading: postLoading,
    isError: postError,
  } = usePost(postId);
  const { data: answersData, isLoading: answersLoading } = usePostAnswers(
    postId,
    { limit: 20 }
  );
  const { data: relatedPostsData } = usePosts({
    limit: 3,
    category: post?.category,
    sortBy: "recent",
  });

  // Format post for QuestionCard
  const formattedPost = post
    ? {
        id: post.id,
        question: post.title,
        author: {
          name:
            post.author?.displayName ||
            `${post.author?.firstName || ""} ${post.author?.lastName || ""}`.trim() ||
            "User",
          username: post.author?.username || "username",
          avatar: post.author?.avatar,
          reputation: post.author?.reputation || 0,
          level: post.author?.level || 1,
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
      }
    : null;

  // Format answers
  const answers = answersData?.answers || [];

  // Format related posts
  const relatedPosts =
    relatedPostsData?.posts
      .filter(
        (p) => p.id !== postId && p.tags?.some((t) => post?.tags?.includes(t))
      )
      .slice(0, 3)
      .map((p) => {
        const author = p.author || {
          id: p.authorId,
          username: "user",
          firstName: "User",
          lastName: "",
          displayName: "User",
          reputation: 0,
          level: 1,
        };

        return {
          id: p.id,
          question: p.title,
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
          topics: p.tags || [],
          books: p.verses?.map((v) => v.book) || [],
          answerCount: p.answerCount || 0,
          upvotes: p.upvoteCount || 0,
          views: p.viewCount || 0,
          timestamp: p.createdAt
            ? formatDistanceToNow(new Date(p.createdAt), { addSuffix: true })
            : "just now",
          images:
            p.media?.filter((m) => m.type === "image").map((m) => m.url) || [],
        };
      }) || [];

  if (postLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="h-32 bg-[#e8dfd0] rounded animate-pulse" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-[#e8dfd0] rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (postError || !post || !formattedPost) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-[#3d2817] mb-2">
          Post not found
        </h2>
        <p className="text-[#6b5d4a]">
          The post you&apos;re looking for doesn&apos;t exist or has been
          deleted.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Post */}
      <div className="mb-6">
        <QuestionCard {...formattedPost} />
      </div>

      {/* Answers Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#3d2817]">
            {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
          </h2>
          <div className="flex gap-2">
            <Button
              buttonType="secondary"
              buttonVariant="outline"
              buttonSize="small"
              buttonText="Sort: Top"
            />
          </div>
        </div>

        {answersLoading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-[#e8dfd0] rounded animate-pulse"
              />
            ))}
          </div>
        ) : answers.length === 0 ? (
          <div className="text-center py-8 text-[#6b5d4a]">
            <p>No answers yet. Be the first to answer!</p>
          </div>
        ) : (
          <AnswerList answers={answers} postId={postId} />
        )}
      </div>

      {/* Answer Form */}
      {!post.isLocked && (
        <div className="mb-8">
          <AnswerForm postId={postId} />
        </div>
      )}

      {post.isLocked && (
        <div className="mb-8 p-4 bg-[#f5f1eb] border border-[#e8dfd0] rounded-lg text-center">
          <p className="text-[#6b5d4a]">
            This post is locked. No new answers can be added.
          </p>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-[#3d2817] mb-4">
            Related Posts
          </h3>
          <div className="space-y-4">
            {relatedPosts.map((q) => (
              <QuestionCard key={q.id} {...q} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
