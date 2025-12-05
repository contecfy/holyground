'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { BookOpen, Image as ImageIcon, X } from 'lucide-react';
import Card from '../ui/card';
import Input from '../ui/input';
import Textarea from '../ui/textarea';
import Button from '../ui/button';
import Badge from '../ui/badge';

export enum PostType {
    POST = 'post',
    QUESTION = 'question',
    STORY = 'story'
}

interface CreatePostProps {
    onSubmit?: (data: {
        title: string;
        content: string;
        postType: PostType;
        topics: string[];
        books: string[];
        images: string[];
    }) => void;
}

const popularTopics = [
    'Doctrine', 'Apologetics', 'Daily Devotionals', 'Christian Relationships',
    'Church History', 'Faith', 'Prayer', 'Prophecy', 'Sin', 'Spiritual Gifts',
    'Salvation', 'Theology', 'Bible Study', 'Worship'
];

const popularBooks = [
    'Genesis', 'Psalms', 'John', 'Romans', '1 Corinthians', 'Ephesians',
    'Matthew', 'Acts', 'Revelation', 'Hebrews', 'James', '1 Peter',
    'Exodus', 'Isaiah', 'Mark', 'Luke', '2 Corinthians', 'Galatians',
    'Philippians', 'Colossians', '1 Thessalonians', '2 Timothy', 'Titus'
];

const CreatePost = ({
    onSubmit
}: CreatePostProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postType, setPostType] = useState<PostType>(PostType.POST);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [topicSearch, setTopicSearch] = useState('');
    const [bookSearch, setBookSearch] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleTopicToggle = (topic: string) => {
        setSelectedTopics(prev =>
            prev.includes(topic)
                ? prev.filter(t => t !== topic)
                : [...prev, topic]
        );
    };

    const handleBookToggle = (book: string) => {
        setSelectedBooks(prev =>
            prev.includes(book)
                ? prev.filter(b => b !== book)
                : [...prev, book]
        );
    };

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
        if (title.trim() && content.trim() && onSubmit) {
            onSubmit({
                title,
                content,
                postType,
                topics: selectedTopics,
                books: selectedBooks,
                images
            });
            setTitle('');
            setContent('');
            setPostType(PostType.POST);
            setSelectedTopics([]);
            setSelectedBooks([]);
            setImages([]);
            setTopicSearch('');
            setBookSearch('');
        }
    };

    const filteredTopics = popularTopics.filter(topic =>
        topic.toLowerCase().includes(topicSearch.toLowerCase())
    );

    const filteredBooks = popularBooks.filter(book =>
        book.toLowerCase().includes(bookSearch.toLowerCase())
    );

    return (
        <Card variant="paper" className="mb-4">
            <div className="space-y-4">
                {/* Title Input */}
                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="underline"
                    className="text-base"
                />

                {/* Content Input */}
                <Textarea
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    variant="underline"
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

                {/* Topics Section */}
                <div>
                    <label className="block text-sm font-medium text-[#3d2817] mb-2">
                        Topics (optional)
                    </label>
                    {selectedTopics.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                            {selectedTopics.map((topic) => (
                                <Badge
                                    key={topic}
                                    variant="default"
                                    size="sm"
                                    className="cursor-pointer"
                                    onClick={() => handleTopicToggle(topic)}
                                >
                                    {topic} <X size={12} className="inline ml-1" />
                                </Badge>
                            ))}
                        </div>
                    )}
                    <Input
                        placeholder="Search topics..."
                        value={topicSearch}
                        onChange={(e) => setTopicSearch(e.target.value)}
                        variant="underline"
                        className="text-sm mb-2"
                    />
                    <div className="flex flex-wrap gap-2">
                        {filteredTopics.slice(0, 8).map((topic) => (
                            <Badge
                                key={topic}
                                variant={selectedTopics.includes(topic) ? "primary" : "default"}
                                size="sm"
                                className="cursor-pointer hover:bg-[#e8dfd0] transition-colors"
                                onClick={() => handleTopicToggle(topic)}
                            >
                                {topic}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Bible Books Section */}
                <div>
                    <label className="block text-sm font-medium text-[#3d2817] mb-2">
                        Related Bible Books (optional)
                    </label>
                    {selectedBooks.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                            {selectedBooks.map((book) => (
                                <Badge
                                    key={book}
                                    variant="primary"
                                    size="sm"
                                    className="cursor-pointer flex items-center gap-1"
                                    onClick={() => handleBookToggle(book)}
                                >
                                    <BookOpen size={12} />
                                    {book} <X size={12} className="inline ml-1" />
                                </Badge>
                            ))}
                        </div>
                    )}
                    <Input
                        placeholder="Search for a book..."
                        value={bookSearch}
                        onChange={(e) => setBookSearch(e.target.value)}
                        variant="underline"
                        className="text-sm mb-2"
                    />
                    <div className="flex flex-wrap gap-2">
                        {filteredBooks.slice(0, 8).map((book) => (
                            <Badge
                                key={book}
                                variant={selectedBooks.includes(book) ? "primary" : "default"}
                                size="sm"
                                className="cursor-pointer hover:bg-[#e8dfd0] transition-colors flex items-center gap-1"
                                onClick={() => handleBookToggle(book)}
                            >
                                <BookOpen size={12} />
                                {book}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-[#3d2817] mb-2">
                        Images (optional)
                    </label>
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
                        buttonVariant="outline"
                        buttonSize="small"
                        buttonIcon={<ImageIcon size={16} />}
                        buttonText="Add Images"
                        onClick={() => fileInputRef.current?.click()}
                    />
                    
                    {/* Image Previews */}
                    {images.length > 0 && (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative aspect-square rounded-lg overflow-hidden bg-[#f5f1eb] group"
                                >
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

