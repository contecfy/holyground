"use client";

import React, { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Share2,
  Check,
  Star,
  ChevronRight,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Card from "../ui/card";
import Avatar from "../ui/avatar";
import Badge from "../ui/badge";
import {
  useUpvoteAnswer,
  useDownvoteAnswer,
  useRemoveAnswerVote,
} from "@/hooks/usePosts";

interface Verse {
  book: string;
  chapter: number;
  verse: number | string;
  text: string;
  translation?: string;
}

interface AnswerCardProps {
  id: string;
  content: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
    reputation?: number;
    level?: number;
    isVerified?: boolean;
  };
  upvotes: number;
  downvotes: number;
  replies?: number;
  userVote?: "up" | "down" | null;
  verses?: Verse[];
  timestamp: string;
  isTopAnswer?: boolean;
  isEdited?: boolean;
  editedAt?: string;
  postId?: string;
  answerId?: string;
  onUpvote?: () => void;
  onDownvote?: () => void;
}

const AnswerCard = ({
  id: _id,
  content,
  author,
  upvotes,
  downvotes,
  _replies = 0,
  userVote,
  verses = [],
  timestamp,
  isTopAnswer = false,
  isEdited = false,
  editedAt,
  postId,
  answerId,
  onUpvote,
  onDownvote,
}: AnswerCardProps) => {
  const [expandedVerses, setExpandedVerses] = useState<Set<string>>(new Set());

  const upvoteMutation = useUpvoteAnswer();
  const downvoteMutation = useDownvoteAnswer();
  const removeVoteMutation = useRemoveAnswerVote();

  const handleUpvote = async () => {
    if (!postId || !answerId) return;

    if (userVote === "up") {
      // Remove upvote
      await removeVoteMutation.mutateAsync({ postId, answerId });
    } else {
      // Add upvote
      await upvoteMutation.mutateAsync({ postId, answerId });
    }

    onUpvote?.();
  };

  const handleDownvote = async () => {
    if (!postId || !answerId) return;

    if (userVote === "down") {
      // Remove downvote
      await removeVoteMutation.mutateAsync({ postId, answerId });
    } else {
      // Add downvote
      await downvoteMutation.mutateAsync({ postId, answerId });
    }

    onDownvote?.();
  };

  const toggleVerse = (verseKey: string) => {
    const newExpanded = new Set(expandedVerses);
    if (newExpanded.has(verseKey)) {
      newExpanded.delete(verseKey);
    } else {
      newExpanded.add(verseKey);
    }
    setExpandedVerses(newExpanded);
  };

  const netVotes = upvotes - downvotes;

  return (
    <Card variant={isTopAnswer ? "elevated" : "paper"} className="mb-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <Avatar src={author.avatar} name={author.name} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-[#3d2817]">{author.name}</p>
              <span className="text-xs text-[#6b5d4a]">@{author.username}</span>
              {author.isVerified && (
                <Badge
                  variant="primary"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Check size={12} />
                  Verified
                </Badge>
              )}
              {author.level && (
                <Badge variant="secondary" size="sm">
                  Level {author.level}
                </Badge>
              )}
            </div>
            <p className="text-xs text-[#6b5d4a]">{timestamp}</p>
          </div>
        </div>
        {isTopAnswer && (
          <Badge
            variant="success"
            size="sm"
            className="flex items-center gap-1"
          >
            <Star size={12} />
            Top Answer
          </Badge>
        )}
      </div>

      {/* Answer Content */}
      <div className="mb-4">
        <p className="text-[#3d2817] leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
        {isEdited && (
          <p className="text-xs text-[#6b5d4a] mt-2 italic">
            Edited{" "}
            {editedAt
              ? formatDistanceToNow(new Date(editedAt), { addSuffix: true })
              : ""}
          </p>
        )}
      </div>

      {/* Verses */}
      {verses.length > 0 && (
        <div className="mb-4 space-y-3">
          {verses.map((verse, index) => {
            const verseKey = `${verse.book}-${verse.chapter}-${verse.verse}`;
            const isExpanded = expandedVerses.has(verseKey);
            return (
              <div key={index} className="border-l-4 border-[#8b6f47] pl-4">
                <button
                  onClick={() => toggleVerse(verseKey)}
                  className="flex items-center justify-between w-full text-left mb-2"
                >
                  <span className="font-semibold text-[#8b6f47] text-sm">
                    {verse.book} {verse.chapter}:{verse.verse}
                  </span>
                  {isExpanded ? (
                    <ChevronDownIcon size={16} className="text-[#6b5d4a]" />
                  ) : (
                    <ChevronRight size={16} className="text-[#6b5d4a]" />
                  )}
                </button>
                {isExpanded && (
                  <div className="p-3 bg-[#f5f1eb] rounded-md">
                    <p className="text-[#3d2817] italic leading-relaxed">
                      &quot;{verse.text}&quot;
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#e8dfd0]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleUpvote}
              disabled={
                upvoteMutation.isPending || removeVoteMutation.isPending
              }
              className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                userVote === "up"
                  ? "bg-[#8b6f47] text-white"
                  : "bg-[#f5f1eb] text-[#6b5d4a] hover:bg-[#e8dfd0]"
              }`}
            >
              <ChevronUp size={18} />
            </button>
            <span className="font-semibold text-[#3d2817] min-w-[2rem] text-center">
              {netVotes > 0 ? "+" : ""}
              {netVotes}
            </span>
            <button
              onClick={handleDownvote}
              disabled={
                downvoteMutation.isPending || removeVoteMutation.isPending
              }
              className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                userVote === "down"
                  ? "bg-red-200 text-red-700"
                  : "bg-[#f5f1eb] text-[#6b5d4a] hover:bg-[#e8dfd0]"
              }`}
            >
              <ChevronDown size={18} />
            </button>
          </div>
          <button className="flex items-center gap-1 text-[#6b5d4a] hover:text-[#5d4a2f] transition-colors text-sm">
            <MessageCircle size={16} />
            Comment
          </button>
          <button className="flex items-center gap-1 text-[#6b5d4a] hover:text-[#5d4a2f] transition-colors text-sm">
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>
    </Card>
  );
};

export default AnswerCard;
