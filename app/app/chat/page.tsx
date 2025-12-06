"use client";

import React, { useState } from "react";
import { Search, Send, MoreVertical } from "lucide-react";
import Avatar from "@/components/ui/avatar";
import Input from "@/components/ui/input";

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  // Mock chat data
  const chats = [
    {
      id: "1",
      name: "John Doe",
      username: "johndoe",
      lastMessage: "Thanks for the prayer!",
      timestamp: "2m ago",
      unread: 2,
      avatar: undefined,
    },
    {
      id: "2",
      name: "Jane Smith",
      username: "janesmith",
      lastMessage: "Can we pray together?",
      timestamp: "1h ago",
      unread: 0,
      avatar: undefined,
    },
    {
      id: "3",
      name: "Pastor John",
      username: "pastorjohn",
      lastMessage: "Great question about faith!",
      timestamp: "3h ago",
      unread: 1,
      avatar: undefined,
    },
  ];

  const messages = selectedChat
    ? [
        {
          id: "1",
          sender: "johndoe",
          text: "Hey, how are you?",
          timestamp: "10:30 AM",
        },
        {
          id: "2",
          sender: "me",
          text: "I'm doing well, thanks!",
          timestamp: "10:32 AM",
        },
        {
          id: "3",
          sender: "johndoe",
          text: "Thanks for the prayer!",
          timestamp: "10:35 AM",
        },
      ]
    : [];

  const currentChat = chats.find((chat) => chat.id === selectedChat);

  return (
    <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-[#3d2817] mb-2">Chat</h1>
        <p className="text-[#6b5d4a]">Connect with your community</p>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Chat List */}
        <div className="w-full md:w-80 flex-shrink-0 flex flex-col border border-[#d4c4b0] rounded-lg bg-white">
          {/* Search */}
          <div className="p-4 border-b border-[#d4c4b0]">
            <Input
              placeholder="Search chats..."
              variant="filled"
              leftIcon={<Search size={18} className="text-[#6b5d4a]" />}
            />
          </div>

          {/* Chat Items */}
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-4 border-b border-[#e8dfd0] hover:bg-[#f5f1eb] transition-colors text-left ${
                  selectedChat === chat.id ? "bg-[#f5f1eb]" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar name={chat.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-[#3d2817] truncate">
                        {chat.name}
                      </p>
                      <span className="text-xs text-[#6b5d4a] flex-shrink-0 ml-2">
                        {chat.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[#6b5d4a] truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <span className="flex-shrink-0 ml-2 bg-[#5d4a2f] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 flex flex-col border border-[#d4c4b0] rounded-lg bg-white hidden md:flex">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-[#d4c4b0] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={currentChat?.name || ""} size="md" />
                  <div>
                    <p className="font-semibold text-[#3d2817]">
                      {currentChat?.name}
                    </p>
                    <p className="text-xs text-[#6b5d4a]">
                      @{currentChat?.username}
                    </p>
                  </div>
                </div>
                <button className="p-2 text-[#6b5d4a] hover:text-[#5d4a2f] hover:bg-[#f5f1eb] rounded-md transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "me"
                          ? "bg-[#5d4a2f] text-white"
                          : "bg-[#f5f1eb] text-[#3d2817]"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "me"
                            ? "text-white/70"
                            : "text-[#6b5d4a]"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-[#d4c4b0]">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    variant="filled"
                    className="flex-1"
                  />
                  <button className="p-3 bg-[#5d4a2f] text-white rounded-lg hover:bg-[#3d2817] transition-colors">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#6b5d4a]">
              <p>Select a chat to start messaging</p>
            </div>
          )}
        </div>

        {/* Mobile Chat View */}
        {selectedChat && (
          <div className="md:hidden fixed inset-0 z-50 bg-white flex flex-col">
            {/* Mobile Chat Header */}
            <div className="p-4 border-b border-[#d4c4b0] flex items-center gap-3">
              <button
                onClick={() => setSelectedChat(null)}
                className="text-[#6b5d4a] hover:text-[#5d4a2f]"
              >
                ← Back
              </button>
              <Avatar name={currentChat?.name || ""} size="sm" />
              <div className="flex-1">
                <p className="font-semibold text-[#3d2817]">
                  {currentChat?.name}
                </p>
                <p className="text-xs text-[#6b5d4a]">
                  @{currentChat?.username}
                </p>
              </div>
              <button className="p-2 text-[#6b5d4a] hover:text-[#5d4a2f]">
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Mobile Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "me"
                        ? "bg-[#5d4a2f] text-white"
                        : "bg-[#f5f1eb] text-[#3d2817]"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "me"
                          ? "text-white/70"
                          : "text-[#6b5d4a]"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Message Input */}
            <div className="p-4 border-t border-[#d4c4b0]">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  variant="filled"
                  className="flex-1"
                />
                <button className="p-3 bg-[#5d4a2f] text-white rounded-lg hover:bg-[#3d2817] transition-colors">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
