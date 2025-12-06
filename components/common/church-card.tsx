"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Globe,
  Users,
  Calendar,
  ExternalLink,
} from "lucide-react";
import Card from "../ui/card";
import Badge from "../ui/badge";

export interface Church {
  id: string;
  name: string;
  denomination?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
  website?: string;
  description?: string;
  memberCount?: number;
  serviceTimes?: string[];
  latitude: number;
  longitude: number;
  distance?: number; // in miles/km
  image?: string; // Profile picture URL
}

interface ChurchCardProps {
  church: Church;
  onClick?: () => void;
}

const ChurchCard = ({ church, onClick }: ChurchCardProps) => {
  const fullAddress = `${church.address}, ${church.city}, ${church.state} ${church.zipCode}`;

  const cardContent = (
    <Card
      variant="paper"
      className="hover:shadow-md transition-all cursor-pointer !p-0 overflow-hidden rounded-lg"
      onClick={onClick}
    >
      {/* Mobile: Full Height Image Layout */}
      <div className="md:hidden">
        <div className="flex gap-0 min-h-[120px]">
          {/* Church Image - Full Height on Mobile, No Padding */}
          <div className="flex-shrink-0 w-24 rounded-l-lg overflow-hidden">
            {church.image ? (
              <div className="w-full h-full min-h-[120px] bg-[#f5f1eb]">
                <Image
                  src={church.image}
                  alt={church.name}
                  width={96}
                  height={120}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full min-h-[120px] bg-gradient-to-br from-[#5d4a2f] to-[#8b6f47] flex items-center justify-center">
                <span className="text-white text-3xl">⛪</span>
              </div>
            )}
          </div>

          {/* Church Info - Right Side */}
          <div className="flex-1 min-w-0 p-3 flex flex-col">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-[#3d2817] mb-1 truncate leading-tight">
                  {church.name}
                </h3>
                {church.denomination && (
                  <Badge
                    variant="secondary"
                    size="sm"
                    className="text-[10px] px-1.5 py-0.5"
                  >
                    {church.denomination}
                  </Badge>
                )}
              </div>
              {church.distance && (
                <span className="text-[10px] text-[#6b5d4a] font-medium flex-shrink-0 whitespace-nowrap">
                  {church.distance.toFixed(1)} mi
                </span>
              )}
            </div>

            <div className="space-y-1.5 mt-auto">
              <div className="flex items-center gap-1.5 text-[11px] text-[#6b5d4a]">
                <MapPin size={11} className="flex-shrink-0 text-[#8b6f47]" />
                <span className="truncate">
                  {church.city}, {church.state}
                </span>
              </div>
              {church.memberCount && (
                <div className="flex items-center gap-1 text-[11px] text-[#6b5d4a]">
                  <Users size={11} className="text-[#8b6f47] flex-shrink-0" />
                  <span className="truncate">
                    {church.memberCount.toLocaleString()} members
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Full Details */}
      <div className="hidden md:block">
        <div className="flex gap-0 min-h-[200px]">
          {/* Church Image - Full Height */}
          <div className="flex-shrink-0 w-48">
            {church.image ? (
              <div className="w-full h-full min-h-[200px] overflow-hidden bg-[#f5f1eb]">
                <Image
                  src={church.image}
                  alt={church.name}
                  width={192}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full min-h-[200px] bg-gradient-to-br from-[#5d4a2f] to-[#8b6f47] flex items-center justify-center">
                <span className="text-white text-5xl">⛪</span>
              </div>
            )}
          </div>

          {/* Church Info - Right Side */}
          <div className="flex-1 min-w-0 p-4 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-[#3d2817] mb-2 truncate">
                  {church.name}
                </h3>
                {church.denomination && (
                  <Badge variant="secondary" size="sm" className="mb-2">
                    {church.denomination}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                {church.distance && (
                  <span className="text-sm text-[#6b5d4a] font-medium">
                    {church.distance.toFixed(1)} mi
                  </span>
                )}
                {onClick && (
                  <Link
                    href={`/app/church/${church.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-[#6b5d4a] hover:text-[#5d4a2f] hover:bg-[#f5f1eb] rounded-lg transition-colors"
                    aria-label="View church details"
                    title="View details"
                  >
                    <ExternalLink size={18} />
                  </Link>
                )}
              </div>
            </div>
            {church.description && (
              <p className="text-sm text-[#6b5d4a] line-clamp-2 mb-4">
                {church.description}
              </p>
            )}

            {/* Details */}
            <div className="space-y-2 mt-auto">
              <div className="flex items-start gap-2 text-sm text-[#6b5d4a]">
                <MapPin
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-[#8b6f47]"
                />
                <span className="flex-1">{fullAddress}</span>
              </div>

              {church.phone && (
                <div className="flex items-center gap-2 text-sm text-[#6b5d4a]">
                  <Phone size={16} className="text-[#8b6f47]" />
                  {onClick ? (
                    <a
                      href={`tel:${church.phone}`}
                      className="hover:text-[#5d4a2f] hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {church.phone}
                    </a>
                  ) : (
                    <span
                      className="hover:text-[#5d4a2f] hover:underline cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = `tel:${church.phone}`;
                      }}
                    >
                      {church.phone}
                    </span>
                  )}
                </div>
              )}

              {church.website && (
                <div className="flex items-center gap-2 text-sm text-[#6b5d4a]">
                  <Globe size={16} className="text-[#8b6f47]" />
                  {onClick ? (
                    <a
                      href={church.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#5d4a2f] hover:underline truncate"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {church.website.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    <span
                      className="hover:text-[#5d4a2f] hover:underline truncate cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(
                          church.website,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                    >
                      {church.website.replace(/^https?:\/\//, "")}
                    </span>
                  )}
                </div>
              )}

              {church.memberCount && (
                <div className="flex items-center gap-2 text-sm text-[#6b5d4a]">
                  <Users size={16} className="text-[#8b6f47]" />
                  <span>{church.memberCount.toLocaleString()} members</span>
                </div>
              )}

              {church.serviceTimes && church.serviceTimes.length > 0 && (
                <div className="flex items-start gap-2 text-sm text-[#6b5d4a]">
                  <Calendar
                    size={16}
                    className="mt-0.5 flex-shrink-0 text-[#8b6f47]"
                  />
                  <div className="flex-1">
                    {church.serviceTimes.map((time, index) => (
                      <div key={index}>{time}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  // On desktop with onClick, return card directly. On mobile or without onClick, wrap in Link
  if (onClick) {
    return cardContent;
  }

  return <Link href={`/app/church/${church.id}`}>{cardContent}</Link>;
};

export default ChurchCard;
