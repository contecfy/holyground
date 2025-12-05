'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { BookOpen, Tag, Image as ImageIcon, X } from 'lucide-react';
import Card from '../ui/card';
import Textarea from '../ui/textarea';
import Button from '../ui/button';
import Avatar from '../ui/avatar';

interface CreatePostProps {
    user: {
        name: string;
        avatar?: string;
    };
    onSubmit?: (content: string, images: string[]) => void;
    placeholder?: string;
}

const CreatePost = ({
    user,
    onSubmit,
    placeholder = "Share a verse, reflection, or thought with the community..."
}: CreatePostProps) => {
    const [content, setContent] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach((file) => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        if (reader.result) {
                            setImages((prev) => [...prev, reader.result as string]);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if ((content.trim() || images.length > 0) && onSubmit) {
            onSubmit(content, images);
            setContent('');
            setImages([]);
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
                    
                    {/* Image Preview */}
                    {images.length > 0 && (
                        <div className="mb-3 grid grid-cols-2 gap-2">
                            {images.map((image, index) => (
                                <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-[#f5f1eb] group">
                                    <Image
                                        src={image}
                                        alt={`Preview ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {isExpanded && (
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageSelect}
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                />
                                <Button
                                    buttonType="secondary"
                                    buttonVariant="ghost"
                                    buttonSize="small"
                                    buttonIcon={<ImageIcon size={16} />}
                                    buttonText="Add Image"
                                    onClick={() => fileInputRef.current?.click()}
                                />
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
                                        setImages([]);
                                    }}
                                />
                                <Button
                                    buttonType="primary"
                                    buttonSize="small"
                                    buttonText="Post"
                                    onClick={handleSubmit}
                                    buttonDisabled={!content.trim() && images.length === 0}
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

