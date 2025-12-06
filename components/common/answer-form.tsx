"use client";

import React, { useState } from "react";
import { BookOpen, Tag } from "lucide-react";
import Card from "../ui/card";
import Textarea from "../ui/textarea";
import Button from "../ui/button";
import Avatar from "../ui/avatar";
import { useCreateAnswer } from "@/hooks/usePosts";
import { useMe } from "@/hooks/useUser";

interface AnswerFormProps {
  postId: string;
}

const AnswerForm = ({ postId }: AnswerFormProps) => {
  const [answer, setAnswer] = useState("");
  const { data: user } = useMe();
  const createAnswerMutation = useCreateAnswer();

  const handleSubmit = async () => {
    if (answer.trim() && answer.length >= 10) {
      try {
        await createAnswerMutation.mutateAsync({
          postId,
          data: {
            content: answer.trim(),
          },
        });
        setAnswer("");
      } catch (error: unknown) {
        console.error("Failed to submit answer:", error);
        // You can add toast notification here
      }
    }
  };

  return (
    <Card variant="elevated" className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Avatar
          name={
            user?.displayName || `${user?.firstName} ${user?.lastName}` || "You"
          }
          src={user?.avatar}
          size="md"
        />
        <div>
          <p className="font-semibold text-[#3d2817">Your Answer</p>
          <p className="text-xs text-[#6b5d4a]">
            Share your knowledge with the community
          </p>
        </div>
      </div>

      <Textarea
        placeholder="Write your answer here... You can reference Bible verses by typing the book, chapter, and verse (e.g., John 3:16)"
        variant="filled"
        rows={6}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="mb-4"
      />

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            buttonType="secondary"
            buttonVariant="ghost"
            buttonSize="small"
            buttonIcon={<BookOpen size={16} />}
            buttonText="Add Verse"
          />
          <Button
            buttonType="secondary"
            buttonVariant="ghost"
            buttonSize="small"
            buttonIcon={<Tag size={16} />}
            buttonText="Format"
          />
        </div>
        <Button
          buttonType="primary"
          buttonSize="medium"
          buttonText={
            createAnswerMutation.isPending ? "Posting..." : "Post Answer"
          }
          onClick={handleSubmit}
          buttonDisabled={
            !answer.trim() ||
            answer.trim().length < 10 ||
            createAnswerMutation.isPending
          }
        />
      </div>
    </Card>
  );
};

export default AnswerForm;
