"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Phone, Globe, Users, Share2, Bookmark } from "lucide-react";
import { Church } from "./church-card";
import Badge from "../ui/badge";
import Button from "../ui/button";

interface ChurchDetailHeaderProps {
  church: Church;
}

const ChurchDetailHeader = ({ church }: ChurchDetailHeaderProps) => {
  const fullAddress = `${church.address}, ${church.city}, ${church.state} ${church.zipCode}`;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <div className="flex items-start gap-6 mb-4">
          {/* Church Image */}
          <div className="flex-shrink-0">
            {church.image ? (
              <div className="w-32 h-32 rounded-lg overflow-hidden bg-[#f5f1eb] shadow-md">
                <Image
                  src={church.image}
                  alt={church.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-[#5d4a2f] to-[#8b6f47] flex items-center justify-center shadow-md">
                <span className="text-white text-5xl">⛪</span>
              </div>
            )}
          </div>

          {/* Church Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-[#3d2817] mb-3">
                  {church.name}
                </h1>
                {church.denomination && (
                  <Badge variant="secondary" size="md" className="mb-3">
                    {church.denomination}
                  </Badge>
                )}
                {church.description && (
                  <p className="text-lg text-[#6b5d4a] mt-3">
                    {church.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2 ml-4 flex-shrink-0">
                <Button
                  buttonType="secondary"
                  buttonVariant="outline"
                  buttonSize="small"
                  buttonIcon={<Share2 size={16} />}
                  buttonText="Share"
                />
                <Button
                  buttonType="secondary"
                  buttonVariant="outline"
                  buttonSize="small"
                  buttonIcon={<Bookmark size={16} />}
                  buttonText="Save"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-[#f5f1eb] rounded-lg">
            <MapPin size={20} className="text-[#8b6f47] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#3d2817] mb-1">Address</p>
              <p className="text-sm text-[#6b5d4a]">{fullAddress}</p>
            </div>
          </div>

          {church.phone && (
            <div className="flex items-start gap-3 p-4 bg-[#f5f1eb] rounded-lg">
              <Phone
                size={20}
                className="text-[#8b6f47] mt-0.5 flex-shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-[#3d2817] mb-1">Phone</p>
                <a
                  href={`tel:${church.phone}`}
                  className="text-sm text-[#6b5d4a] hover:text-[#5d4a2f] hover:underline"
                >
                  {church.phone}
                </a>
              </div>
            </div>
          )}

          {church.website && (
            <div className="flex items-start gap-3 p-4 bg-[#f5f1eb] rounded-lg">
              <Globe
                size={20}
                className="text-[#8b6f47] mt-0.5 flex-shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-[#3d2817] mb-1">
                  Website
                </p>
                <a
                  href={church.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#6b5d4a] hover:text-[#5d4a2f] hover:underline truncate block"
                >
                  {church.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
          )}

          {church.memberCount && (
            <div className="flex items-start gap-3 p-4 bg-[#f5f1eb] rounded-lg">
              <Users
                size={20}
                className="text-[#8b6f47] mt-0.5 flex-shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-[#3d2817] mb-1">
                  Members
                </p>
                <p className="text-sm text-[#6b5d4a]">
                  {church.memberCount.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChurchDetailHeader;
