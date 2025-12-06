"use client";

import React, { useState } from "react";
import QuestionCard from "@/components/common/question-card";
import PostCard from "@/components/common/post-card";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import { Bookmark, BookOpen, MessageSquare, Trash2 } from "lucide-react";
import SearchBar from "@/components/ui/search-bar";
import { demoQuestions } from "@/lib/demo-data";

type BookmarkType = "all" | "posts" | "verses" | "questions";

interface BookmarkedItem {
  id: string;
  type: "post" | "verse" | "question";
  savedAt: string;
  data: Record<string, unknown>;
}

// Demo bookmarked items
const demoBookmarks: BookmarkedItem[] = [
  {
    id: "1",
    type: "verse",
    savedAt: "2 days ago",
    data: {
      verse: {
        book: "Jeremiah",
        chapter: 29,
        verse: 11,
        text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."',
      },
      author: {
        name: "Sarah Mitchell",
        username: "sarahm",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
      },
      content:
        "This verse has been such a comfort to me during difficult times.",
      timestamp: "3 days ago",
      likes: 42,
      comments: 12,
    },
  },
  {
    id: "2",
    type: "question",
    savedAt: "1 week ago",
    data: demoQuestions[0],
  },
  {
    id: "3",
    type: "post",
    savedAt: "1 week ago",
    data: {
      author: {
        name: "Pastor John Davis",
        username: "pastorjohn",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
      },
      content:
        "Meditating on Philippians 4:6-7 today. The peace of God truly surpasses all understanding when we bring our anxieties to Him in prayer.",
      timestamp: "1 week ago",
      likes: 89,
      comments: 23,
      verse: {
        book: "Philippians",
        chapter: 4,
        verse: "6-7",
        text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
      },
    },
  },
  {
    id: "4",
    type: "verse",
    savedAt: "2 weeks ago",
    data: {
      verse: {
        book: "Proverbs",
        chapter: 3,
        verse: "5-6",
        text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      },
      author: {
        name: "Michael Chen",
        username: "michaelc",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
      },
      content: "A reminder to trust God's plan, not our own.",
      timestamp: "2 weeks ago",
      likes: 67,
      comments: 15,
    },
  },
  {
    id: "5",
    type: "question",
    savedAt: "2 weeks ago",
    data: demoQuestions[1],
  },
  {
    id: "6",
    type: "post",
    savedAt: "3 weeks ago",
    data: {
      author: {
        name: "Jessica Williams",
        username: "jessicaw",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
      },
      content:
        "Reflecting on how God's grace is sufficient for us. His power is made perfect in our weakness.",
      timestamp: "3 weeks ago",
      likes: 124,
      comments: 34,
    },
  },
];

export default function BookmarksPage() {
  const [activeFilter, setActiveFilter] = useState<BookmarkType>("all");
  const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>(demoBookmarks);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    // Filter by type
    if (activeFilter !== "all" && bookmark.type !== activeFilter.slice(0, -1)) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (bookmark.type === "verse" && bookmark.data.verse) {
        return (
          bookmark.data.verse.text.toLowerCase().includes(query) ||
          bookmark.data.verse.book.toLowerCase().includes(query) ||
          bookmark.data.content?.toLowerCase().includes(query)
        );
      } else if (bookmark.type === "question" && bookmark.data.question) {
        return bookmark.data.question.toLowerCase().includes(query);
      } else if (bookmark.type === "post" && bookmark.data.content) {
        return bookmark.data.content.toLowerCase().includes(query);
      }
      return false;
    }

    return true;
  });

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const getBookmarkCount = (type: BookmarkType) => {
    if (type === "all") return bookmarks.length;
    const typeKey = type.slice(0, -1) as "post" | "verse" | "question";
    return bookmarks.filter((b) => b.type === typeKey).length;
  };

  const filterButtons: Array<{
    type: BookmarkType;
    label: string;
    icon: React.ReactNode;
  }> = [
    { type: "all", label: "All", icon: <Bookmark className="w-4 h-4" /> },
    {
      type: "posts",
      label: "Posts",
      icon: <MessageSquare className="w-4 h-4" />,
    },
    { type: "verses", label: "Verses", icon: <BookOpen className="w-4 h-4" /> },
    {
      type: "questions",
      label: "Questions",
      icon: <MessageSquare className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#3d2817] mb-2">
          Bookmarks
        </h1>
        <p className="text-sm md:text-base text-[#6b5d4a]">
          Your saved posts, verses, and questions
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <SearchBar
          placeholder="Search your bookmarks..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {/* Filter Tabs */}
        <div className="border-b border-[#e8dfd0] overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-2 md:gap-4 w-max md:w-full md:min-w-0">
            {filterButtons.map((filter) => {
              const count = getBookmarkCount(filter.type);
              return (
                <button
                  key={filter.type}
                  onClick={() => setActiveFilter(filter.type)}
                  className={`px-3 md:px-4 py-2 md:py-3 font-medium transition-colors border-b-2 whitespace-nowrap flex-shrink-0 flex items-center gap-2 ${
                    activeFilter === filter.type
                      ? "border-[#5d4a2f] text-[#5d4a2f]"
                      : "border-transparent text-[#6b5d4a] hover:text-[#5d4a2f]"
                  }`}
                >
                  {filter.icon}
                  <span className="text-sm md:text-base">{filter.label}</span>
                  {count > 0 && (
                    <Badge variant="default" size="sm" className="ml-1">
                      {count}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-4">
        {filteredBookmarks.length === 0 ? (
          <Card variant="paper" className="p-12 text-center">
            <Bookmark className="w-12 h-12 text-[#6b5d4a] mx-auto mb-4 opacity-50" />
            <p className="text-[#6b5d4a] font-medium">
              {searchQuery ? "No bookmarks found" : "No bookmarks yet"}
            </p>
            <p className="text-sm text-[#6b5d4a] mt-2">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Start bookmarking posts, verses, and questions you want to save"}
            </p>
          </Card>
        ) : (
          filteredBookmarks.map((bookmark) => {
            if (bookmark.type === "question") {
              return (
                <div key={bookmark.id} className="relative">
                  <QuestionCard {...bookmark.data} />
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <Badge
                      variant="default"
                      size="sm"
                      className="bg-[#8b6f47] text-white"
                    >
                      Saved {bookmark.savedAt}
                    </Badge>
                    <button
                      onClick={() => removeBookmark(bookmark.id)}
                      className="p-2 hover:bg-[#e8dfd0] rounded-full transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4 text-[#6b5d4a] hover:text-[#5d4a2f]" />
                    </button>
                  </div>
                </div>
              );
            } else if (bookmark.type === "post" || bookmark.type === "verse") {
              return (
                <div key={bookmark.id} className="relative">
                  <PostCard {...bookmark.data} />
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <Badge
                      variant="default"
                      size="sm"
                      className="bg-[#8b6f47] text-white"
                    >
                      Saved {bookmark.savedAt}
                    </Badge>
                    <button
                      onClick={() => removeBookmark(bookmark.id)}
                      className="p-2 hover:bg-[#e8dfd0] rounded-full transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4 text-[#6b5d4a] hover:text-[#5d4a2f]" />
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })
        )}
      </div>

      {/* Load More */}
      {filteredBookmarks.length > 0 && (
        <div className="mt-8 text-center">
          <Button
            buttonType="secondary"
            buttonVariant="outline"
            buttonText="Load More"
            className="w-full md:w-auto"
          />
        </div>
      )}
    </div>
  );
}
