import React from 'react';
import { BookOpen, Tag } from 'lucide-react';
import { getQuestionById, getAnswersForQuestion, demoQuestions } from '@/lib/demo-data';
import QuestionCard from '@/components/common/question-card';
import AnswerCard from '@/components/common/answer-card';
import Textarea from '@/components/ui/textarea';
import Button from '@/components/ui/button';
import Avatar from '@/components/ui/avatar';
import Badge from '@/components/ui/badge';
import Card from '@/components/ui/card';

interface PageProps {
  params: {
    id: string;
  };
}

export default function QuestionPage({ params }: PageProps) {
  const question = getQuestionById(params.id);
  const answers = getAnswersForQuestion(params.id);

  if (!question) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-[#3d2817] mb-2">Question not found</h2>
        <p className="text-[#6b5d4a]">The question you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Question */}
      <div className="mb-6">
        <QuestionCard {...question} />
      </div>

      {/* Answers Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#3d2817]">
            {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
          </h2>
          <div className="flex gap-2">
            <Button
              buttonType="secondary"
              buttonVariant="outline"
              buttonSize="small"
              buttonText="Sort: Top"
            />
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {answers.map((answer) => (
            <AnswerCard
              key={answer.id}
              {...answer}
              onUpvote={() => console.log('Upvote', answer.id)}
              onDownvote={() => console.log('Downvote', answer.id)}
            />
          ))}
        </div>
      </div>

      {/* Answer Form */}
      <div className="mb-8">
        <Card variant="elevated" className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Avatar name="You" size="md" />
            <div>
              <p className="font-semibold text-[#3d2817]">Your Answer</p>
              <p className="text-xs text-[#6b5d4a]">Share your knowledge with the community</p>
            </div>
          </div>
          
          <Textarea
            placeholder="Write your answer here... You can reference Bible verses by typing the book, chapter, and verse (e.g., John 3:16)"
            variant="filled"
            rows={6}
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
              buttonText="Post Answer"
            />
          </div>
        </Card>
      </div>

      {/* Related Questions */}
      <div>
        <h3 className="text-xl font-bold text-[#3d2817] mb-4">Related Questions</h3>
        <div className="space-y-4">
          {demoQuestions
            .filter(q => q.id !== question.id && q.topics.some(t => question.topics.includes(t)))
            .slice(0, 3)
            .map((q) => (
              <QuestionCard key={q.id} {...q} />
            ))}
        </div>
      </div>
    </div>
  );
}

