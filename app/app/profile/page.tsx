'use client';

import React, { useState } from 'react';
import Card from '@/components/ui/card';
import Avatar from '@/components/ui/avatar';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import QuestionCard from '@/components/common/question-card';
import { demoQuestions } from '@/lib/demo-data';
import { 
  MessageCircle, 
  Heart, 
  Share2, 
  Bookmark, 
  Settings, 
  Edit3, 
  MoreHorizontal,
  Grid3x3,
  List,
  Play,
  UserPlus,
  Check,
  X as XIcon,
  Camera,
  Video,
  FileText,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'questions' | 'answers' | 'media'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  const userQuestions = demoQuestions.slice(0, 3);
  
  const stats = {
    posts: 142,
    questions: 24,
    answers: 67,
    upvotes: 1240,
    reputation: 2100,
    level: 9,
    following: 234,
    followers: 1847
  };

  // Mock posts data formatted for QuestionCard component
  const userPosts = [
    {
      id: '1',
      question: 'Reflecting on Philippians 4:6-7 today. The peace of God truly surpasses all understanding when we bring our anxieties to Him in prayer. 🙏',
      author: { 
        name: 'Your Name', 
        username: 'yourusername', 
        avatar: undefined,
        reputation: stats.reputation,
        level: stats.level
      },
      topics: ['Prayer', 'Peace', 'Faith'],
      books: ['Philippians'],
      answerCount: 12,
      upvotes: 124,
      views: 456,
      timestamp: '2h',
      images: []
    },
    {
      id: '2',
      question: 'Just finished an amazing Bible study session on the book of Romans. The depth of God\'s grace never ceases to amaze me. What are you studying this week?',
      author: { 
        name: 'Your Name', 
        username: 'yourusername', 
        avatar: undefined,
        reputation: stats.reputation,
        level: stats.level
      },
      topics: ['Bible Study', 'Grace', 'Community'],
      books: ['Romans'],
      answerCount: 8,
      upvotes: 89,
      views: 312,
      timestamp: '1d',
      images: []
    },
    {
      id: '3',
      question: 'Morning devotion: "Trust in the Lord with all your heart and lean not on your own understanding." - Proverbs 3:5',
      author: { 
        name: 'Your Name', 
        username: 'yourusername', 
        avatar: undefined,
        reputation: stats.reputation,
        level: stats.level
      },
      topics: ['Devotion', 'Trust', 'Wisdom'],
      books: ['Proverbs'],
      answerCount: 34,
      upvotes: 256,
      views: 789,
      timestamp: '2d',
      images: []
    },
    {
      id: '4',
      question: 'Prayer request: Please pray for our community as we navigate these challenging times. God is faithful!',
      author: { 
        name: 'Your Name', 
        username: 'yourusername', 
        avatar: undefined,
        reputation: stats.reputation,
        level: stats.level
      },
      topics: ['Prayer', 'Community', 'Faith'],
      books: [],
      answerCount: 19,
      upvotes: 167,
      views: 523,
      timestamp: '3d',
      images: []
    },
  ];

  // Mock media data for Instagram-style grid
  const mediaPosts = [
    { id: 1, type: 'image', likes: 124, comments: 12 },
    { id: 2, type: 'image', likes: 89, comments: 8 },
    { id: 3, type: 'video', likes: 256, comments: 34 },
    { id: 4, type: 'image', likes: 167, comments: 19 },
    { id: 5, type: 'image', likes: 203, comments: 25 },
    { id: 6, type: 'video', likes: 98, comments: 11 },
    { id: 7, type: 'image', likes: 145, comments: 18 },
    { id: 8, type: 'image', likes: 112, comments: 9 },
    { id: 9, type: 'video', likes: 278, comments: 42 },
    { id: 10, type: 'image', likes: 156, comments: 21 },
    { id: 11, type: 'image', likes: 189, comments: 15 },
    { id: 12, type: 'image', likes: 134, comments: 10 },
  ];

  // Mock stories (Instagram/WhatsApp style)
  const stories = [
    { id: 1, name: 'Today', image: '/api/placeholder/80/80', isOwn: true },
    { id: 2, name: 'Prayer', image: '/api/placeholder/80/80', isOwn: false },
    { id: 3, name: 'Bible Study', image: '/api/placeholder/80/80', isOwn: false },
    { id: 4, name: 'Reflection', image: '/api/placeholder/80/80', isOwn: false },
  ];

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Profile Header - Instagram Style */}
      <Card variant="elevated" className="p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Avatar Section - Bigger */}
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <div className="relative">
              <Avatar name="You" size="3xl" />
              <button className="absolute bottom-0 right-0 md:right-2 bg-[#5d4a2f] text-white rounded-full p-2 hover:bg-[#3d2817] transition-colors shadow-lg">
                <Camera size={16} />
              </button>
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="flex-1 min-w-0">
            {/* Username and Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-bold text-[#3d2817]">yourusername</h1>
                <Badge variant="primary" size="sm">Level {stats.level}</Badge>
                <Badge variant="success" size="sm">✓ Verified</Badge>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  buttonType={isFollowing ? "secondary" : "primary"}
                  buttonVariant="outline"
                  buttonSize="small"
                  buttonText={isFollowing ? "Following" : "Follow"}
                  buttonIcon={isFollowing ? <Check size={14} /> : <UserPlus size={14} />}
                  iconPosition="left"
                  onClick={() => setIsFollowing(!isFollowing)}
                />
                <Button
                  buttonType="secondary"
                  buttonVariant="outline"
                  buttonSize="small"
                  buttonText="Message"
                  buttonIcon={<MessageCircle size={14} />}
                  iconPosition="left"
                />
                <Button
                  buttonType="secondary"
                  buttonVariant="outline"
                  buttonSize="small"
                  buttonText="Edit Profile"
                  buttonIcon={<Edit3 size={14} />}
                  iconPosition="left"
                />
                <button className="p-2 border border-[#d4c4b0] rounded-lg hover:bg-[#f5f1eb] transition-colors">
                  <Settings size={18} className="text-[#6b5d4a]" />
                </button>
                <button className="p-2 border border-[#d4c4b0] rounded-lg hover:bg-[#f5f1eb] transition-colors">
                  <MoreHorizontal size={18} className="text-[#6b5d4a]" />
                </button>
              </div>
            </div>

            {/* Stats - Twitter/Instagram Style */}
            <div className="flex gap-4 md:gap-6 mb-4 flex-wrap">
              <div className="text-center sm:text-left">
                <span className="font-bold text-[#3d2817]">{stats.posts.toLocaleString()}</span>
                <span className="text-[#6b5d4a] ml-1">posts</span>
              </div>
              <button className="text-center sm:text-left hover:opacity-70 transition-opacity">
                <span className="font-bold text-[#3d2817]">{stats.followers.toLocaleString()}</span>
                <span className="text-[#6b5d4a] ml-1">followers</span>
              </button>
              <button className="text-center sm:text-left hover:opacity-70 transition-opacity">
                <span className="font-bold text-[#3d2817]">{stats.following.toLocaleString()}</span>
                <span className="text-[#6b5d4a] ml-1">following</span>
              </button>
            </div>

            {/* Bio - Instagram Style */}
            <div className="mb-4">
              <p className="font-semibold text-[#3d2817] mb-1">Your Name</p>
              <p className="text-[#3d2817] mb-2">
                Passionate about sharing God's word and helping others grow in faith. 
                Love studying doctrine and apologetics. ✝️
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="#" className="text-[#5d4a2f] hover:underline">holyground.com</a>
                <span className="text-[#6b5d4a]">•</span>
                <a href="#" className="text-[#5d4a2f] hover:underline">Bible Study Leader</a>
              </div>
            </div>

            {/* Additional Stats - Twitter Style */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#e8dfd0]">
              <div className="text-center">
                <p className="text-lg md:text-xl font-bold text-[#3d2817]">{stats.questions}</p>
                <p className="text-xs text-[#6b5d4a]">Questions</p>
              </div>
              <div className="text-center">
                <p className="text-lg md:text-xl font-bold text-[#3d2817]">{stats.answers}</p>
                <p className="text-xs text-[#6b5d4a]">Answers</p>
              </div>
              <div className="text-center">
                <p className="text-lg md:text-xl font-bold text-[#3d2817]">{stats.upvotes.toLocaleString()}</p>
                <p className="text-xs text-[#6b5d4a]">Upvotes</p>
              </div>
              <div className="text-center">
                <p className="text-lg md:text-xl font-bold text-[#3d2817]">{stats.reputation.toLocaleString()}</p>
                <p className="text-xs text-[#6b5d4a]">Reputation</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

    

      {/* Tabs - Instagram/TikTok Style */}
      <div className="flex gap-1 md:gap-4 mb-4 md:mb-6 border-b border-[#e8dfd0] overflow-x-auto">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex items-center gap-2 px-3 md:px-4 py-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'posts'
              ? 'text-[#5d4a2f] border-b-2 border-[#5d4a2f]'
              : 'text-[#6b5d4a] hover:text-[#5d4a2f]'
          }`}
        >
          <List size={18} />
          <span className="hidden sm:inline">Posts</span>
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex items-center gap-2 px-3 md:px-4 py-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'questions'
              ? 'text-[#5d4a2f] border-b-2 border-[#5d4a2f]'
              : 'text-[#6b5d4a] hover:text-[#5d4a2f]'
          }`}
        >
          <FileText size={18} />
          <span className="hidden sm:inline">Questions</span>
        </button>
        <button
          onClick={() => setActiveTab('answers')}
          className={`flex items-center gap-2 px-3 md:px-4 py-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'answers'
              ? 'text-[#5d4a2f] border-b-2 border-[#5d4a2f]'
              : 'text-[#6b5d4a] hover:text-[#5d4a2f]'
          }`}
        >
          <MessageCircle size={18} />
          <span className="hidden sm:inline">Answers</span>
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`flex items-center gap-2 px-3 md:px-4 py-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'media'
              ? 'text-[#5d4a2f] border-b-2 border-[#5d4a2f]'
              : 'text-[#6b5d4a] hover:text-[#5d4a2f]'
          }`}
        >
          <Video size={18} />
          <span className="hidden sm:inline">Media</span>
        </button>
      </div>

      {/* Content Based on Active Tab */}
      {activeTab === 'posts' && (
        <div className="space-y-0">
          {userPosts.map((post) => (
            <QuestionCard
              key={post.id}
              id={post.id}
              question={post.question}
              author={post.author}
              topics={post.topics}
              books={post.books}
              answerCount={post.answerCount}
              upvotes={post.upvotes}
              views={post.views}
              timestamp={post.timestamp}
              images={post.images}
            />
          ))}
        </div>
      )}

      {activeTab === 'questions' && (
        <div className="space-y-4">
          {userQuestions.map((question) => (
            <QuestionCard key={question.id} {...question} />
          ))}
        </div>
      )}

      {activeTab === 'answers' && (
        <div className="space-y-4">
          <Card variant="elevated" className="p-4">
            <p className="text-[#6b5d4a] text-sm mb-2">You answered:</p>
            <p className="text-[#3d2817] font-semibold mb-2">What does it mean to walk in the Spirit?</p>
            <p className="text-[#3d2817] mb-3">
              Walking in the Spirit means living in alignment with God's will, allowing the Holy Spirit to guide your thoughts, actions, and decisions...
            </p>
            <div className="flex items-center gap-4 text-sm text-[#6b5d4a]">
              <span className="flex items-center gap-1">
                <Heart size={16} />
                24
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={16} />
                8
              </span>
              <span>2 days ago</span>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'media' && (
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {mediaPosts.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square bg-[#e8dfd0] rounded-lg overflow-hidden group cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-full h-full bg-gradient-to-br from-[#8b6f47] to-[#5d4a2f] flex items-center justify-center">
                {post.type === 'video' && (
                  <Play size={32} className="text-white opacity-70" />
                )}
              </div>
              {/* Overlay on hover - Instagram style */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                <div className="flex items-center gap-1">
                  <Heart size={20} className="fill-current" />
                  <span className="font-semibold">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle size={20} />
                  <span className="font-semibold">{post.comments}</span>
                </div>
              </div>
              {/* Video indicator */}
              {post.type === 'video' && (
                <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  <Play size={12} />
                  <span>2:34</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
