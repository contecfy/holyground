'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isEmailMode, setIsEmailMode] = useState(false);

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth
    console.log('Sign in with Google');
  };

  const handleEmailSignIn = () => {
    if (email.trim()) {
      // TODO: Implement email sign in
      console.log('Sign in with email:', email);
    }
  };

  const handleContinueWithEmail = () => {
    if (email.trim()) {
      setIsEmailMode(true);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#5d4a2f] to-[#8b6f47] rounded-lg flex items-center justify-center shadow-md mb-4">
            <span className="text-white text-3xl font-bold">✝</span>
          </div>
          <h1 className="text-2xl font-bold text-[#3d2817] tracking-wide">HolyGround</h1>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg">
          <h2 className="text-2xl font-semibold text-[#3d2817] mb-2 text-center">
            {isEmailMode ? 'Welcome back' : 'Welcome back'}
          </h2>
          <p className="text-sm text-[#6b5d4a] mb-8 text-center">
            {isEmailMode 
              ? 'Enter your email to continue' 
              : 'Sign in to continue to HolyGround'}
          </p>

          {!isEmailMode ? (
            <div className="space-y-3">
              {/* Google Sign In Button */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#d4c4b0] rounded-lg hover:bg-[#f5f1eb] transition-colors text-[#3d2817] font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#e8dfd0]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-[#6b5d4a]">or</span>
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="default"
                  className="w-full"
                />
                <Button
                  buttonType="primary"
                  buttonSize="large"
                  buttonText="Continue"
                  buttonIcon={<Mail size={18} />}
                  iconPosition="left"
                  onClick={handleContinueWithEmail}
                  buttonDisabled={!email.trim()}
                  className="w-full"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-[#f5f1eb] rounded-lg border border-[#e8dfd0]">
                <p className="text-sm text-[#3d2817] font-medium mb-1">{email}</p>
                <button
                  onClick={() => setIsEmailMode(false)}
                  className="text-xs text-[#6b5d4a] hover:text-[#5d4a2f] underline"
                >
                  Change
                </button>
              </div>

              <Input
                type="password"
                placeholder="Password"
                variant="default"
                className="w-full"
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#5d4a2f] rounded border-[#d4c4b0] focus:ring-[#8b6f47]"
                  />
                  <span className="text-[#6b5d4a]">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-[#5d4a2f] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                buttonType="primary"
                buttonSize="large"
                buttonText="Sign in"
                onClick={handleEmailSignIn}
                className="w-full"
              />

              <div className="text-center">
                <button
                  onClick={() => setIsEmailMode(false)}
                  className="text-sm text-[#6b5d4a] hover:text-[#5d4a2f] underline"
                >
                  ← Back
                </button>
              </div>
            </div>
          )}

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#6b5d4a]">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#5d4a2f] hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#6b5d4a]">
            <Link href="/terms" className="hover:text-[#5d4a2f] hover:underline">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-[#5d4a2f] hover:underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#5d4a2f] hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

