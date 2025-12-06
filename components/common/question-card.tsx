"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  Eye,
  BookOpen,
  Bookmark,
  Check,
  X,
  ArrowUpWideNarrow,
  Share2,
} from "lucide-react";
import Avatar from "../ui/avatar";
import Badge from "../ui/badge";
import {
  useUpvotePost,
  useRemoveUpvote,
  useDownvotePost,
  useRemoveDownvote,
  usePostVoteStatus,
  useBookmarkPost,
  useRemoveBookmark,
} from "@/hooks/usePosts";

export interface QuestionCardProps {
  id: string;
  question: string;
  content?: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
    reputation?: number;
    level?: number;
  };
  topics: string[];
  books?: string[];
  answerCount: number;
  upvotes: number;
  views: number;
  timestamp: string;
  isAnswered?: boolean;
  images?: string[];
  topAnswer?: {
    author: string;
    preview: string;
  };
}

const QuestionCard = ({
  id,
  question,
  content,
  author,
  topics,
  books = [],
  answerCount,
  upvotes,
  views,
  timestamp,
  isAnswered = false,
  images = [],
  topAnswer,
}: QuestionCardProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Get vote status
  const { data: voteStatus } = usePostVoteStatus(id);
  const upvoteMutation = useUpvotePost();
  const removeUpvoteMutation = useRemoveUpvote();
  const downvoteMutation = useDownvotePost();
  const removeDownvoteMutation = useRemoveDownvote();
  const bookmarkMutation = useBookmarkPost();
  const _removeBookmarkMutation = useRemoveBookmark();

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (voteStatus === "upvote") {
      await removeUpvoteMutation.mutateAsync(id);
    } else {
      await upvoteMutation.mutateAsync(id);
    }
  };

  const _handleDownvote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (voteStatus === "downvote") {
      await removeDownvoteMutation.mutateAsync(id);
    } else {
      await downvoteMutation.mutateAsync(id);
    }
  };

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Check if bookmarked first
    await bookmarkMutation.mutateAsync(id);
  };

  return (
    <Link href={`/app/question/${id}`}>
      <div className="py-4 px-0 md:px-4 hover:bg-[#f5f1eb]/50 transition-colors cursor-pointer group border-t border-b border-[#e8dfd0]/80 first:border-t-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Avatar src={author.avatar} name={author.name} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-[#6b5d4a]">
                  {author.username}
                </span>
                {author.reputation && (
                  <span className="text-xs text-[#6b5d4a]">
                    • {author.reputation.toLocaleString()} rep
                  </span>
                )}
                {/* {author.level && (
                  <Badge variant="secondary" size="sm">
                    L{author.level}
                  </Badge>
                )} */}
              </div>
              <p className="text-xs text-[#6b5d4a]">{timestamp}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAnswered && (
              <Badge
                variant="success"
                size="sm"
                className="flex items-center gap-1"
              >
                <Check size={12} />
                Answered
              </Badge>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Handle follow
              }}
              className="px-3 py-1 text-xs font-medium text-[#6b5d4a] hover:text-[#5d4a2f] hover:bg-[#f5f1eb] rounded-md transition-colors"
            >
              Follow
            </button>
          </div>
        </div>

        {/* Question */}
        <h2 className="text-sm md:text-xl font-bold text-[#3d2817] mb-3 leading-tight hover:text-[#5d4a2f] transition-colors">
          {question}
        </h2>

        {/* Content Preview */}
        {content && (
          <p className="text-sm text-[#6b5d4a] mb-3 line-clamp-3 leading-relaxed">
            {content}
          </p>
        )}

        {/* Topics & Books */}
        <div className="flex flex-wrap gap-2 mb-4">
          {topics.map((topic) => (
            <Badge key={topic} variant="default" size="sm">
              {topic}
            </Badge>
          ))}
          {books.map((book) => (
            <Badge
              key={book}
              variant="primary"
              size="sm"
              className="flex items-center gap-1"
            >
              <BookOpen size={12} />
              {book}
            </Badge>
          ))}
        </div>

        {/* Images */}
        {images && images.length > 0 && (
          <div
            className={`mb-4 grid gap-2 ${
              images.length === 1
                ? "grid-cols-1"
                : images.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-2"
            }`}
          >
            {images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden bg-[#f5f1eb] cursor-pointer group"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedImage(image);
                }}
              >
                <Image
                  src={image}
                  alt={`Question image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
                {images.length > 3 && index === 2 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">
                      +{images.length - 3} more
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Top Answer Preview */}
        {topAnswer && (
          <div className="mb-4 p-3 bg-[#f5f1eb]/60 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-[#8b6f47]">
                TOP ANSWER
              </span>
              <span className="text-xs text-[#6b5d4a]">
                by {topAnswer.author}
              </span>
            </div>
            <p className="text-sm text-[#3d2817] line-clamp-2">
              {topAnswer.preview}
            </p>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <div className="relative max-w-7xl max-h-[90vh] w-full h-full">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              <Image
                src={selectedImage}
                alt="Full size image"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-6 pt-3 text-sm text-[#6b5d4a]">
          <button
            onClick={handleUpvote}
            disabled={
              upvoteMutation.isPending || removeUpvoteMutation.isPending
            }
            className={`flex items-center gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              voteStatus === "upvote"
                ? "text-[#5d4a2f] font-semibold"
                : "hover:text-[#5d4a2f]"
            }`}
          >
            <ArrowUpWideNarrow size={16} />
            <span className="font-medium text-sm">{upvotes}</span>
          </button>
          <div className="flex items-center gap-1">
            <MessageCircle size={16} />
            <span className="font-medium text-sm">{answerCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>{views}</span>
          </div>

          <div className="flex items-center gap-6 ml-auto">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // TODO: Implement share
              }}
              className="text-[#6b5d4a] hover:text-[#5d4a2f] transition-colors"
            >
              <Share2 size={16} />
            </button>
            <button
              onClick={handleBookmark}
              disabled={bookmarkMutation.isPending}
              className="text-[#6b5d4a] hover:text-[#5d4a2f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Bookmark size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
