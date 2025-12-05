'use client';

import React from 'react';
import CreatePost, { PostType } from '@/components/common/create-post';

export default function CreatePage() {
  const handleSubmit = (title: string, content: string, postType: PostType) => {
    console.log('Creating post:', { title, content, postType });
    // TODO: Implement actual post creation logic
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#3d2817] mb-2">Create</h1>
        <p className="text-[#6b5d4a]">Share your story, ask a question, or post something with the community</p>
      </div>

      <CreatePost onSubmit={handleSubmit} />
    </div>
  );
}

