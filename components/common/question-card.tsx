'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronUp, MessageCircle, Eye, BookOpen, Bookmark, Check } from 'lucide-react';
import Card from '../ui/card';
import Avatar from '../ui/avatar';
import Badge from '../ui/badge';

interface QuestionCardProps {
  id: string;
  question: string;
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
  topAnswer?: {
    author: string;
    preview: string;
  };
}

const QuestionCard = ({
  id,
  question,
  author,
  topics,
  books = [],
  answerCount,
  upvotes,
  views,
  timestamp,
  isAnswered = false,
  topAnswer
}: QuestionCardProps) => {
  return (
    <Link href={`/app/question/${id}`}>
      <Card variant="paper" className="mb-4 hover:shadow-lg transition-all cursor-pointer group">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar 
              src={author.avatar}
              name={author.name}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-[#3d2817] truncate">{author.name}</p>
                <span className="text-xs text-[#6b5d4a]">@{author.username}</span>
                {author.reputation && (
                  <span className="text-xs text-[#6b5d4a]">• {author.reputation.toLocaleString()} rep</span>
                )}
                {author.level && (
                  <Badge variant="secondary" size="sm">
                    L{author.level}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-[#6b5d4a]">{timestamp}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAnswered && (
              <Badge variant="success" size="sm" className="flex items-center gap-1">
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
        <h2 className="text-xl font-bold text-[#3d2817] mb-3 leading-tight hover:text-[#5d4a2f] transition-colors">
          {question}
        </h2>

        {/* Topics & Books */}
        <div className="flex flex-wrap gap-2 mb-4">
          {topics.map((topic) => (
            <Badge key={topic} variant="default" size="sm">
              {topic}
            </Badge>
          ))}
          {books.map((book) => (
            <Badge key={book} variant="primary" size="sm" className="flex items-center gap-1">
              <BookOpen size={12} />
              {book}
            </Badge>
          ))}
        </div>

        {/* Top Answer Preview */}
        {topAnswer && (
          <div className="mb-4 p-3 bg-[#f5f1eb] border-l-4 border-[#8b6f47] rounded-r-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-[#8b6f47]">TOP ANSWER</span>
              <span className="text-xs text-[#6b5d4a]">by {topAnswer.author}</span>
            </div>
            <p className="text-sm text-[#3d2817] line-clamp-2">{topAnswer.preview}</p>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-6 pt-3 border-t border-[#e8dfd0] text-sm text-[#6b5d4a]">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="flex items-center gap-1 hover:text-[#5d4a2f] transition-colors"
          >
            <ChevronUp size={16} />
            <span className="font-medium">{upvotes}</span>
          </button>
          <div className="flex items-center gap-1">
            <MessageCircle size={16} />
            <span className="font-medium">{answerCount} {answerCount === 1 ? 'answer' : 'answers'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>{views}</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="ml-auto text-[#6b5d4a] hover:text-[#5d4a2f] transition-colors"
          >
            <Bookmark size={16} />
          </button>
        </div>
      </Card>
    </Link>
  );
};

export default QuestionCard;

