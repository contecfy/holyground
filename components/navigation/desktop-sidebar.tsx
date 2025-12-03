'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, BookOpen, Bell, Bookmark, User, PenSquare } from 'lucide-react';
import Avatar from '../ui/avatar';
import Button from '../ui/button';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', icon: <Home size={20} />, href: '/app' },
  { label: 'Explore', icon: <Search size={20} />, href: '/app/explore' },
  { label: 'Spaces', icon: <BookOpen size={20} />, href: '/app/spaces' },
  { label: 'Notifications', icon: <Bell size={20} />, href: '/app/notifications' },
  { label: 'Bookmarks', icon: <Bookmark size={20} />, href: '/app/bookmarks' },
  { label: 'Profile', icon: <User size={20} />, href: '/app/profile' },
];

const DesktopSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-[#d4c4b0] bg-white">
      {/* Logo */}
      <div className="p-4 border-b border-[#d4c4b0]">
        <Link href="/app" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#5d4a2f] to-[#8b6f47] rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white text-xl font-bold">✝</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#3d2817] tracking-wide">HolyGround</h1>
            <p className="text-xs text-[#6b5d4a] -mt-1">Bible Q&A</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
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
      </nav>

      {/* Ask Button */}
      <div className="p-4 border-t border-[#d4c4b0]">
        <Link href="/app/ask">
          <Button
            buttonType="primary"
            buttonSize="large"
            buttonText="Ask Question"
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

