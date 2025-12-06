"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Church, PenSquare, Heart, MessageCircle, Search } from "lucide-react";
import { useScrollDirection } from "@/hooks/use-scroll-direction";

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
  { label: "Create", icon: <PenSquare size={20} />, href: "/app/create" },
  { label: "Prayer", icon: <Heart size={20} />, href: "/app/prayer" },
  { label: "Chat", icon: <MessageCircle size={20} />, href: "/app/chat" },
];

const MobileBottomNav = () => {
  const pathname = usePathname();
  const isVisible = useScrollDirection();

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#d4c4b0] md:hidden transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/app" &&
              pathname?.startsWith("/app") &&
              pathname === "/app");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? "text-[#5d4a2f]" : "text-[gray] hover:text-[#5d4a2f]"
              }`}
            >
              <span className="mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#5d4a2f] rounded-b-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
