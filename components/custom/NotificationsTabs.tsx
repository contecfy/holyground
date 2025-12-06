"use client";

import React from "react";
import Badge from "@/components/ui/badge";
import { type Notification } from "@/lib/demo-data";
import {
  Heart,
  MessageCircle,
  UserPlus,
  AtSign,
  CheckCircle,
  Share2,
  Bell,
} from "lucide-react";

export type NotificationType =
  | "all"
  | "likes"
  | "comments"
  | "follows"
  | "mentions"
  | "answers"
  | "shares";

interface NotificationsTabsProps {
  activeFilter: NotificationType;
  onFilterChange: (filter: NotificationType) => void;
  notifications: Notification[];
}

const filterButtons: Array<{
  type: NotificationType;
  label: string;
  icon: React.ReactNode;
}> = [
  { type: "all", label: "All", icon: <Bell className="w-4 h-4" /> },
  { type: "likes", label: "Likes", icon: <Heart className="w-4 h-4" /> },
  {
    type: "comments",
    label: "Comments",
    icon: <MessageCircle className="w-4 h-4" />,
  },
  {
    type: "follows",
    label: "Follows",
    icon: <UserPlus className="w-4 h-4" />,
  },
  {
    type: "mentions",
    label: "Mentions",
    icon: <AtSign className="w-4 h-4" />,
  },
  {
    type: "answers",
    label: "Answers",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  { type: "shares", label: "Shares", icon: <Share2 className="w-4 h-4" /> },
];

export default function NotificationsTabs({
  activeFilter,
  onFilterChange,
  notifications,
}: NotificationsTabsProps) {
  return (
    <div className="mb-6 -mx-4 md:mx-0 overflow-hidden">
      <div className="border-b border-[#e8dfd0] overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 md:gap-4 px-4 md:px-0 w-max md:w-full">
          {filterButtons.map((filter) => {
            const count =
              filter.type === "all"
                ? notifications.length
                : notifications.filter((n) => {
                    switch (filter.type) {
                      case "likes":
                        return n.type === "like";
                      case "comments":
                        return n.type === "comment";
                      case "follows":
                        return n.type === "follow";
                      case "mentions":
                        return n.type === "mention";
                      case "answers":
                        return n.type === "answer";
                      case "shares":
                        return n.type === "share" || n.type === "verse_shared";
                      default:
                        return true;
                    }
                  }).length;

            return (
              <button
                key={filter.type}
                onClick={() => onFilterChange(filter.type)}
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
  );
}
