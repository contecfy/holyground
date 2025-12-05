import React from 'react';
import { getQuestionById, getAnswersForQuestion, demoQuestions } from '@/lib/demo-data';
import QuestionCard from '@/components/common/question-card';
import AnswerList from '@/components/common/answer-list';
import AnswerForm from '@/components/common/answer-form';
import Button from '@/components/ui/button';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QuestionPage({ params }: PageProps) {
  const { id } = await params;
  const question = getQuestionById(id);
  const answers = getAnswersForQuestion(id);

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

        <AnswerList answers={answers} />
      </div>

      {/* Answer Form */}
      <div className="mb-8">
        <AnswerForm />
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

