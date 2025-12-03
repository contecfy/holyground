import React from 'react';
import QuestionCard from '@/components/common/question-card';
import { demoQuestions } from '@/lib/demo-data';
import Button from '@/components/ui/button';
import SearchBar from '@/components/ui/search-bar';
import Badge from '@/components/ui/badge';

export default function AppHome() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#3d2817] mb-2">Home</h1>
        <p className="text-[#6b5d4a]">Discover questions from the community</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar placeholder="Search questions, topics, or verses..." />
      </div>

      {/* Quick Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Badge variant="primary" size="md">All</Badge>
        <Badge variant="default" size="md">Doctrine</Badge>
        <Badge variant="default" size="md">Apologetics</Badge>
        <Badge variant="default" size="md">Daily Devotionals</Badge>
        <Badge variant="default" size="md">Relationships</Badge>
        <Badge variant="default" size="md">Church History</Badge>
      </div>

      {/* Questions Feed */}
      <div className="space-y-4">
        {demoQuestions.map((question) => (
          <QuestionCard key={question.id} {...question} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <Button
          buttonType="secondary"
          buttonVariant="outline"
          buttonText="Load More Questions"
          className="w-full md:w-auto"
        />
      </div>
    </div>
  );
}

