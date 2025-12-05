'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronUp, MessageCircle, Eye, BookOpen, Bookmark, Check, X, ArrowUpWideNarrow } from 'lucide-react';
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
  images?: string[];
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
  images = [],
  topAnswer
}: QuestionCardProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Link href={`/app/question/${id}`}>
      <div className="py-4 px-4 hover:bg-[#f5f1eb]/50 transition-colors cursor-pointer group border-t border-b border-[#e8dfd0]/80 first:border-t-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Avatar 
              src={author.avatar}
              name={author.name}
              size="md"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-semibold text-[#6b5d4a]">@{author.username}</span>
                {author.reputation && (
                  <span className="text-xs text-[#6b5d4a]">• {author.reputation.toLocaleString()} rep</span>
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

        {/* Images */}
        {images && images.length > 0 && (
          <div className={`mb-4 grid gap-2 ${
            images.length === 1 
              ? 'grid-cols-1' 
              : images.length === 2 
              ? 'grid-cols-2' 
              : 'grid-cols-2'
          }`}>
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
              <span className="text-xs font-semibold text-[#8b6f47]">TOP ANSWER</span>
              <span className="text-xs text-[#6b5d4a]">by {topAnswer.author}</span>
            </div>
            <p className="text-sm text-[#3d2817] line-clamp-2">{topAnswer.preview}</p>
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
                className="object-contain"
              />
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-6 pt-3 text-sm text-[#6b5d4a]">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="flex items-center gap-1 hover:text-[#5d4a2f] transition-colors"
          >
            <ArrowUpWideNarrow size={16} />
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
      </div>
    </Link>
  );
};

export default QuestionCard;

