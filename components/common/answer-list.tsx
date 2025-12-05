'use client';

import React from 'react';
import AnswerCard from './answer-card';
import { Answer } from '@/lib/demo-data';

interface AnswerListProps {
  answers: Answer[];
}

const AnswerList = ({ answers }: AnswerListProps) => {
  const handleUpvote = (answerId: string) => {
    console.log('Upvote', answerId);
    // TODO: Implement upvote logic
  };

  const handleDownvote = (answerId: string) => {
    console.log('Downvote', answerId);
    // TODO: Implement downvote logic
  };

  return (
    <div className="space-y-4 mb-8">
      {answers.map((answer) => (
        <AnswerCard
          key={answer.id}
          {...answer}
          onUpvote={() => handleUpvote(answer.id)}
          onDownvote={() => handleDownvote(answer.id)}
        />
      ))}
    </div>
  );
};

export default AnswerList;


