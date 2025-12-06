"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, X, RefreshCw } from "lucide-react";
import Card from "../ui/card";

interface Verse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

const DailyVerseButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate a consistent verse for each day using date as seed
  const getDailyVerseSeed = () => {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
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
      const seed = getDailyVerseSeed();
      const bookIndex = seed % bibleBooks.length;
      const selectedBook = bibleBooks[bookIndex];
      const chapter = (seed % selectedBook.chapters) + 1;

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
          continue;
        }
      }

      if (!data || !data.verses || data.verses.length === 0) {
        throw new Error("No verse data received");
      }

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
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button - Mobile Only */}
      <button
        onClick={handleOpen}
        className="md:hidden fixed bottom-24 right-4 z-40 bg-gradient-to-br from-[#8b6f47] to-[#5d4a2f] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="View daily verse"
      >
        <BookOpen size={24} />
      </button>

      {/* Modal - Mobile Only */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/60 flex items-end"
          onClick={handleClose}
        >
          <div
            className="w-full bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-[#d4c4b0] px-4 py-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <BookOpen className="text-[#8b6f47]" size={20} />
                <h2 className="text-lg font-bold text-[#3d2817]">
                  Verse of the Day
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-[#6b5d4a] hover:text-[#5d4a2f] hover:bg-[#f5f1eb] rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {loading ? (
                <div className="space-y-4">
                  <div className="h-4 bg-[#e8dfd0] rounded w-3/4 animate-pulse"></div>
                  <div className="h-20 bg-[#e8dfd0] rounded animate-pulse"></div>
                  <div className="h-3 bg-[#e8dfd0] rounded w-1/2 animate-pulse"></div>
                </div>
              ) : error && !verse ? (
                <Card variant="paper" className="p-4">
                  <p className="text-[#6b5d4a] text-sm">{error}</p>
                </Card>
              ) : verse ? (
                <div className="space-y-4">
                  {/* Verse Reference */}
                  <div>
                    <span className="text-sm font-semibold text-[#8b6f47] uppercase tracking-wider">
                      {verse.book}
                    </span>
                    <span className="text-base text-[#6b5d4a] ml-2">
                      {verse.chapter}:{verse.verse}
                    </span>
                  </div>

                  {/* Verse Text */}
                  <div className="py-4">
                    <p className="text-[#3d2817] text-lg leading-relaxed italic font-serif">
                      &quot;{verse.text}&quot;
                    </p>
                  </div>

                  {/* Date */}
                  <div className="pt-4 border-t border-[#e8dfd0]">
                    <p className="text-sm text-[#6b5d4a]">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Refresh Button */}
                  <button
                    onClick={fetchDailyVerse}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-[#f5f1eb] hover:bg-[#e8dfd0] text-[#5d4a2f] rounded-lg transition-colors font-medium"
                  >
                    <RefreshCw size={18} />
                    <span>Refresh Verse</span>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyVerseButton;
