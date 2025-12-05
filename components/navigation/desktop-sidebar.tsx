'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Church, BookOpen, Bell, Bookmark, User, PenSquare, Heart, MessageCircle, Users, Search } from 'lucide-react';
import Avatar from '../ui/avatar';
import Button from '../ui/button';
import Image from 'next/image';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Explore', icon: <Search size={20} />, href: '/app' },
  { label: 'Find Church', icon: <Church size={20} />, href: '/app/find-church' },
  { label: 'Prayer', icon: <Heart size={20} />, href: '/app/prayer' },
  { label: 'Chat', icon: <MessageCircle size={20} />, href: '/app/chat' },
  { label: 'Spaces', icon: <BookOpen size={20} />, href: '/app/spaces' },
  { label: 'Notifications', icon: <Bell size={20} />, href: '/app/notifications' },
  { label: 'Bookmarks', icon: <Bookmark size={20} />, href: '/app/bookmarks' },
];

const DesktopSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-[#d4c4b0] bg-white">
      {/* Logo */}
      <div className="p-4 border-b border-[#d4c4b0]">
        <Link href="/app" className="flex items-center gap-3">
          <Image src="/logo.png" alt="HolyGround" width={80} height={80} />
          <div>
            <h1 className="text-xl font-bold text-[#3d2817] tracking-wide">HolyGround</h1>
            <p className="text-xs text-[#6b5d4a] -mt-1">Bible Q&A</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#f5f1eb] text-[#5d4a2f] font-semibold'
                  : 'text-[#6b5d4a] hover:bg-[#f5f1eb] hover:text-[#5d4a2f]'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Your Spaces Section */}
        <div className="pt-4 mt-4 border-t border-[#e8dfd0]">
          <h3 className="text-xs font-semibold text-[#6b5d4a] uppercase tracking-wide mb-3 px-4">Your Spaces</h3>
          <div className="space-y-1">
            {[
              { name: 'Bible Study Group', href: '/app/spaces/bible-study' },
              { name: 'Prayer Warriors', href: '/app/spaces/prayer-warriors' },
              { name: 'Young Adults', href: '/app/spaces/young-adults' },
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

        {/* Prayer Groups Section */}
        <div className="pt-4 border-t border-[#e8dfd0]">
          <h3 className="text-xs font-semibold text-[#6b5d4a] uppercase tracking-wide mb-3 px-4">Prayer Groups</h3>
          <div className="space-y-1">
            {[
              { name: 'Morning Prayer Circle', href: '/app/prayer/morning-circle' },
              { name: 'Intercessory Prayer', href: '/app/prayer/intercessory' },
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

        {/* Prayer Partners Section */}
        <div className="pt-4 border-t border-[#e8dfd0]">
          <h3 className="text-xs font-semibold text-[#6b5d4a] uppercase tracking-wide mb-3 px-4">Prayer Partners</h3>
          <div className="space-y-1">
            {[
              { name: 'John Doe', username: 'johndoe', href: '/app/profile/johndoe' },
              { name: 'Jane Smith', username: 'janesmith', href: '/app/profile/janesmith' },
            ].map((partner) => (
              <Link
                key={partner.href}
                href={partner.href}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-[#6b5d4a] hover:bg-[#f5f1eb] hover:text-[#5d4a2f] transition-colors"
              >
                <Users size={16} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#3d2817] truncate">{partner.name}</p>
                  <p className="text-xs text-[#6b5d4a]">@{partner.username}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Churches Section */}
        <div className="pt-4 border-t border-[#e8dfd0]">
          <h3 className="text-xs font-semibold text-[#6b5d4a] uppercase tracking-wide mb-3 px-4">Your Churches</h3>
          <div className="space-y-1">
            {[
              { name: 'Grace Community Church', href: '/app/church/grace-community' },
              { name: 'First Baptist Church', href: '/app/church/first-baptist' },
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
      </nav>

      {/* Create Button */}
      <div className="p-4 border-t border-[#d4c4b0]">
        <Link href="/app/create">
          <Button
            buttonType="primary"
            buttonSize="large"
            buttonText="Create"
            buttonIcon={<PenSquare size={18} />}
            iconPosition="left"
            className="w-full"
          />
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-[#d4c4b0]">
        <Link href="/app/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f5f1eb] transition-colors">
          <Avatar name="You" size="md" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[#3d2817] truncate">Your Profile</p>
            <p className="text-xs text-[#6b5d4a]">Level 5 • 1.2k Rep</p>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default DesktopSidebar;

