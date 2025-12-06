"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  BookOpen,
  Heart,
  Users,
  Bell,
  Bookmark,
  Church,
  Settings,
  LogOut,
} from "lucide-react";
import Avatar from "../ui/avatar";
import { useMe } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useAuth";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const pathname = usePathname();
  const { data: user, isLoading: userLoading } = useMe();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    onClose();
  };

  // Only items NOT in bottom nav: Spaces, Notifications, Bookmarks
  const mainNavItems = [
    { label: "Spaces", icon: <BookOpen size={20} />, href: "/app/spaces" },
    {
      label: "Notifications",
      icon: <Bell size={20} />,
      href: "/app/notifications",
    },
    {
      label: "Bookmarks",
      icon: <Bookmark size={20} />,
      href: "/app/bookmarks",
    },
  ];

  // Mock user-specific data
  const userSpaces = [
    { name: "Bible Study Group", href: "/app/spaces/bible-study" },
    { name: "Prayer Warriors", href: "/app/spaces/prayer-warriors" },
    { name: "Young Adults", href: "/app/spaces/young-adults" },
  ];

  const prayerGroups = [
    { name: "Morning Prayer Circle", href: "/app/prayer/morning-circle" },
    { name: "Intercessory Prayer", href: "/app/prayer/intercessory" },
  ];

  const prayerPartners = [
    { name: "John Doe", username: "johndoe", href: "/app/profile/johndoe" },
    {
      name: "Jane Smith",
      username: "janesmith",
      href: "/app/profile/janesmith",
    },
  ];

  const churches = [
    { name: "Grace Community Church", href: "/app/church/grace-community" },
    { name: "First Baptist Church", href: "/app/church/first-baptist" },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-80 bg-white z-50 shadow-xl md:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto sidebar-scrollbar ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#d4c4b0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/app/profile" onClick={onClose}>
              {userLoading ? (
                <div className="w-10 h-10 rounded-full bg-[#e8dfd0] animate-pulse" />
              ) : (
                <Avatar
                  name={
                    user?.displayName ||
                    `${user?.firstName} ${user?.lastName}` ||
                    "User"
                  }
                  src={user?.avatar}
                  size="md"
                />
              )}
            </Link>
            {userLoading ? (
              <div className="flex-1">
                <div className="h-4 bg-[#e8dfd0] rounded animate-pulse mb-1 w-24" />
                <div className="h-3 bg-[#e8dfd0] rounded animate-pulse w-32" />
              </div>
            ) : (
              <div>
                <p className="font-semibold text-[#3d2817]">
                  {user?.displayName ||
                    `${user?.firstName} ${user?.lastName}` ||
                    "User"}
                </p>
                <p className="text-xs text-[#6b5d4a]">
                  @{user?.username || "username"} • Level {user?.level || 1} •{" "}
                  {(user?.reputation || 0).toLocaleString()} Rep
                </p>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#6b5d4a] hover:text-[#5d4a2f] hover:bg-[#f5f1eb] rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="p-4 space-y-1 border-b border-[#d4c4b0]">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#f5f1eb] text-[#5d4a2f] font-semibold"
                    : "text-[#6b5d4a] hover:bg-[#f5f1eb] hover:text-[#5d4a2f]"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Your Spaces */}
        <div className="p-4 border-b border-[#d4c4b0]">
          <h3 className="text-xs font-semibold text-[#6b5d4a] uppercase tracking-wide mb-3">
            Your Spaces
          </h3>
          <div className="space-y-1">
            {userSpaces.map((space) => (
              <Link
                key={space.href}
                href={space.href}
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[#6b5d4a] hover:bg-[#f5f1eb] hover:text-[#5d4a2f] transition-colors"
              >
                <BookOpen size={16} />
                <span>{space.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Prayer Groups */}
        <div className="p-4 border-b border-[#d4c4b0]">
          <h3 className="text-xs font-semibold text-[#6b5d4a] uppercase tracking-wide mb-3">
            Prayer Groups
          </h3>
          <div className="space-y-1">
            {prayerGroups.map((group) => (
              <Link
                key={group.href}
                href={group.href}
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[#6b5d4a] hover:bg-[#f5f1eb] hover:text-[#5d4a2f] transition-colors"
              >
                <Heart size={16} />
                <span>{group.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Prayer Partners */}
        <div className="p-4 border-b border-[#d4c4b0]">
          <h3 className="text-xs font-semibold text-[#6b5d4a] uppercase tracking-wide mb-3">
            Prayer Partners
          </h3>
          <div className="space-y-1">
            {prayerPartners.map((partner) => (
              <Link
                key={partner.href}
                href={partner.href}
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[#6b5d4a] hover:bg-[#f5f1eb] hover:text-[#5d4a2f] transition-colors"
              >
                <Users size={16} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#3d2817] truncate">
                    {partner.name}
                  </p>
                  <p className="text-xs text-[#6b5d4a]">@{partner.username}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Churches */}
        <div className="p-4 border-b border-[#d4c4b0]">
          <h3 className="text-xs font-semibold text-[#6b5d4a] uppercase tracking-wide mb-3">
            Your Churches
          </h3>
          <div className="space-y-1">
            {churches.map((church) => (
              <Link
                key={church.href}
                href={church.href}
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[#6b5d4a] hover:bg-[#f5f1eb] hover:text-[#5d4a2f] transition-colors"
              >
                <Church size={16} />
                <span>{church.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 pb-20 space-y-1">
          <Link
            href="/app/settings"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#6b5d4a] hover:bg-[#f5f1eb] hover:text-[#5d4a2f] transition-colors"
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#6b5d4a] hover:bg-[#f5f1eb] hover:text-[#5d4a2f] transition-colors w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut size={20} />
            <span>
              {logoutMutation.isPending ? "Logging out..." : "Log Out"}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
