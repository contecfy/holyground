"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/avatar";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  UserPlus,
  AtSign,
  CheckCircle,
  Share2,
  BookOpen,
  Bell,
  BellOff,
  Check,
} from "lucide-react";

type NotificationType =
  | "all"
  | "likes"
  | "comments"
  | "follows"
  | "mentions"
  | "answers"
  | "shares";

interface Notification {
  id: string;
  type:
    | "like"
    | "comment"
    | "follow"
    | "mention"
    | "answer"
    | "share"
    | "verse_shared";
  read: boolean;
  timestamp: string;
  users: Array<{
    name: string;
    username: string;
    avatar?: string;
  }>;
  content?: {
    type: "post" | "question" | "verse" | "answer";
    preview: string;
    id?: string;
  };
  action?: string;
}

const demoNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    read: false,
    timestamp: "5m ago",
    users: [
      {
        name: "Sarah Mitchell",
        username: "sarahm",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
      },
      {
        name: "Michael Chen",
        username: "michaelc",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
      },
      { name: "David Rodriguez", username: "davidr" },
    ],
    content: {
      type: "verse",
      preview:
        '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."',
      id: "verse-123",
    },
  },
  {
    id: "2",
    type: "comment",
    read: false,
    timestamp: "12m ago",
    users: [
      {
        name: "Pastor John Davis",
        username: "pastorjohn",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
      },
    ],
    content: {
      type: "post",
      preview: "Meditating on this verse today. God's love is truly amazing!",
      id: "post-456",
    },
    action: 'commented: "Amen! This verse has been such a blessing to me too."',
  },
  {
    id: "3",
    type: "follow",
    read: false,
    timestamp: "1h ago",
    users: [
      {
        name: "Jessica Williams",
        username: "jessicaw",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
      },
      { name: "Robert Taylor", username: "robertt" },
    ],
  },
  {
    id: "4",
    type: "answer",
    read: true,
    timestamp: "2h ago",
    users: [
      {
        name: "Dr. Elizabeth Thompson",
        username: "elizabetht",
        avatar:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=faces",
      },
    ],
    content: {
      type: "question",
      preview:
        'What does it mean to "walk by faith, not by sight" in 2 Corinthians 5:7?',
      id: "question-789",
    },
  },
  {
    id: "5",
    type: "mention",
    read: true,
    timestamp: "3h ago",
    users: [
      {
        name: "Michael Chen",
        username: "michaelc",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
      },
    ],
    content: {
      type: "post",
      preview: "Just shared an amazing verse! @you should check it out.",
      id: "post-101",
    },
  },
  {
    id: "6",
    type: "share",
    read: true,
    timestamp: "4h ago",
    users: [
      {
        name: "Sarah Mitchell",
        username: "sarahm",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
      },
    ],
    content: {
      type: "verse",
      preview:
        '"Trust in the Lord with all your heart and lean not on your own understanding."',
      id: "verse-234",
    },
  },
  {
    id: "7",
    type: "like",
    read: true,
    timestamp: "5h ago",
    users: [{ name: "David Rodriguez", username: "davidr" }],
    content: {
      type: "answer",
      preview:
        "Walking by faith means trusting in God's promises and character even when circumstances suggest otherwise...",
      id: "answer-345",
    },
  },
  {
    id: "8",
    type: "verse_shared",
    read: true,
    timestamp: "6h ago",
    users: [
      {
        name: "Pastor John Davis",
        username: "pastorjohn",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
      },
    ],
    content: {
      type: "verse",
      preview: '"Be still, and know that I am God." - Psalm 46:10',
      id: "verse-567",
    },
  },
  {
    id: "9",
    type: "comment",
    read: true,
    timestamp: "1d ago",
    users: [
      {
        name: "Jessica Williams",
        username: "jessicaw",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
      },
    ],
    content: {
      type: "question",
      preview:
        "How should Christians respond to persecution according to the Bible?",
      id: "question-890",
    },
    action:
      'commented: "Great question! I think the key is to respond with love and prayer."',
  },
  {
    id: "10",
    type: "follow",
    read: true,
    timestamp: "2d ago",
    users: [{ name: "Robert Taylor", username: "robertt" }],
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "like":
      return <Heart className="w-5 h-5 text-red-500" />;
    case "comment":
      return <MessageCircle className="w-5 h-5 text-blue-500" />;
    case "follow":
      return <UserPlus className="w-5 h-5 text-green-500" />;
    case "mention":
      return <AtSign className="w-5 h-5 text-purple-500" />;
    case "answer":
      return <CheckCircle className="w-5 h-5 text-[#8b6f47]" />;
    case "share":
      return <Share2 className="w-5 h-5 text-[#8b6f47]" />;
    case "verse_shared":
      return <BookOpen className="w-5 h-5 text-[#8b6f47]" />;
    default:
      return <Bell className="w-5 h-5 text-[#6b5d4a]" />;
  }
};

const getNotificationText = (notification: Notification) => {
  const userCount = notification.users.length;
  const firstName = notification.users[0].name.split(" ")[0];

  if (userCount === 1) {
    switch (notification.type) {
      case "like":
        return `${firstName} liked your ${notification.content?.type || "post"}`;
      case "comment":
        return `${firstName} commented on your ${notification.content?.type || "post"}`;
      case "follow":
        return `${firstName} started following you`;
      case "mention":
        return `${firstName} mentioned you`;
      case "answer":
        return `${firstName} answered your question`;
      case "share":
        return `${firstName} shared your ${notification.content?.type || "post"}`;
      case "verse_shared":
        return `${firstName} shared a verse with you`;
      default:
        return `${firstName} interacted with your content`;
    }
  } else if (userCount === 2) {
    const secondName = notification.users[1].name.split(" ")[0];
    switch (notification.type) {
      case "like":
        return `${firstName} and ${secondName} liked your ${notification.content?.type || "post"}`;
      case "comment":
        return `${firstName} and ${secondName} commented on your ${notification.content?.type || "post"}`;
      case "follow":
        return `${firstName} and ${secondName} started following you`;
      default:
        return `${firstName} and ${secondName} interacted with your content`;
    }
  } else {
    const othersCount = userCount - 1;
    switch (notification.type) {
      case "like":
        return `${firstName} and ${othersCount} others liked your ${notification.content?.type || "post"}`;
      case "comment":
        return `${firstName} and ${othersCount} others commented on your ${notification.content?.type || "post"}`;
      case "follow":
        return `${firstName} and ${othersCount} others started following you`;
      default:
        return `${firstName} and ${othersCount} others interacted with your content`;
    }
  }
};

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<NotificationType>("all");
  const [notifications, setNotifications] =
    useState<Notification[]>(demoNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications =
    activeFilter === "all"
      ? notifications
      : notifications.filter((n) => {
          switch (activeFilter) {
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
        });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

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

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#3d2817] mb-2">
            Notifications
          </h1>
          <p className="text-sm md:text-base text-[#6b5d4a]">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            buttonType="secondary"
            buttonVariant="outline"
            buttonSize="small"
            buttonText="Mark all as read"
            buttonIcon={<Check className="w-4 h-4" />}
            onClick={markAllAsRead}
            className="w-full sm:w-auto"
          />
        )}
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="border-b border-[#e8dfd0] overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-2 md:gap-4 w-max md:w-full md:min-w-0">
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
                          return (
                            n.type === "share" || n.type === "verse_shared"
                          );
                        default:
                          return true;
                      }
                    }).length;

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

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.length === 0 ? (
          <Card variant="paper" className="p-12 text-center">
            <BellOff className="w-12 h-12 text-[#6b5d4a] mx-auto mb-4 opacity-50" />
            <p className="text-[#6b5d4a] font-medium">No notifications found</p>
            <p className="text-sm text-[#6b5d4a] mt-2">
              You&apos;re all caught up!
            </p>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              variant={notification.read ? "paper" : "elevated"}
              className={`p-4 hover:shadow-md transition-all cursor-pointer ${
                !notification.read
                  ? "bg-[#f5f1eb] border-l-4 border-l-[#8b6f47]"
                  : ""
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex gap-4">
                {/* Avatars */}
                <div className="flex-shrink-0 relative">
                  <div className="flex -space-x-2">
                    {notification.users.slice(0, 3).map((user, idx) => (
                      <div key={idx} className="relative">
                        <Avatar
                          name={user.name}
                          src={user.avatar}
                          size="md"
                          className={idx > 0 ? "-ml-2" : ""}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-base text-[#3d2817] font-medium">
                        {getNotificationText(notification)}
                      </p>
                      {notification.action && (
                        <p className="text-sm text-[#6b5d4a] mt-1 italic">
                          {notification.action}
                        </p>
                      )}
                      {notification.content && (
                        <div className="mt-2 p-3 bg-[#faf8f5] border-l-4 border-l-[#8b6f47] rounded-r-md">
                          <p className="text-sm text-[#3d2817] line-clamp-2">
                            {notification.content.preview}
                          </p>
                        </div>
                      )}
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-[#8b6f47] rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-[#6b5d4a]">
                      {notification.timestamp}
                    </span>
                    {notification.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setNotifications((prev) =>
                            prev.map((n) =>
                              n.id === notification.id
                                ? { ...n, read: false }
                                : n
                            )
                          );
                        }}
                        className="text-xs text-[#6b5d4a] hover:text-[#5d4a2f] transition-colors"
                      >
                        Mark as unread
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredNotifications.length > 0 && (
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
