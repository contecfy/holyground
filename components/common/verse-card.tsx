import React from "react";
import { Bookmark, Share2 } from "lucide-react";
import Card from "../ui/card";
import Button from "../ui/button";

interface VerseCardProps {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  translation?: string;
  onShare?: () => void;
  onSave?: () => void;
  onReadMore?: () => void;
  className?: string;
}

const VerseCard = ({
  book,
  chapter,
  verse,
  text,
  translation = "NIV",
  onShare,
  onSave,
  onReadMore,
  className = "",
}: VerseCardProps) => {
  return (
    <Card
      variant="elevated"
      className={`${className} relative overflow-hidden`}
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#d4c4b0]/30 to-transparent rounded-bl-full" />

      <div className="relative">
        {/* Verse Reference */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#8b6f47] uppercase tracking-wider">
              {book}
            </span>
            <span className="text-sm text-[#6b5d4a]">
              {chapter}:{verse}
            </span>
          </div>
          <span className="text-xs text-[#6b5d4a] italic">{translation}</span>
        </div>

        {/* Verse Text */}
        <div className="mb-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl text-[#8b6f47] leading-none mt-1">
              &quot;
            </span>
            <p className="flex-1 text-[#3d2817] text-lg leading-relaxed italic font-serif">
              {text}
            </p>
            <span className="text-3xl text-[#8b6f47] leading-none mt-1">
              &quot;
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-[#e8dfd0]">
          {onSave && (
            <Button
              buttonType="secondary"
              buttonVariant="ghost"
              buttonSize="small"
              buttonIcon={<Bookmark size={16} />}
              buttonText="Save"
              onClick={onSave}
            />
          )}
          {onShare && (
            <Button
              buttonType="secondary"
              buttonVariant="ghost"
              buttonSize="small"
              buttonIcon={<Share2 size={16} />}
              buttonText="Share"
              onClick={onShare}
            />
          )}
          {onReadMore && (
            <Button
              buttonType="primary"
              buttonVariant="link"
              buttonSize="small"
              buttonText="Read More"
              onClick={onReadMore}
              className="ml-auto"
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default VerseCard;
