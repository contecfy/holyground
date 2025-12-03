'use client';

import React, { useState } from 'react';
import { BookOpen, Tag } from 'lucide-react';
import Card from '../ui/card';
import Textarea from '../ui/textarea';
import Button from '../ui/button';
import Avatar from '../ui/avatar';

interface CreatePostProps {
    user: {
        name: string;
        avatar?: string;
    };
    onSubmit?: (content: string) => void;
    placeholder?: string;
}

const CreatePost = ({
    user,
    onSubmit,
    placeholder = "Share a verse, reflection, or thought with the community..."
}: CreatePostProps) => {
    const [content, setContent] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = () => {
        if (content.trim() && onSubmit) {
            onSubmit(content);
            setContent('');
            setIsExpanded(false);
        }
    };

    return (
        <Card variant="paper" className="mb-4">
            <div className="flex gap-3">
                <Avatar 
                    src={user.avatar}
                    name={user.name}
                    size="md"
                />
                <div className="flex-1">
                    <Textarea
                        placeholder={placeholder}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onFocus={() => setIsExpanded(true)}
                        variant="filled"
                        rows={isExpanded ? 4 : 2}
                        className="mb-3"
                    />
                    {isExpanded && (
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
                                    buttonText="Tag"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    buttonType="secondary"
                                    buttonVariant="ghost"
                                    buttonSize="small"
                                    buttonText="Cancel"
                                    onClick={() => {
                                        setIsExpanded(false);
                                        setContent('');
                                    }}
                                />
                                <Button
                                    buttonType="primary"
                                    buttonSize="small"
                                    buttonText="Post"
                                    onClick={handleSubmit}
                                    buttonDisabled={!content.trim()}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default CreatePost;

