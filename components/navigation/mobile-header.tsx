"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HandHeart, Menu, Search } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";
import Image from "next/image";

const MobileHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-[#d4c4b0]">
        <div className="flex items-center h-14 justify-between px-4">
          <div className="flex items-center gap-2">
            {/* Menu Icon */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-[#6b5d4a] hover:text-[#5d4a2f] hover:bg-[#f5f1eb] rounded-md transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            {/* Platform Name */}
            <Link href="/app" className="flex items-center gap-2">
              <Image src="/logo.png" alt="yalor" width={40} height={40} />
              <h1 className="text-lg font-bold text-[#3d2817] tracking-wide">
                yalor
              </h1>
            </Link>
          </div>

          {/* Search & Avatar */}
          <div className="flex items-center gap-2">
            <Link
              href="/app/search"
              className="p-2 text-[#6b5d4a] hover:text-[#5d4a2f] hover:bg-[#f5f1eb] rounded-md transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </Link>

            <Link
              href="/app/donate"
              className="p-2 text-[#6b5d4a] hover:text-[#5d4a2f] hover:bg-[#f5f1eb] rounded-md transition-colors"
              aria-label="Donate"
            >
              <HandHeart size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
};

export default MobileHeader;
