"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, RefreshCw } from "lucide-react";
import Card from "../ui/card";

interface Verse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

const DailyVerse = () => {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate a consistent verse for each day using date as seed
  const getDailyVerseSeed = () => {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    // Simple hash to get a number between 1 and 31102 (total verses in Bible)
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = ((hash << 5) - hash + dateString.charCodeAt(i)) | 0;
    }
    return Math.abs(hash) % 31102;
  };

  // Popular Bible books with their verse counts (simplified)
  const bibleBooks = [
    { name: "Genesis", chapters: 50 },
    { name: "Psalms", chapters: 150 },
    { name: "Proverbs", chapters: 31 },
    { name: "John", chapters: 21 },
    { name: "Romans", chapters: 16 },
    { name: "1 Corinthians", chapters: 16 },
    { name: "Ephesians", chapters: 6 },
    { name: "Philippians", chapters: 4 },
    { name: "Colossians", chapters: 4 },
    { name: "1 Thessalonians", chapters: 5 },
    { name: "2 Thessalonians", chapters: 3 },
    { name: "1 Timothy", chapters: 6 },
    { name: "2 Timothy", chapters: 4 },
    { name: "Titus", chapters: 3 },
    { name: "Hebrews", chapters: 13 },
    { name: "James", chapters: 5 },
    { name: "1 Peter", chapters: 5 },
    { name: "2 Peter", chapters: 3 },
    { name: "1 John", chapters: 5 },
    { name: "Matthew", chapters: 28 },
    { name: "Mark", chapters: 16 },
    { name: "Luke", chapters: 24 },
    { name: "Acts", chapters: 28 },
    { name: "Revelation", chapters: 22 },
  ];

  const fetchDailyVerse = async () => {
    setLoading(true);
    setError(null);

    try {
      // Use a simple approach: pick a random book and chapter based on date seed
      const seed = getDailyVerseSeed();
      const bookIndex = seed % bibleBooks.length;
      const selectedBook = bibleBooks[bookIndex];
      const chapter = (seed % selectedBook.chapters) + 1;

      // Try multiple API endpoints for reliability
      const apiEndpoints = [
        `https://bible-api.com/${encodeURIComponent(selectedBook.name)}%20${chapter}:1-10?translation=kjv`,
        `https://bible-api.com/${encodeURIComponent(selectedBook.name)}%20${chapter}:1-10`,
      ];

      let data = null;

      for (const endpoint of apiEndpoints) {
        try {
          const response = await fetch(endpoint, {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          });

          if (response.ok) {
            data = await response.json();
            break;
          }
        } catch {
          // Try next endpoint
          continue;
        }
      }

      if (!data || !data.verses || data.verses.length === 0) {
        throw new Error("No verse data received");
      }

      // Pick a random verse from the fetched verses (1-10)
      const verseIndex = seed % Math.min(data.verses.length, 10);
      const selectedVerse = data.verses[verseIndex];

      setVerse({
        book: data.reference.split(":")[0],
        chapter: chapter,
        verse: selectedVerse.verse,
        text: selectedVerse.text.trim(),
      });
    } catch (err) {
      console.error("Error fetching daily verse:", err);
      setError("Unable to load daily verse");
      // Fallback verse - always show something
      setVerse({
        book: "John",
        chapter: 3,
        verse: 16,
        text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyVerse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only fetch once per day (component mount)

  if (loading) {
    return (
      <Card variant="elevated" className="p-4 md:p-6">
        <div className="flex items-center gap-3">
          <BookOpen className="text-[#8b6f47] animate-pulse" size={20} />
          <div className="flex-1">
            <div className="h-4 bg-[#e8dfd0] rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-3 bg-[#e8dfd0] rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (error && !verse) {
    return (
      <Card variant="paper" className="p-4 md:p-6">
        <p className="text-[#6b5d4a] text-sm">{error}</p>
      </Card>
    );
  }

  if (!verse) return null;

  return (
    <Card variant="elevated" className="p-4 md:p-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8b6f47]/10 to-transparent rounded-bl-full" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="text-[#8b6f47]" size={18} />
            <h3 className="text-sm font-semibold text-[#3d2817] uppercase tracking-wide">
              Verse of the Day
            </h3>
          </div>
          <button
            onClick={fetchDailyVerse}
            className="p-1.5 text-[#6b5d4a] hover:text-[#5d4a2f] hover:bg-[#f5f1eb] rounded-md transition-colors"
            aria-label="Refresh verse"
            title="Refresh verse"
          >
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Verse Reference */}
        <div className="mb-3">
          <span className="text-xs font-semibold text-[#8b6f47] uppercase tracking-wider">
            {verse.book}
          </span>
          <span className="text-sm text-[#6b5d4a] ml-2">
            {verse.chapter}:{verse.verse}
          </span>
        </div>

        {/* Verse Text */}
        <div className="mb-2">
          <p className="text-[#3d2817] text-sm md:text-base leading-relaxed italic font-serif">
            &quot;{verse.text}&quot;
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#e8dfd0]">
          <p className="text-xs text-[#6b5d4a]">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DailyVerse;
