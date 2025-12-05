'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, X } from 'lucide-react';
import Card from '../ui/card';
import Avatar from '../ui/avatar';
import Button from '../ui/button';

interface PostCardProps {
    author: {
        name: string;
        avatar?: string;
        username: string;
    };
    content: string;
    timestamp: string;
    likes?: number;
    comments?: number;
    shares?: number;
    images?: string[];
    verse?: {
        book: string;
        chapter: number;
        verse: number;
        text: string;
    };
    onLike?: () => void;
    onComment?: () => void;
    onShare?: () => void;
}

const PostCard = ({
    author,
    content,
    timestamp,
    likes = 0,
    comments = 0,
    shares = 0,
    images = [],
    verse,
    onLike,
    onComment,
    onShare
}: PostCardProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <Card variant="paper" className="mb-4">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
                <Avatar 
                    src={author.avatar}
                    name={author.name}
                    size="md"
                    status="online"
                />
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#3d2817]">{author.name}</h3>
                        <span className="text-sm text-[#6b5d4a]">@{author.username}</span>
                        <span className="text-xs text-[#6b5d4a]">·</span>
                        <span className="text-xs text-[#6b5d4a]">{timestamp}</span>
                    </div>
                </div>
            </div>

            {/* Verse Highlight */}
            {verse && (
                <div className="mb-4 p-4 bg-gradient-to-r from-[#f5f1eb] to-[#e8dfd0] border-l-4 border-[#8b6f47] rounded-r-md">
                    <div className="flex items-start gap-2 mb-2">
                        <span className="text-2xl text-[#8b6f47]">"</span>
                        <p className="flex-1 text-[#3d2817] italic leading-relaxed">
                            {verse.text}
                        </p>
                        <span className="text-2xl text-[#8b6f47]">"</span>
                    </div>
                    <p className="text-sm text-[#6b5d4a] font-medium mt-2">
                        {verse.book} {verse.chapter}:{verse.verse}
                    </p>
                </div>
            )}

            {/* Content */}
            <p className="text-[#3d2817] leading-relaxed mb-4 whitespace-pre-wrap">
                {content}
            </p>

            {/* Images */}
            {images && images.length > 0 && (
                <div className={`mb-4 grid gap-2 ${
                    images.length === 1 
                        ? 'grid-cols-1' 
                        : images.length === 2 
                        ? 'grid-cols-2' 
                        : 'grid-cols-2'
                }`}>
                    {images.slice(0, 4).map((image, index) => (
                        <div
                            key={index}
                            className={`relative ${
                                images.length === 3 && index === 0 
                                    ? 'row-span-2' 
                                    : images.length > 3 && index === 3
                                    ? 'col-span-2'
                                    : ''
                            } aspect-square rounded-lg overflow-hidden bg-[#f5f1eb] cursor-pointer group`}
                            onClick={() => setSelectedImage(image)}
                        >
                            <Image
                                src={image}
                                alt={`Post image ${index + 1}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            {images.length > 4 && index === 3 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-white font-semibold text-lg">
                                        +{images.length - 4} more
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-7xl max-h-[90vh] w-full h-full">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <Image
                            src={selectedImage}
                            alt="Full size image"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 pt-4 border-t border-[#e8dfd0]">
                <button
                    onClick={onLike}
                    className="flex items-center gap-2 text-[#6b5d4a] hover:text-[#5d4a2f] transition-colors"
                >
                    <Heart size={18} />
                    <span className="text-sm font-medium">{likes}</span>
                </button>
                <button
                    onClick={onComment}
                    className="flex items-center gap-2 text-[#6b5d4a] hover:text-[#5d4a2f] transition-colors"
                >
                    <MessageCircle size={18} />
                    <span className="text-sm font-medium">{comments}</span>
                </button>
                <button
                    onClick={onShare}
                    className="flex items-center gap-2 text-[#6b5d4a] hover:text-[#5d4a2f] transition-colors"
                >
                    <Share2 size={18} />
                    <span className="text-sm font-medium">{shares}</span>
                </button>
            </div>
        </Card>
    );
};

export default PostCard;

