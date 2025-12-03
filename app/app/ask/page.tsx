import React from 'react';
import { BookOpen } from 'lucide-react';
import Card from '@/components/ui/card';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';

export default function AskPage() {
  const popularTopics = [
    'Doctrine', 'Apologetics', 'Daily Devotionals', 'Christian Relationships',
    'Church History', 'Faith', 'Prayer', 'Prophecy', 'Sin', 'Spiritual Gifts',
    'Salvation', 'Theology', 'Bible Study', 'Worship'
  ];

  const popularBooks = [
    'Genesis', 'Psalms', 'John', 'Romans', '1 Corinthians', 'Ephesians',
    'Matthew', 'Acts', 'Revelation', 'Hebrews', 'James', '1 Peter'
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#3d2817] mb-2">Ask a Question</h1>
        <p className="text-[#6b5d4a]">Get answers from the community of believers</p>
      </div>

      <Card variant="elevated" className="p-6">
        <div className="space-y-6">
          {/* Question Input */}
          <div>
            <Input
              label="What's your question?"
              placeholder="e.g., What does it mean to walk by faith?"
              variant="filled"
              className="text-lg"
            />
            <p className="text-xs text-[#6b5d4a] mt-2">
              Be specific and clear. Good questions get better answers!
            </p>
          </div>

          {/* Details */}
          <div>
            <Textarea
              label="Add details (optional)"
              placeholder="Provide context, background, or what you've already learned about this topic..."
              variant="filled"
              rows={6}
            />
          </div>

          {/* Topics */}
          <div>
            <label className="block text-sm font-medium text-[#3d2817] mb-2">
              Topics
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {popularTopics.slice(0, 8).map((topic) => (
                <Badge
                  key={topic}
                  variant="default"
                  size="sm"
                  className="cursor-pointer hover:bg-[#e8dfd0] transition-colors"
                >
                  {topic}
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Add custom topics..."
              variant="filled"
              className="text-sm"
            />
          </div>

          {/* Books */}
          <div>
            <label className="block text-sm font-medium text-[#3d2817] mb-2">
              Related Bible Books (optional)
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {popularBooks.slice(0, 8).map((book) => (
                <Badge
                  key={book}
                  variant="primary"
                  size="sm"
                  className="cursor-pointer hover:bg-[#6b5d4a] transition-colors"
                >
                  <BookOpen size={12} className="inline mr-1" /> {book}
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Search for a book..."
              variant="filled"
              className="text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-[#e8dfd0]">
            <div className="text-sm text-[#6b5d4a]">
              <p>💡 Tip: Adding topics and books helps others find your question</p>
            </div>
            <div className="flex gap-3">
              <Button
                buttonType="secondary"
                buttonVariant="outline"
                buttonText="Save Draft"
              />
              <Button
                buttonType="primary"
                buttonText="Post Question"
                buttonIcon={<span>✍️</span>}
                iconPosition="left"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card variant="paper" className="p-6 mt-6">
        <h3 className="font-semibold text-[#3d2817] mb-3">Tips for Great Questions</h3>
        <ul className="space-y-2 text-sm text-[#6b5d4a]">
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Be specific and clear about what you're asking</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Provide context if relevant to your situation</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Tag your question with relevant topics and books</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Check if a similar question has already been asked</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

