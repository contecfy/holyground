import React from 'react';
import { BookOpen, Lightbulb, Heart, Church } from 'lucide-react';
import QuestionCard from '@/components/common/question-card';
import { demoQuestions } from '@/lib/demo-data';
import Badge from '@/components/ui/badge';
import Card from '@/components/ui/card';

export default function ExplorePage() {
  const trendingTopics = [
    { name: 'Doctrine', count: 234, icon: <BookOpen size={20} /> },
    { name: 'Apologetics', count: 189, icon: <Lightbulb size={20} /> },
    { name: 'Daily Devotionals', count: 156, icon: <BookOpen size={20} /> },
    { name: 'Christian Relationships', count: 142, icon: <Heart size={20} /> },
    { name: 'Church History', count: 98, icon: <Church size={20} /> },
  ];

  const trendingBooks = [
    { name: 'John', count: 312 },
    { name: 'Romans', count: 287 },
    { name: 'Psalms', count: 245 },
    { name: '1 Corinthians', count: 198 },
    { name: 'Matthew', count: 176 },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#3d2817] mb-2">Explore</h1>
        <p className="text-[#6b5d4a]">Discover trending topics and questions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#3d2817]">Trending Questions</h2>
            <div className="flex gap-2">
              <Badge variant="default" size="sm">Today</Badge>
              <Badge variant="default" size="sm">This Week</Badge>
              <Badge variant="default" size="sm">All Time</Badge>
            </div>
          </div>
          
          {demoQuestions.map((question) => (
            <QuestionCard key={question.id} {...question} />
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <Card variant="elevated" className="p-6">
            <h3 className="font-bold text-[#3d2817] mb-4">Trending Topics</h3>
            <div className="space-y-3">
              {trendingTopics.map((topic) => (
                <div
                  key={topic.name}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-[#f5f1eb] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#6b5d4a]">{topic.icon}</span>
                    <div>
                      <p className="font-medium text-[#3d2817]">{topic.name}</p>
                      <p className="text-xs text-[#6b5d4a]">{topic.count} questions</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Trending Books */}
          <Card variant="elevated" className="p-6">
            <h3 className="font-bold text-[#3d2817] mb-4">Popular Books</h3>
            <div className="space-y-3">
              {trendingBooks.map((book) => (
                <div
                  key={book.name}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-[#f5f1eb] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen size={18} className="text-[#6b5d4a]" />
                    <div>
                      <p className="font-medium text-[#3d2817]">{book.name}</p>
                      <p className="text-xs text-[#6b5d4a]">{book.count} questions</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

