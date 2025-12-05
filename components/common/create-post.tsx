'use client';

import React, { useState } from 'react';
import Card from '../ui/card';
import Input from '../ui/input';
import Textarea from '../ui/textarea';
import Button from '../ui/button';

export enum PostType {
    POST = 'post',
    QUESTION = 'question',
    STORY = 'story'
}

interface CreatePostProps {
    onSubmit?: (title: string, content: string, postType: PostType) => void;
}

const CreatePost = ({
    onSubmit
}: CreatePostProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postType, setPostType] = useState<PostType>(PostType.POST);

    const handleSubmit = () => {
        if (title.trim() && content.trim() && onSubmit) {
            onSubmit(title, content, postType);
            setTitle('');
            setContent('');
            setPostType(PostType.POST);
        }
    };

    return (
        <Card variant="paper" className="mb-4">
            <div className="space-y-4">
                {/* Title Input */}
                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="filled"
                    className="text-base"
                />

                {/* Content Input */}
                <Textarea
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    variant="filled"
                    rows={4}
                />

                {/* Post Type Selector */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setPostType(PostType.POST)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            postType === PostType.POST
                                ? 'bg-[#5d4a2f] text-white'
                                : 'bg-[#f5f1eb] text-[#6b5d4a] hover:bg-[#e8dfd0]'
                        }`}
                    >
                        Post
                    </button>
                    <button
                        onClick={() => setPostType(PostType.QUESTION)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            postType === PostType.QUESTION
                                ? 'bg-[#5d4a2f] text-white'
                                : 'bg-[#f5f1eb] text-[#6b5d4a] hover:bg-[#e8dfd0]'
                        }`}
                    >
                        Question
                    </button>
                    <button
                        onClick={() => setPostType(PostType.STORY)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            postType === PostType.STORY
                                ? 'bg-[#5d4a2f] text-white'
                                : 'bg-[#f5f1eb] text-[#6b5d4a] hover:bg-[#e8dfd0]'
                        }`}
                    >
                        Story
                    </button>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button
                        buttonType="primary"
                        buttonText="Post"
                        onClick={handleSubmit}
                        buttonDisabled={!title.trim() || !content.trim()}
                    />
                </div>
            </div>
        </Card>
    );
};

export default CreatePost;

