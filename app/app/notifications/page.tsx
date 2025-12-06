"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/avatar";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import NotificationsTabs, {
  type NotificationType,
} from "@/components/custom/NotificationsTabs";
import { demoNotifications, type Notification } from "@/lib/demo-data";
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

  return (
    <div className="w-full max-w-4xl mx-auto min-w-0">
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
      <NotificationsTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        notifications={notifications}
      />

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
