'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Users, Heart, Clock, MapPin, Search, Radio, UserPlus, MessageCircle, Calendar } from 'lucide-react';
import Card from '@/components/ui/card';
import SearchBar from '@/components/ui/search-bar';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import Avatar from '@/components/ui/avatar';

interface PrayerGroup {
  id: string;
  name: string;
  description: string;
  leader: string;
  memberCount: number;
  meetingTime: string;
  location: string;
  tags: string[];
  image?: string;
}

interface LivePrayer {
  id: string;
  requester: {
    name: string;
    avatar?: string;
  };
  request: string;
  timestamp: string;
  prayerCount: number;
  isUrgent: boolean;
}

interface PrayerPartner {
  id: string;
  name: string;
  avatar?: string;
  location: string;
  interests: string[];
  availability: string;
  bio: string;
}

const demoPrayerGroups: PrayerGroup[] = [
  {
    id: '1',
    name: 'Morning Prayer Warriors',
    description: 'Join us every morning for powerful prayer and intercession. We pray for our community, nation, and personal needs.',
    leader: 'Pastor Sarah Mitchell',
    memberCount: 45,
    meetingTime: 'Daily 6:00 AM',
    location: 'Online & In-Person',
    tags: ['Intercession', 'Morning', 'Community'],
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop'
  },
  {
    id: '2',
    name: 'Youth Prayer Circle',
    description: 'A vibrant prayer group for young adults (18-30) seeking God together through worship and prayer.',
    leader: 'David Rodriguez',
    memberCount: 32,
    meetingTime: 'Friday 7:00 PM',
    location: 'San Francisco, CA',
    tags: ['Youth', 'Worship', 'Fellowship'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
  },
  {
    id: '3',
    name: 'Women\'s Intercession',
    description: 'A safe space for women to come together in prayer, supporting each other through life\'s challenges.',
    leader: 'Elizabeth Thompson',
    memberCount: 28,
    meetingTime: 'Tuesday 10:00 AM',
    location: 'Oakland, CA',
    tags: ['Women', 'Support', 'Intercession'],
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&h=600&fit=crop'
  },
  {
    id: '4',
    name: '24/7 Prayer Room',
    description: 'Continuous prayer coverage. Sign up for time slots to maintain unceasing prayer for our city.',
    leader: 'Rev. James Wilson',
    memberCount: 120,
    meetingTime: '24/7',
    location: 'Online',
    tags: ['24/7', 'Intercession', 'City'],
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=600&fit=crop'
  },
];

const demoLivePrayers: LivePrayer[] = [
  {
    id: '1',
    requester: {
      name: 'Sarah M.',
      avatar: undefined
    },
    request: 'Please pray for my father who is undergoing surgery tomorrow. He has been diagnosed with cancer and we need God\'s healing touch.',
    timestamp: '2 minutes ago',
    prayerCount: 24,
    isUrgent: true
  },
  {
    id: '2',
    requester: {
      name: 'Michael C.',
      avatar: undefined
    },
    request: 'Praying for wisdom in a major career decision. I have two job offers and need God\'s guidance on which path to take.',
    timestamp: '15 minutes ago',
    prayerCount: 12,
    isUrgent: false
  },
  {
    id: '3',
    requester: {
      name: 'Jessica L.',
      avatar: undefined
    },
    request: 'My marriage is struggling. Please pray for restoration, healing, and God\'s love to fill our home again.',
    timestamp: '1 hour ago',
    prayerCount: 45,
    isUrgent: true
  },
  {
    id: '4',
    requester: {
      name: 'Robert K.',
      avatar: undefined
    },
    request: 'Praying for my daughter who is struggling with anxiety and depression. She needs God\'s peace and healing.',
    timestamp: '2 hours ago',
    prayerCount: 38,
    isUrgent: false
  },
];

const demoPrayerPartners: PrayerPartner[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    location: 'San Francisco, CA',
    interests: ['Intercession', 'Healing', 'Family'],
    availability: 'Morning & Evening',
    bio: 'Looking for a prayer partner to pray together regularly. I\'m passionate about intercession and seeing God move in our city.',
  },
  {
    id: '2',
    name: 'David Rodriguez',
    location: 'Oakland, CA',
    interests: ['Worship', 'Youth Ministry', 'Missions'],
    availability: 'Evening',
    bio: 'Seeking a prayer partner for accountability and mutual encouragement in our walk with God.',
  },
  {
    id: '3',
    name: 'Emma Johnson',
    location: 'Berkeley, CA',
    interests: ['Healing', 'Deliverance', 'Spiritual Growth'],
    availability: 'Flexible',
    bio: 'Looking for someone to pray with regularly, especially for breakthrough in spiritual warfare.',
  },
];

const PrayerGroupCard = ({ group }: { group: PrayerGroup }) => {
  return (
    <Card variant="elevated" className="p-6 hover:shadow-xl transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        {group.image && (
          <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden bg-[#f5f1eb] flex-shrink-0">
            <Image
              src={group.image}
              alt={group.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-[#3d2817] mb-2">{group.name}</h3>
          <p className="text-[#6b5d4a] mb-4">{group.description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-[#6b5d4a]">
              <Users size={16} />
              <span>Led by {group.leader}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6b5d4a]">
              <Clock size={16} />
              <span>{group.meetingTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6b5d4a]">
              <MapPin size={16} />
              <span>{group.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6b5d4a]">
              <Users size={16} />
              <span>{group.memberCount} members</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {group.tags.map((tag) => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          <Button
            buttonType="primary"
            buttonSize="medium"
            buttonText="Join Group"
            className="w-full md:w-auto"
          />
        </div>
      </div>
    </Card>
  );
};

const LivePrayerCard = ({ prayer }: { prayer: LivePrayer }) => {
  return (
    <Card variant="paper" className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <Avatar name={prayer.requester.name} size="sm" src={prayer.requester.avatar} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-[#3d2817]">{prayer.requester.name}</p>
            <span className="text-xs text-[#6b5d4a]">• {prayer.timestamp}</span>
            {prayer.isUrgent && (
              <Badge variant="danger" size="sm">
                Urgent
              </Badge>
            )}
          </div>
          <p className="text-[#3d2817] mb-3">{prayer.request}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-[#6b5d4a]">
              <div className="flex items-center gap-1">
                <Heart size={16} />
                <span>{prayer.prayerCount} praying</span>
              </div>
            </div>
            <Button
              buttonType="secondary"
              buttonVariant="outline"
              buttonSize="small"
              buttonIcon={<Heart size={16} />}
              buttonText="Pray Now"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

const PrayerPartnerCard = ({ partner }: { partner: PrayerPartner }) => {
  return (
    <Card variant="elevated" className="p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <Avatar name={partner.name} size="lg" src={partner.avatar} />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#3d2817] mb-1">{partner.name}</h3>
          <div className="flex items-center gap-2 text-sm text-[#6b5d4a] mb-2">
            <MapPin size={14} />
            <span>{partner.location}</span>
          </div>
          <p className="text-[#3d2817] mb-3">{partner.bio}</p>
          
          <div className="mb-3">
            <p className="text-sm font-semibold text-[#3d2817] mb-2">Interests:</p>
            <div className="flex flex-wrap gap-2">
              {partner.interests.map((interest) => (
                <Badge key={interest} variant="primary" size="sm">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#6b5d4a] mb-4">
            <Clock size={14} />
            <span>Available: {partner.availability}</span>
          </div>

          <Button
            buttonType="primary"
            buttonSize="medium"
            buttonIcon={<UserPlus size={16} />}
            buttonText="Connect"
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
};

export default function PrayerPage() {
  const [activeTab, setActiveTab] = useState<'groups' | 'live' | 'partners'>('groups');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = demoPrayerGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#3d2817] mb-2">Join Prayer</h1>
        <p className="text-[#6b5d4a]">Connect with others in prayer and intercession</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-[#e8dfd0]">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'groups'
                ? 'border-[#5d4a2f] text-[#5d4a2f]'
                : 'border-transparent text-[#6b5d4a] hover:text-[#5d4a2f]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span>Find Prayer Group</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'live'
                ? 'border-[#5d4a2f] text-[#5d4a2f]'
                : 'border-transparent text-[#6b5d4a] hover:text-[#5d4a2f]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Radio size={18} />
              <span>Live Prayer</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'partners'
                ? 'border-[#5d4a2f] text-[#5d4a2f]'
                : 'border-transparent text-[#6b5d4a] hover:text-[#5d4a2f]'
            }`}
          >
            <div className="flex items-center gap-2">
              <UserPlus size={18} />
              <span>Find Prayer Partner</span>
            </div>
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'groups' && (
        <div>
          <div className="mb-6">
            <SearchBar
              placeholder="Search prayer groups..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <div className="space-y-4">
            {filteredGroups.map((group) => (
              <PrayerGroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'live' && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#3d2817] mb-1">Active Prayer Requests</h2>
              <p className="text-sm text-[#6b5d4a]">Join others in praying for these needs</p>
            </div>
            <Button
              buttonType="primary"
              buttonIcon={<Heart size={18} />}
              buttonText="Post Prayer Request"
            />
          </div>
          <div className="space-y-4">
            {demoLivePrayers.map((prayer) => (
              <LivePrayerCard key={prayer.id} prayer={prayer} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'partners' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#3d2817] mb-1">Find a Prayer Partner</h2>
            <p className="text-sm text-[#6b5d4a]">Connect with someone for regular prayer and accountability</p>
          </div>
          <div className="space-y-4">
            {demoPrayerPartners.map((partner) => (
              <PrayerPartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

