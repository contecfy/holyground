import React from 'react';
import Card from '@/components/ui/card';
import Avatar from '@/components/ui/avatar';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import QuestionCard from '@/components/common/question-card';
import { demoQuestions } from '@/lib/demo-data';

export default function ProfilePage() {
  const userQuestions = demoQuestions.slice(0, 3);
  const stats = {
    questions: 24,
    answers: 67,
    upvotes: 1240,
    reputation: 2100,
    level: 9
  };

  return (
    <div>
      {/* Profile Header */}
      <Card variant="elevated" className="p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar name="You" size="xl" />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-[#3d2817]">Your Name</h1>
              <Badge variant="primary" size="md">Level {stats.level}</Badge>
              <Badge variant="success" size="md">✓ Verified</Badge>
            </div>
            <p className="text-[#6b5d4a] mb-4">@yourusername</p>
            <p className="text-[#3d2817] mb-4">
              Passionate about sharing God's word and helping others grow in faith. 
              Love studying doctrine and apologetics.
            </p>
            <div className="flex gap-4 mb-4">
              <Button
                buttonType="primary"
                buttonVariant="outline"
                buttonSize="small"
                buttonText="Edit Profile"
              />
              <Button
                buttonType="secondary"
                buttonVariant="outline"
                buttonSize="small"
                buttonText="Settings"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#e8dfd0]">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#3d2817]">{stats.questions}</p>
            <p className="text-sm text-[#6b5d4a]">Questions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#3d2817]">{stats.answers}</p>
            <p className="text-sm text-[#6b5d4a]">Answers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#3d2817]">{stats.upvotes}</p>
            <p className="text-sm text-[#6b5d4a]">Upvotes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#3d2817]">{stats.reputation}</p>
            <p className="text-sm text-[#6b5d4a]">Reputation</p>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-[#e8dfd0]">
        <button className="px-4 py-2 font-semibold text-[#5d4a2f] border-b-2 border-[#5d4a2f]">
          Questions
        </button>
        <button className="px-4 py-2 text-[#6b5d4a] hover:text-[#5d4a2f] transition-colors">
          Answers
        </button>
        <button className="px-4 py-2 text-[#6b5d4a] hover:text-[#5d4a2f] transition-colors">
          Bookmarks
        </button>
        <button className="px-4 py-2 text-[#6b5d4a] hover:text-[#5d4a2f] transition-colors">
          Following
        </button>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {userQuestions.map((question) => (
          <QuestionCard key={question.id} {...question} />
        ))}
      </div>
    </div>
  );
}

