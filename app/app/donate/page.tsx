'use client';

import React, { useState } from 'react';
import { Heart, Globe, Users, BookOpen, Check, ArrowRight, Shield } from 'lucide-react';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Badge from '@/components/ui/badge';

const DonatePage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const presetAmounts = [10, 25, 50, 100, 250, 500];

  const handleDonate = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (amount > 0 && donorName && donorEmail) {
      // TODO: Integrate with payment processor (Stripe, PayPal, etc.)
      console.log('Processing donation:', { amount, donorName, donorEmail, isRecurring });
      setShowThankYou(true);
    }
  };

  const getAmount = () => {
    return selectedAmount || (customAmount ? parseFloat(customAmount) : 0);
  };

  if (showThankYou) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card variant="elevated" className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-[#3d2817] mb-2">Thank You!</h2>
          <p className="text-[#6b5d4a] mb-6">
            Your generous donation helps us continue spreading the Gospel and building a community of believers.
          </p>
          <p className="text-sm text-[#6b5d4a] mb-6">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
          </p>
          <Button
            buttonType="primary"
            buttonText="Return Home"
            onClick={() => window.location.href = '/app'}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#3d2817] mb-3">Support HolyGround</h1>
        <p className="text-lg text-[#6b5d4a] max-w-2xl mx-auto">
          Help us build and grow this platform to reach more souls and spread the Gospel worldwide
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Mission Cards */}
        <Card variant="paper" className="p-6">
          <div className="w-12 h-12 bg-[#5d4a2f] rounded-lg flex items-center justify-center mb-4">
            <Globe size={24} className="text-white" />
          </div>
          <h3 className="font-bold text-[#3d2817] mb-2">Platform Development</h3>
          <p className="text-sm text-[#6b5d4a]">
            Building new features, improving user experience, and maintaining the platform
          </p>
        </Card>

        <Card variant="paper" className="p-6">
          <div className="w-12 h-12 bg-[#5d4a2f] rounded-lg flex items-center justify-center mb-4">
            <Users size={24} className="text-white" />
          </div>
          <h3 className="font-bold text-[#3d2817] mb-2">Reach More Souls</h3>
          <p className="text-sm text-[#6b5d4a]">
            Expanding our reach to connect believers worldwide and share God's Word
          </p>
        </Card>

        <Card variant="paper" className="p-6">
          <div className="w-12 h-12 bg-[#5d4a2f] rounded-lg flex items-center justify-center mb-4">
            <BookOpen size={24} className="text-white" />
          </div>
          <h3 className="font-bold text-[#3d2817] mb-2">Preach the Gospel</h3>
          <p className="text-sm text-[#6b5d4a]">
            Supporting Bible study resources, Q&A features, and faith-building content
          </p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Donation Form */}
        <Card variant="elevated" className="p-6">
          <h2 className="text-2xl font-bold text-[#3d2817] mb-6">Make a Donation</h2>

          {/* Amount Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#3d2817] mb-3">
              Select Amount
            </label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                    selectedAmount === amount
                      ? 'bg-[#5d4a2f] text-white'
                      : 'bg-[#f5f1eb] text-[#3d2817] hover:bg-[#e8dfd0]'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <Input
              placeholder="Custom amount"
              type="number"
              min="1"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              variant="filled"
              leftIcon={<span className="text-[#6b5d4a]">$</span>}
            />
          </div>

          {/* Donor Information */}
          <div className="space-y-4 mb-6">
            <Input
              label="Your Name"
              placeholder="John Doe"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              variant="filled"
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              variant="filled"
              required
            />
          </div>

          {/* Recurring Donation */}
          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-5 h-5 text-[#5d4a2f] rounded border-[#d4c4b0] focus:ring-[#8b6f47]"
              />
              <span className="text-sm text-[#3d2817]">
                Make this a monthly recurring donation
              </span>
            </label>
          </div>

          {/* Donate Button */}
          <Button
            buttonType="primary"
            buttonSize="large"
            buttonText={isRecurring ? `Donate $${getAmount()}/month` : `Donate $${getAmount()}`}
            buttonIcon={<Heart size={20} />}
            iconPosition="left"
            onClick={handleDonate}
            buttonDisabled={getAmount() <= 0 || !donorName || !donorEmail}
            className="w-full"
          />

          {/* Security Badge */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#6b5d4a]">
            <Shield size={16} />
            <span>Secure payment processing</span>
          </div>
        </Card>

        {/* Impact & Information */}
        <div className="space-y-6">
          {/* Impact Stats */}
          <Card variant="paper" className="p-6">
            <h3 className="font-bold text-[#3d2817] mb-4">Your Impact</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6b5d4a]">Platform Users</span>
                <Badge variant="primary" size="sm">10,000+</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6b5d4a]">Questions Answered</span>
                <Badge variant="primary" size="sm">50,000+</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6b5d4a]">Countries Reached</span>
                <Badge variant="primary" size="sm">100+</Badge>
              </div>
            </div>
          </Card>

          {/* Why Donate */}
          <Card variant="paper" className="p-6">
            <h3 className="font-bold text-[#3d2817] mb-4">Why Your Donation Matters</h3>
            <ul className="space-y-3 text-sm text-[#6b5d4a]">
              <li className="flex items-start gap-2">
                <Check size={16} className="text-[#5d4a2f] flex-shrink-0 mt-0.5" />
                <span>Keeps the platform free and accessible to all believers</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-[#5d4a2f] flex-shrink-0 mt-0.5" />
                <span>Enables us to add new features and improve user experience</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-[#5d4a2f] flex-shrink-0 mt-0.5" />
                <span>Supports server costs and infrastructure maintenance</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-[#5d4a2f] flex-shrink-0 mt-0.5" />
                <span>Helps us reach more people with the Gospel message</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-[#5d4a2f] flex-shrink-0 mt-0.5" />
                <span>Funds Bible study resources and educational content</span>
              </li>
            </ul>
          </Card>

          {/* Bible Verse */}
          <Card variant="outlined" className="p-6 bg-gradient-to-br from-[#f5f1eb] to-[#e8dfd0]">
            <p className="text-sm text-[#3d2817] italic mb-2">
              "Remember this: Whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously."
            </p>
            <p className="text-xs text-[#6b5d4a]">— 2 Corinthians 9:6</p>
          </Card>

          {/* Transparency */}
          <Card variant="paper" className="p-6">
            <h3 className="font-bold text-[#3d2817] mb-2">Transparency</h3>
            <p className="text-sm text-[#6b5d4a]">
              We are committed to using your donations responsibly. All funds go directly to platform development, 
              infrastructure costs, and expanding our mission to spread the Gospel.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
