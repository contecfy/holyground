'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Globe, Calendar, Users, Search, Filter, Navigation } from 'lucide-react';
import Card from '@/components/ui/card';
import SearchBar from '@/components/ui/search-bar';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import Input from '@/components/ui/input';

interface Church {
  id: string;
  name: string;
  denomination: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
  website?: string;
  pastor: string;
  serviceTimes: string[];
  description: string;
  memberCount: number;
  distance?: number;
  image?: string;
  tags: string[];
}

const demoChurches: Church[] = [
  {
    id: '1',
    name: 'Grace Community Church',
    denomination: 'Non-Denominational',
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    phone: '(415) 555-0123',
    website: 'www.gracecommunity.org',
    pastor: 'Pastor John Davis',
    serviceTimes: ['Sunday 9:00 AM', 'Sunday 11:00 AM', 'Wednesday 7:00 PM'],
    description: 'A welcoming community focused on biblical teaching and authentic relationships. We believe in the power of God\'s word to transform lives.',
    memberCount: 450,
    distance: 2.3,
    tags: ['Contemporary Worship', 'Children\'s Ministry', 'Youth Group', 'Small Groups'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop'
  },
  {
    id: '2',
    name: 'First Baptist Church',
    denomination: 'Baptist',
    address: '456 Oak Avenue',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94103',
    phone: '(415) 555-0456',
    website: 'www.firstbaptist-sf.org',
    pastor: 'Rev. Sarah Mitchell',
    serviceTimes: ['Sunday 10:30 AM', 'Sunday 6:00 PM'],
    description: 'Traditional worship with a heart for missions. We are committed to spreading the gospel both locally and globally.',
    memberCount: 320,
    distance: 3.7,
    tags: ['Traditional Worship', 'Missions', 'Adult Bible Study', 'Choir'],
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&h=600&fit=crop'
  },
  {
    id: '3',
    name: 'Hope Presbyterian Church',
    denomination: 'Presbyterian',
    address: '789 Pine Street',
    city: 'Oakland',
    state: 'CA',
    zipCode: '94601',
    phone: '(510) 555-0789',
    website: 'www.hopepres.org',
    pastor: 'Dr. Michael Chen',
    serviceTimes: ['Sunday 9:00 AM', 'Sunday 10:45 AM'],
    description: 'Rooted in Reformed theology, we seek to glorify God through worship, discipleship, and service to our community.',
    memberCount: 280,
    distance: 8.2,
    tags: ['Reformed Theology', 'Community Outreach', 'Sunday School', 'Women\'s Ministry'],
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=600&fit=crop'
  },
  {
    id: '4',
    name: 'Living Word Church',
    denomination: 'Pentecostal',
    address: '321 Elm Boulevard',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    phone: '(415) 555-0321',
    website: 'www.livingword-sf.org',
    pastor: 'Pastor David Rodriguez',
    serviceTimes: ['Sunday 8:00 AM', 'Sunday 11:00 AM', 'Sunday 6:00 PM', 'Friday 7:00 PM'],
    description: 'A vibrant, Spirit-filled community passionate about worship, prayer, and seeing God move in powerful ways.',
    memberCount: 520,
    distance: 4.1,
    tags: ['Spirit-Filled', 'Prayer Ministry', 'Worship Team', 'Young Adults'],
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop'
  },
  {
    id: '5',
    name: 'Calvary Chapel',
    denomination: 'Calvary Chapel',
    address: '654 Maple Drive',
    city: 'Berkeley',
    state: 'CA',
    zipCode: '94704',
    phone: '(510) 555-0654',
    website: 'www.calvaryberkeley.org',
    pastor: 'Pastor James Wilson',
    serviceTimes: ['Sunday 10:00 AM', 'Sunday 6:00 PM'],
    description: 'Verse-by-verse Bible teaching in a casual, welcoming atmosphere. Come as you are and experience God\'s love.',
    memberCount: 380,
    distance: 12.5,
    tags: ['Bible Teaching', 'Casual Atmosphere', 'College Ministry', 'Coffee Shop'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
  },
];

const ChurchCard = ({ church }: { church: Church }) => {
  return (
    <Card variant="elevated" className="p-6 hover:shadow-xl transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Church Image */}
        {church.image && (
          <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden bg-[#f5f1eb] flex-shrink-0">
            <Image
              src={church.image}
              alt={church.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        {/* Church Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-2xl font-bold text-[#3d2817] mb-1">{church.name}</h3>
              <p className="text-sm text-[#6b5d4a]">{church.denomination}</p>
            </div>
            {church.distance && (
              <Badge variant="secondary" size="sm">
                {church.distance} mi
              </Badge>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-[#6b5d4a] text-sm mb-3">
            <MapPin size={16} />
            <span>{church.address}, {church.city}, {church.state} {church.zipCode}</span>
          </div>

          {/* Description */}
          <p className="text-[#3d2817] mb-4 line-clamp-2">{church.description}</p>

          {/* Service Times */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-[#6b5d4a]" />
              <span className="text-sm font-semibold text-[#3d2817]">Service Times</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {church.serviceTimes.map((time, index) => (
                <Badge key={index} variant="default" size="sm">
                  {time}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {church.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="primary" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Contact & Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-[#e8dfd0]">
            <div className="flex flex-wrap gap-4 text-sm text-[#6b5d4a]">
              {church.phone && (
                <div className="flex items-center gap-1">
                  <Phone size={14} />
                  <span>{church.phone}</span>
                </div>
              )}
              {church.website && (
                <div className="flex items-center gap-1">
                  <Globe size={14} />
                  <a href={`https://${church.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#5d4a2f]">
                    {church.website}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>{church.memberCount} members</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                buttonType="secondary"
                buttonVariant="outline"
                buttonSize="small"
                buttonIcon={<Navigation size={16} />}
                buttonText="Directions"
              />
              <Button
                buttonType="primary"
                buttonSize="small"
                buttonText="View Details"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function FindChurchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDenomination, setSelectedDenomination] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const denominations = ['All', 'Non-Denominational', 'Baptist', 'Presbyterian', 'Pentecostal', 'Calvary Chapel'];
  
  const filteredChurches = demoChurches.filter(church => {
    const matchesSearch = 
      church.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      church.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      church.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDenomination = 
      selectedDenomination === 'all' || 
      church.denomination.toLowerCase() === selectedDenomination.toLowerCase();
    
    return matchesSearch && matchesDenomination;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#3d2817] mb-2">Find a Church</h1>
        <p className="text-[#6b5d4a]">Discover churches in your area</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <SearchBar
              placeholder="Search by name, city, or keywords..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <Button
            buttonType="secondary"
            buttonVariant="outline"
            buttonIcon={<Filter size={18} />}
            buttonText="Filters"
            onClick={() => setShowFilters(!showFilters)}
          />
        </div>

        {/* Filter Options */}
        {showFilters && (
          <Card variant="paper" className="p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#3d2817] mb-2">
                  Denomination
                </label>
                <div className="flex flex-wrap gap-2">
                  {denominations.map((denom) => (
                    <Badge
                      key={denom}
                      variant={selectedDenomination === denom.toLowerCase() ? 'primary' : 'default'}
                      size="md"
                      className="cursor-pointer"
                      onClick={() => setSelectedDenomination(denom.toLowerCase())}
                    >
                      {denom}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="City"
                  placeholder="Enter city"
                  variant="filled"
                />
                <Input
                  label="State"
                  placeholder="Enter state"
                  variant="filled"
                />
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-[#6b5d4a]">
          Found <span className="font-semibold text-[#3d2817]">{filteredChurches.length}</span> churches
        </p>
      </div>

      {/* Church Listings */}
      <div className="space-y-4">
        {filteredChurches.length > 0 ? (
          filteredChurches.map((church) => (
            <ChurchCard key={church.id} church={church} />
          ))
        ) : (
          <Card variant="paper" className="p-12 text-center">
            <p className="text-[#6b5d4a] text-lg">No churches found matching your criteria.</p>
            <p className="text-[#6b5d4a] text-sm mt-2">Try adjusting your search or filters.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
