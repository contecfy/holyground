"use client";

import React, { useState, useMemo } from "react";
import { X, MapPin, Phone, Users, Search } from "lucide-react";
import Link from "next/link";
import ChurchCard, { Church } from "@/components/common/church-card";
import ChurchMap from "@/components/common/church-map";
import ChurchFilters from "@/components/common/church-filters";
import Input from "@/components/ui/input";
import Card from "@/components/ui/card";

// Kampala, Uganda coordinates: 0.3476° N, 32.5825° E
const KAMPALA_CENTER = { lat: 0.3476, lng: 32.5825 };

// Mock church data - replace with actual API call
const mockChurches: Church[] = [
  {
    id: "1",
    name: "Grace Community Church",
    denomination: "Non-denominational",
    address: "Plot 15, Nakasero Road",
    city: "Kampala",
    state: "Central",
    zipCode: "256",
    phone: "+256 700 123 456",
    website: "https://gracecommunity.example.com",
    description:
      "A welcoming community focused on biblical teaching and authentic relationships.",
    memberCount: 450,
    serviceTimes: ["Sunday: 9:00 AM & 11:00 AM", "Wednesday: 7:00 PM"],
    latitude: 0.3476,
    longitude: 32.5825,
    distance: 2.3,
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=400&fit=crop",
  },
  {
    id: "2",
    name: "First Baptist Church",
    denomination: "Baptist",
    address: "Kampala Road, Near City Square",
    city: "Kampala",
    state: "Central",
    zipCode: "256",
    phone: "+256 700 234 567",
    website: "https://firstbaptist.example.com",
    description: "Serving the community with love and spreading the Gospel.",
    memberCount: 320,
    serviceTimes: ["Sunday: 10:30 AM", "Sunday: 6:00 PM"],
    latitude: 0.335,
    longitude: 32.58,
    distance: 3.1,
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=400&fit=crop",
  },
  {
    id: "3",
    name: "St. Mary's Catholic Church",
    denomination: "Catholic",
    address: "Rubaga Hill",
    city: "Kampala",
    state: "Central",
    zipCode: "256",
    phone: "+256 700 345 678",
    memberCount: 850,
    serviceTimes: ["Sunday: 8:00 AM, 10:00 AM, 12:00 PM", "Daily: 7:00 AM"],
    latitude: 0.31,
    longitude: 32.55,
    distance: 4.5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: "4",
    name: "Hope Methodist Church",
    denomination: "Methodist",
    address: "Kololo Hill",
    city: "Kampala",
    state: "Central",
    zipCode: "256",
    phone: "+256 700 456 789",
    website: "https://hopemethodist.example.com",
    description:
      "Building hope and faith in our community through worship and service.",
    memberCount: 280,
    serviceTimes: ["Sunday: 9:30 AM", "Wednesday: 6:30 PM"],
    latitude: 0.33,
    longitude: 32.59,
    distance: 5.2,
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&h=400&fit=crop",
  },
  {
    id: "5",
    name: "Calvary Presbyterian",
    denomination: "Presbyterian",
    address: "Ntinda",
    city: "Kampala",
    state: "Central",
    zipCode: "256",
    phone: "+256 700 567 890",
    memberCount: 195,
    serviceTimes: ["Sunday: 10:00 AM"],
    latitude: 0.36,
    longitude: 32.6,
    distance: 6.8,
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=400&fit=crop",
  },
];

export default function FindChurchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDenomination, setSelectedDenomination] = useState<
    string | null
  >(null);
  const [showMap, setShowMap] = useState(false);
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);

  // Filter churches
  const filteredChurches = useMemo(() => {
    return mockChurches.filter((church) => {
      const matchesSearch =
        searchQuery === "" ||
        church.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        church.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        church.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDenomination =
        !selectedDenomination || church.denomination === selectedDenomination;

      return matchesSearch && matchesDenomination;
    });
  }, [searchQuery, selectedDenomination]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#3d2817] mb-2">
          Find a Church
        </h1>
        <p className="text-[#6b5d4a]">
          Discover churches in your area and connect with local believers
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
        {/* Left Column - Filters (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-4">
            <Card variant="paper" className="p-4">
              <ChurchFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedDenomination={selectedDenomination}
                onDenominationChange={setSelectedDenomination}
                showMap={showMap}
                onToggleMap={() => {
                  setShowMap(!showMap);
                  if (showMap) {
                    setSelectedChurch(null);
                  }
                }}
              />
            </Card>
          </div>
        </div>

        {/* Middle Column - Filters (Mobile) & Church List */}
        <div className="lg:col-span-4 space-y-3 md:space-y-4 lg:space-y-6 w-full min-w-0">
          {/* Filters - Mobile Only */}
          <div className="lg:hidden space-y-3">
            {/* Search Input and Show Map on same line */}
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Search churches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  variant="filled"
                  leftIcon={<Search size={18} className="text-[#6b5d4a]" />}
                />
              </div>
              <button
                onClick={() => {
                  setShowMap(!showMap);
                  if (showMap) {
                    setSelectedChurch(null);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                  showMap
                    ? "bg-[#5d4a2f] text-white"
                    : "bg-[#f5f1eb] text-[#6b5d4a] hover:bg-[#e8dfd0]"
                }`}
              >
                <MapPin size={16} />
                {showMap ? "Hide Map" : "Show Map"}
              </button>
            </div>

            {/* Header Row: Church label */}
            <div>
              <h2 className="text-lg font-semibold text-[#3d2817]">Church</h2>
            </div>

            {/* Scrollable Filter Chips */}
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
              <div className="flex gap-2 w-max min-w-full">
                {[
                  "Baptist",
                  "Catholic",
                  "Methodist",
                  "Presbyterian",
                  "Lutheran",
                  "Pentecostal",
                  "Anglican",
                  "Non-denominational",
                  "Other",
                ].map((denom) => (
                  <button
                    key={denom}
                    onClick={() =>
                      setSelectedDenomination(
                        selectedDenomination === denom ? null : denom
                      )
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedDenomination === denom
                        ? "bg-[#5d4a2f] text-white"
                        : "bg-[#f5f1eb] text-[#6b5d4a] hover:bg-[#e8dfd0]"
                    }`}
                  >
                    {denom}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-[#6b5d4a]">
            Found {filteredChurches.length}{" "}
            {filteredChurches.length === 1 ? "church" : "churches"}
          </div>

          {/* Church List */}
          <div className="space-y-2 md:space-y-3 lg:space-y-4">
            {filteredChurches.length > 0 ? (
              <>
                {/* Desktop: Cards with onClick for preview */}
                {filteredChurches.map((church) => (
                  <div
                    key={`desktop-${church.id}`}
                    className={`hidden lg:block ${selectedChurch?.id === church.id ? "ring-2 ring-[#8b6f47] rounded-lg" : ""}`}
                  >
                    <ChurchCard
                      church={church}
                      onClick={() => setSelectedChurch(church)}
                    />
                  </div>
                ))}
                {/* Mobile: Cards without onClick (use Link) */}
                {filteredChurches.map((church) => (
                  <div key={`mobile-${church.id}`} className="lg:hidden">
                    <ChurchCard church={church} />
                  </div>
                ))}
              </>
            ) : (
              <Card variant="paper" className="p-8 text-center">
                <p className="text-[#6b5d4a]">
                  No churches found. Try adjusting your filters.
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Right Column - Map with All Churches (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-5">
          <div className="sticky top-4 space-y-4">
            {/* Map showing all churches */}
            <Card variant="paper" className="p-4">
              <h3 className="text-lg font-semibold text-[#3d2817] mb-3">
                Map View
              </h3>
              <div className="h-[calc(100vh-16rem)] rounded-lg overflow-hidden border border-[#e8dfd0]">
                <ChurchMap
                  churches={filteredChurches}
                  center={KAMPALA_CENTER}
                  selectedChurch={selectedChurch}
                  onChurchClick={setSelectedChurch}
                  className="h-full w-full"
                />
              </div>
            </Card>

            {/* Church Detail Preview - Shows when a church is selected */}
            {selectedChurch && (
              <Card variant="paper" className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-[#3d2817]">
                    Church Details
                  </h3>
                  <button
                    onClick={() => setSelectedChurch(null)}
                    className="text-[#6b5d4a] hover:text-[#5d4a2f] text-sm"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  <div>
                    <h4 className="font-bold text-[#3d2817] mb-1">
                      {selectedChurch.name}
                    </h4>
                    {selectedChurch.denomination && (
                      <span className="text-xs text-[#6b5d4a] bg-[#f5f1eb] px-2 py-1 rounded">
                        {selectedChurch.denomination}
                      </span>
                    )}
                  </div>
                  {selectedChurch.description && (
                    <p className="text-sm text-[#6b5d4a]">
                      {selectedChurch.description}
                    </p>
                  )}
                  <div className="text-sm text-[#6b5d4a] space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#8b6f47]" />
                      <span>
                        {selectedChurch.address}, {selectedChurch.city}
                      </span>
                    </div>
                    {selectedChurch.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-[#8b6f47]" />
                        <span>{selectedChurch.phone}</span>
                      </div>
                    )}
                    {selectedChurch.memberCount && (
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-[#8b6f47]" />
                        <span>
                          {selectedChurch.memberCount.toLocaleString()} members
                        </span>
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/app/church/${selectedChurch.id}`}
                    className="block text-sm text-[#8b6f47] hover:text-[#5d4a2f] hover:underline font-medium"
                  >
                    View full details →
                  </Link>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Map Modal */}
      {showMap && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="h-full flex flex-col">
            {/* Map Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#e8dfd0] bg-white">
              <h2 className="text-xl font-bold text-[#3d2817]">
                Map View - Kampala, Uganda
              </h2>
              <button
                onClick={() => {
                  setShowMap(false);
                  setSelectedChurch(null);
                }}
                className="p-2 text-[#6b5d4a] hover:text-[#5d4a2f] hover:bg-[#f5f1eb] rounded-lg transition-colors"
                aria-label="Close map"
              >
                <X size={24} />
              </button>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative">
              <ChurchMap
                churches={filteredChurches}
                center={KAMPALA_CENTER}
                selectedChurch={selectedChurch}
                onChurchClick={setSelectedChurch}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
