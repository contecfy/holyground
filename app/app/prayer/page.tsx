"use client";

import React, { useState } from "react";
import { Users, Heart, Radio, UserPlus } from "lucide-react";
import SearchBar from "@/components/ui/search-bar";
import Button from "@/components/ui/button";
import {
  demoPrayerGroups,
  demoLivePrayers,
  demoPrayerPartners,
} from "@/lib/prayer-data";

import {
  PrayerGroupCard,
  PrayerPartnerCard,
  LivePrayerCard,
} from "@/components/custom";

export default function PrayerPage() {
  const [activeTab, setActiveTab] = useState<"groups" | "live" | "partners">(
    "groups"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGroups = demoPrayerGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#3d2817] mb-2">
          Join Prayer
        </h1>
        <p className="text-sm md:text-base text-[#6b5d4a]">
          Connect with others in prayer and intercession
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 hidden md:block">
        <div className="border-b border-[#e8dfd0] overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-2 md:gap-4 w-max md:w-full md:min-w-0">
            <button
              onClick={() => setActiveTab("groups")}
              className={`px-2 md:px-4 py-2 md:py-3 font-medium transition-colors border-b-2 whitespace-nowrap flex-shrink-0 ${
                activeTab === "groups"
                  ? "border-[#5d4a2f] text-[#5d4a2f]"
                  : "border-transparent text-[#6b5d4a] hover:text-[#5d4a2f]"
              }`}
            >
              <div className="flex items-center gap-1.5 md:gap-2">
                <Users size={16} className="md:w-[18px] md:h-[18px]" />
                <span className="text-sm md:text-base">Find Prayer Group</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("live")}
              className={`px-2 md:px-4 py-2 md:py-3 font-medium transition-colors border-b-2 whitespace-nowrap flex-shrink-0 ${
                activeTab === "live"
                  ? "border-[#5d4a2f] text-[#5d4a2f]"
                  : "border-transparent text-[#6b5d4a] hover:text-[#5d4a2f]"
              }`}
            >
              <div className="flex items-center gap-1.5 md:gap-2">
                <Radio size={16} className="md:w-[18px] md:h-[18px]" />
                <span className="text-sm md:text-base">Live Prayer</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("partners")}
              className={`px-2 md:px-4 py-2 md:py-3 font-medium transition-colors border-b-2 whitespace-nowrap flex-shrink-0 ${
                activeTab === "partners"
                  ? "border-[#5d4a2f] text-[#5d4a2f]"
                  : "border-transparent text-[#6b5d4a] hover:text-[#5d4a2f]"
              }`}
            >
              <div className="flex items-center gap-1.5 md:gap-2">
                <UserPlus size={16} className="md:w-[18px] md:h-[18px]" />
                <span className="text-sm md:text-base">
                  Find Prayer Partner
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "groups" && (
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

      {activeTab === "live" && (
        <div>
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg md:text-xl font-bold text-[#3d2817] mb-1">
                Active Prayer Requests
              </h2>
              <p className="text-sm text-[#6b5d4a]">
                Join others in praying for these needs
              </p>
            </div>
            <Button
              buttonType="primary"
              buttonIcon={<Heart size={18} />}
              buttonText="Post Prayer Request"
              className="w-full sm:w-auto flex-shrink-0"
            />
          </div>
          <div className="space-y-4">
            {demoLivePrayers.map((prayer) => (
              <LivePrayerCard key={prayer.id} prayer={prayer} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "partners" && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#3d2817] mb-1">
              Find a Prayer Partner
            </h2>
            <p className="text-sm text-[#6b5d4a]">
              Connect with someone for regular prayer and accountability
            </p>
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
