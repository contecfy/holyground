"use client";

import React from "react";
import AnswerCard from "./answer-card";
import { Answer } from "@/lib/api/types";
import { formatDistanceToNow } from "date-fns";

interface AnswerListProps {
  answers: Answer[];
  postId: string;
}

const AnswerList = ({ answers, postId }: AnswerListProps) => {
  // Format answers for AnswerCard component
  const formattedAnswers = answers.map((answer) => {
    const author = answer.author || {
      id: answer.authorId,
      username: "user",
      firstName: "User",
      lastName: "",
      displayName: "User",
      reputation: 0,
      level: 1,
      isVerified: false,
    };

    return {
      id: answer.id,
      content: answer.content,
      author: {
        name:
          author.displayName ||
          `${author.firstName} ${author.lastName}` ||
          "User",
        username: author.username || "username",
        avatar: author.avatar,
        reputation: author.reputation || 0,
        level: author.level || 1,
        isVerified: author.isVerified || false,
      },
      upvotes: answer.upvoteCount || 0,
      downvotes: answer.downvoteCount || 0,
      replies: answer.replyCount || 0,
      verses: answer.verses || [],
      timestamp: answer.createdAt
        ? formatDistanceToNow(new Date(answer.createdAt), { addSuffix: true })
        : "just now",
      isEdited: answer.isEdited || false,
      editedAt: answer.editedAt,
      postId,
      answerId: answer.id,
    };
  });

  return (
    <div className="space-y-4 mb-8">
      {formattedAnswers.map((answer) => (
        <AnswerCard
          key={answer.id}
          {...answer}
          postId={postId}
          answerId={answer.id}
        />
      ))}
    </div>
  );
};

export default AnswerList;
