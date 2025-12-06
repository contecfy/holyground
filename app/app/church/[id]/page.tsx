"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Church } from "@/components/common/church-card";
import ChurchDetailHeader from "@/components/common/church-detail-header";
import ChurchServices from "@/components/common/church-services";
import ChurchLocationMap from "@/components/common/church-location-map";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";

// Mock church data - replace with actual API call
const getChurchById = (id: string): Church | null => {
  const churches: Church[] = [
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
        "A welcoming community focused on biblical teaching and authentic relationships. We are committed to spreading the Gospel and building a strong community of believers who support and encourage one another in their faith journey.",
      memberCount: 450,
      serviceTimes: [
        "Sunday: 9:00 AM - Morning Service",
        "Sunday: 11:00 AM - Family Service",
        "Wednesday: 7:00 PM - Bible Study & Prayer",
        "Friday: 6:00 PM - Youth Service",
      ],
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
      description:
        "Serving the community with love and spreading the Gospel. We believe in the power of prayer, worship, and fellowship to transform lives.",
      memberCount: 320,
      serviceTimes: [
        "Sunday: 10:30 AM - Main Service",
        "Sunday: 6:00 PM - Evening Service",
        "Tuesday: 7:00 PM - Prayer Meeting",
      ],
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
      description:
        "A historic church serving the Catholic community in Kampala. We welcome all to join us in worship and prayer.",
      memberCount: 850,
      serviceTimes: [
        "Sunday: 8:00 AM - Mass",
        "Sunday: 10:00 AM - Mass",
        "Sunday: 12:00 PM - Mass",
        "Daily: 7:00 AM - Morning Mass",
      ],
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
        "Building hope and faith in our community through worship and service. We are dedicated to making a positive impact in Kampala.",
      memberCount: 280,
      serviceTimes: [
        "Sunday: 9:30 AM - Worship Service",
        "Wednesday: 6:30 PM - Bible Study",
        "Saturday: 4:00 PM - Community Outreach",
      ],
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
      description:
        "A community of believers committed to biblical teaching and Christian fellowship.",
      memberCount: 195,
      serviceTimes: [
        "Sunday: 10:00 AM - Worship Service",
        "Thursday: 7:00 PM - Prayer & Fellowship",
      ],
      latitude: 0.36,
      longitude: 32.6,
      distance: 6.8,
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=400&fit=crop",
    },
  ];

  return churches.find((church) => church.id === id) || null;
};

export default function ChurchDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const church = useMemo(() => getChurchById(id), [id]);

  if (!church && id) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card variant="paper" className="p-12 text-center">
          <h1 className="text-2xl font-bold text-[#3d2817] mb-4">Loading...</h1>
        </Card>
      </div>
    );
  }

  if (!church) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card variant="paper" className="p-12 text-center">
          <h1 className="text-2xl font-bold text-[#3d2817] mb-4">
            Church Not Found
          </h1>
          <p className="text-[#6b5d4a] mb-6">
            The church you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link href="/app/find-church">
            <Button buttonType="primary" buttonText="Back to Find Church" />
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <Link
        href="/app/find-church"
        className="inline-flex items-center gap-2 text-[#6b5d4a] hover:text-[#5d4a2f] mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Find Church</span>
      </Link>

      {/* Header Section */}
      <ChurchDetailHeader church={church} />

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Section */}
          <Card variant="paper" className="p-6">
            <h2 className="text-xl font-bold text-[#3d2817] mb-4">About</h2>
            <div className="prose prose-sm max-w-none text-[#6b5d4a]">
              <p className="leading-relaxed">
                {church.description || "No description available."}
              </p>
              <p className="mt-4 leading-relaxed">
                We welcome visitors and new members to join our community.
                Whether you&apos;re new to faith or have been walking with
                Christ for years, you&apos;ll find a place to grow, serve, and
                connect with other believers.
              </p>
            </div>
          </Card>

          {/* Service Times */}
          {church.serviceTimes && church.serviceTimes.length > 0 && (
            <ChurchServices serviceTimes={church.serviceTimes} />
          )}

          {/* Contact Section */}
          <Card variant="paper" className="p-6">
            <h2 className="text-xl font-bold text-[#3d2817] mb-4">
              Contact Us
            </h2>
            <div className="space-y-4">
              {church.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f5f1eb] rounded-lg flex items-center justify-center">
                    <span className="text-[#8b6f47]">📞</span>
                  </div>
                  <div>
                    <p className="text-sm text-[#6b5d4a]">Phone</p>
                    <a
                      href={`tel:${church.phone}`}
                      className="text-[#3d2817] font-medium hover:text-[#5d4a2f] hover:underline"
                    >
                      {church.phone}
                    </a>
                  </div>
                </div>
              )}

              {church.website && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f5f1eb] rounded-lg flex items-center justify-center">
                    <span className="text-[#8b6f47]">🌐</span>
                  </div>
                  <div>
                    <p className="text-sm text-[#6b5d4a]">Website</p>
                    <a
                      href={church.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3d2817] font-medium hover:text-[#5d4a2f] hover:underline"
                    >
                      {church.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#f5f1eb] rounded-lg flex items-center justify-center">
                  <Mail size={20} className="text-[#8b6f47]" />
                </div>
                <div>
                  <p className="text-sm text-[#6b5d4a]">Email</p>
                  <a
                    href={`mailto:info@${church.name.toLowerCase().replace(/\s+/g, "")}.com`}
                    className="text-[#3d2817] font-medium hover:text-[#5d4a2f] hover:underline"
                  >
                    info@{church.name.toLowerCase().replace(/\s+/g, "")}.com
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Location Map */}
          <ChurchLocationMap church={church} />

          {/* Quick Actions */}
          <Card variant="paper" className="p-6">
            <h2 className="text-lg font-bold text-[#3d2817] mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Button
                buttonType="primary"
                buttonText="Get Directions"
                buttonIcon={<span>📍</span>}
                iconPosition="left"
                className="w-full"
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${church.latitude},${church.longitude}`
                    )}`,
                    "_blank"
                  );
                }}
              />
              {church.phone && (
                <Button
                  buttonType="secondary"
                  buttonVariant="outline"
                  buttonText="Call Church"
                  buttonIcon={<span>📞</span>}
                  iconPosition="left"
                  className="w-full"
                  onClick={() => {
                    window.location.href = `tel:${church.phone}`;
                  }}
                />
              )}
              {church.website && (
                <Button
                  buttonType="secondary"
                  buttonVariant="outline"
                  buttonText="Visit Website"
                  buttonIcon={<span>🌐</span>}
                  iconPosition="left"
                  className="w-full"
                  onClick={() => {
                    window.open(church.website!, "_blank");
                  }}
                />
              )}
            </div>
          </Card>

          {/* Church Stats */}
          {church.memberCount && (
            <Card variant="paper" className="p-6">
              <h2 className="text-lg font-bold text-[#3d2817] mb-4">
                Church Stats
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6b5d4a]">Members</span>
                  <span className="text-lg font-bold text-[#3d2817]">
                    {church.memberCount.toLocaleString()}
                  </span>
                </div>
                {church.distance && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6b5d4a]">Distance</span>
                    <span className="text-lg font-bold text-[#3d2817]">
                      {church.distance.toFixed(1)} mi
                    </span>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
