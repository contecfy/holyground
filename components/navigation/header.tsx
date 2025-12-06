"use client";

import React from "react";
import Link from "next/link";
import Button from "../ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#faf8f5]/95 backdrop-blur-sm border-b border-[#d4c4b0] shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="yalor" width={60} height={60} />
            <div>
              <h1 className="text-2xl font-bold text-[#3d2817] tracking-wide">
                yalor
              </h1>
              <p className="text-xs text-[#6b5d4a] -mt-1">
                A Bible Social Community
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/feature"
              className="text-[#6b5d4a] hover:text-[#5d4a2f] font-medium transition-colors"
            >
              Features
            </Link>
            <a
              href="#how-it-works"
              className="text-[#6b5d4a] hover:text-[#5d4a2f] font-medium transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-[#6b5d4a] hover:text-[#5d4a2f] font-medium transition-colors"
            >
              Community
            </a>
            <Link
              href="/about"
              className="text-[#6b5d4a] hover:text-[#5d4a2f] font-medium transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                buttonType="secondary"
                buttonVariant="outline"
                buttonSize="small"
                buttonText="Sign In"
              />
            </Link>
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
