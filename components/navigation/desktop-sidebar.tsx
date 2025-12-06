"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Church,
  BookOpen,
  Bell,
  Bookmark,
  PenSquare,
  Heart,
  MessageCircle,
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Avatar from "../ui/avatar";
import Button from "../ui/button";
import Image from "next/image";
import { useSidebar } from "@/contexts/sidebar-context";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Explore", icon: <Search size={20} />, href: "/app" },
  {
    label: "Find Church",
    icon: <Church size={20} />,
    href: "/app/find-church",
  },
  { label: "Prayer", icon: <Heart size={20} />, href: "/app/prayer" },
  { label: "Chat", icon: <MessageCircle size={20} />, href: "/app/chat" },
  { label: "Spaces", icon: <BookOpen size={20} />, href: "/app/spaces" },
  {
    label: "Notifications",
    icon: <Bell size={20} />,
    href: "/app/notifications",
  },
  { label: "Bookmarks", icon: <Bookmark size={20} />, href: "/app/bookmarks" },
];

const DesktopSidebar = () => {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`hidden md:flex flex-col h-screen sticky top-0 border-r border-[#d4c4b0] bg-white transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-[#d4c4b0] relative">
        <Link
          href="/app"
          className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}
        >
          <Image
            src="/logo.png"
            alt="yalor"
            width={isCollapsed ? 40 : 80}
            height={isCollapsed ? 40 : 80}
            className="flex-shrink-0"
          />
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-[#3d2817] tracking-wide">
                yalor
              </h1>
              <p className="text-xs text-[#6b5d4a] -mt-1">Bible Q&A</p>
            </div>
          )}
        </Link>
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-[#d4c4b0] rounded-full flex items-center justify-center hover:bg-[#f5f1eb] transition-colors shadow-sm z-10"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight size={14} className="text-[#6b5d4a]" />
          ) : (
            <ChevronLeft size={14} className="text-[#6b5d4a]" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto sidebar-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group relative ${
                isActive
                  ? "bg-[#f5f1eb] text-[#5d4a2f] font-semibold"
                  : "text-[#6b5d4a] hover:bg-[#f5f1eb] hover:text-[#5d4a2f]"
              } ${isCollapsed ? "justify-center" : ""}`}
              title={isCollapsed ? item.label : undefined}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-[#3d2817] text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}

        {/* Your Spaces Section */}
        {!isCollapsed && (
          <div className="pt-4 mt-4 border-t border-[#e8dfd0]">
            <h3 className="text-xs font-semibold text-[#6b5d4a] uppercase tracking-wide mb-3 px-4">
              Your Spaces
            </h3>
            <div className="space-y-1">
              {[
                { name: "Bible Study Group", href: "/app/spaces/bible-study" },
                {
                  name: "Prayer Warriors",
                  href: "/app/spaces/prayer-warriors",
                },
                { name: "Young Adults", href: "/app/spaces/young-adults" },
              ].map((space) => (
                <Link
                  key={space.href}
                  href={space.href}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-[#6b5d4a] hover:bg-[#f5f1eb] hover:text-[#5d4a2f] transition-colors"
                >
                  <BookOpen size={16} />
                  <span>{space.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Prayer Groups Section */}
        {!isCollapsed && (
          <div className="pt-4 border-t border-[#e8dfd0]">
            <h3 className="text-xs font-semibold text-[#6b5d4a] uppercase tracking-wide mb-3 px-4">
              Prayer Groups
            </h3>
            <div className="space-y-1">
              {[
                {
                  name: "Morning Prayer Circle",
                  href: "/app/prayer/morning-circle",
                },
                {
                  name: "Intercessory Prayer",
                  href: "/app/prayer/intercessory",
                },
              ].map((group) => (
                <Link
                  key={group.href}
                  href={group.href}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-[#6b5d4a] hover:bg-[#f5f1eb] hover:text-[#5d4a2f] transition-colors"
                >
                  <Heart size={16} />
                  <span>{group.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Prayer Partners Section */}
        {!isCollapsed && (
          <div className="pt-4 border-t border-[#e8dfd0]">
            <h3 className="text-xs font-semibold text-[#6b5d4a] uppercase tracking-wide mb-3 px-4">
              Prayer Partners
            </h3>
            <div className="space-y-1">
              {[
                {
                  name: "John Doe",
                  username: "johndoe",
                  href: "/app/profile/johndoe",
                },
                {
                  name: "Jane Smith",
                  username: "janesmith",
                  href: "/app/profile/janesmith",
                },
              ].map((partner) => (
                <Link
                  key={partner.href}
                  href={partner.href}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-[#6b5d4a] hover:bg-[#f5f1eb] hover:text-[#5d4a2f] transition-colors"
                >
                  <Users size={16} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#3d2817] truncate">
                      {partner.name}
                    </p>
                    <p className="text-xs text-[#6b5d4a]">
                      @{partner.username}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Churches Section */}
        {!isCollapsed && (
          <div className="pt-4 border-t border-[#e8dfd0]">
            <h3 className="text-xs font-semibold text-[#6b5d4a] uppercase tracking-wide mb-3 px-4">
              Your Churches
            </h3>
            <div className="space-y-1">
              {[
                {
                  name: "Grace Community Church",
                  href: "/app/church/grace-community",
                },
                {
                  name: "First Baptist Church",
                  href: "/app/church/first-baptist",
                },
              ].map((church) => (
                <Link
                  key={church.href}
                  href={church.href}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-[#6b5d4a] hover:bg-[#f5f1eb] hover:text-[#5d4a2f] transition-colors"
                >
                  <Church size={16} />
                  <span>{church.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Create Button */}
      <div className="p-4 border-t border-[#d4c4b0]">
        <Link href="/app/create" title={isCollapsed ? "Create" : undefined}>
          {isCollapsed ? (
            <button className="w-full p-3 bg-[#5d4a2f] text-white rounded-lg hover:bg-[#3d2817] transition-colors flex items-center justify-center">
              <PenSquare size={20} />
            </button>
          ) : (
            <Button
              buttonType="primary"
              buttonSize="large"
              buttonText="Create"
              buttonIcon={<PenSquare size={18} />}
              iconPosition="left"
              className="w-full"
            />
          )}
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-[#d4c4b0]">
        <Link
          href="/app/profile"
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-[#f5f1eb] transition-colors group relative ${isCollapsed ? "justify-center" : ""}`}
          title={isCollapsed ? "Your Profile" : undefined}
        >
          <Avatar name="You" size={isCollapsed ? "sm" : "md"} />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#3d2817] truncate">
                Your Profile
              </p>
              <p className="text-xs text-[#6b5d4a]">Level 5 • 1.2k Rep</p>
            </div>
          )}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-[#3d2817] text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Your Profile
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
