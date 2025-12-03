'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../ui/button';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#faf8f5]/95 backdrop-blur-sm border-b border-[#d4c4b0] shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#5d4a2f] to-[#8b6f47] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white text-xl font-bold">✝</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#3d2817] tracking-wide">HolyGround</h1>
              <p className="text-xs text-[#6b5d4a] -mt-1">A Bible Social Community</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-[#6b5d4a] hover:text-[#5d4a2f] font-medium transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-[#6b5d4a] hover:text-[#5d4a2f] font-medium transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-[#6b5d4a] hover:text-[#5d4a2f] font-medium transition-colors">
              Community
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              buttonType="secondary"
              buttonVariant="outline"
              buttonSize="small"
              buttonText="Sign In"
            />
            <Link href="/app">
              <Button
                buttonType="primary"
                buttonSize="small"
                buttonText="Join"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
