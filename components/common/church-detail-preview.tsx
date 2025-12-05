'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Globe, Users, Calendar, ExternalLink } from 'lucide-react';
import { Church } from './church-card';
import ChurchMap from './church-map';
import Card from '../ui/card';
import Badge from '../ui/badge';
import Button from '../ui/button';
import Link from 'next/link';

interface ChurchDetailPreviewProps {
  church: Church | null;
  onClose?: () => void;
}

const ChurchDetailPreview = ({ church, onClose }: ChurchDetailPreviewProps) => {
  if (!church) {
    return (
      <Card variant="paper" className="p-8 h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#6b5d4a] text-sm">Select a church to view details</p>
        </div>
      </Card>
    );
  }

  const fullAddress = `${church.address}, ${church.city}, ${church.state} ${church.zipCode}`;

  return (
    <div className="h-full overflow-y-auto">
      <Card variant="paper" className="p-6">
        {/* Header */}
        <div className="mb-6">
          {onClose && (
            <button
              onClick={onClose}
              className="mb-4 text-[#6b5d4a] hover:text-[#5d4a2f] text-sm flex items-center gap-1"
            >
              ← Back
            </button>
          )}
          <div className="flex gap-4 mb-4">
            {church.image ? (
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#f5f1eb] flex-shrink-0">
                <Image
                  src={church.image}
                  alt={church.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#5d4a2f] to-[#8b6f47] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-3xl">⛪</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-[#3d2817] mb-2">{church.name}</h2>
              {church.denomination && (
                <Badge variant="secondary" size="sm">{church.denomination}</Badge>
              )}
            </div>
          </div>
          {church.description && (
            <p className="text-sm text-[#6b5d4a]">{church.description}</p>
          )}
        </div>

        {/* Quick Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-2 text-sm text-[#6b5d4a]">
            <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[#8b6f47]" />
            <span className="flex-1">{fullAddress}</span>
          </div>
          {church.phone && (
            <div className="flex items-center gap-2 text-sm text-[#6b5d4a]">
              <Phone size={16} className="text-[#8b6f47]" />
              <a href={`tel:${church.phone}`} className="hover:text-[#5d4a2f] hover:underline">
                {church.phone}
              </a>
            </div>
          )}
          {church.website && (
            <div className="flex items-center gap-2 text-sm text-[#6b5d4a]">
              <Globe size={16} className="text-[#8b6f47]" />
              <a
                href={church.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#5d4a2f] hover:underline truncate"
              >
                {church.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {church.memberCount && (
            <div className="flex items-center gap-2 text-sm text-[#6b5d4a]">
              <Users size={16} className="text-[#8b6f47]" />
              <span>{church.memberCount.toLocaleString()} members</span>
            </div>
          )}
        </div>

        {/* Service Times */}
        {church.serviceTimes && church.serviceTimes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-[#3d2817] mb-3 flex items-center gap-2">
              <Calendar size={16} className="text-[#8b6f47]" />
              Service Times
            </h3>
            <div className="space-y-2">
              {church.serviceTimes.map((time, index) => (
                <div key={index} className="text-sm text-[#6b5d4a] p-2 bg-[#f5f1eb] rounded">
                  {time}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map Preview */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#3d2817] mb-3">Location</h3>
          <div className="h-48 rounded-lg overflow-hidden border border-[#e8dfd0]">
            <ChurchMap
              churches={[church]}
              center={{ lat: church.latitude, lng: church.longitude }}
              selectedChurch={church}
              className="h-full w-full"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Link href={`/app/church/${church.id}`} className="block">
            <Button
              buttonType="primary"
              buttonText="View Full Details"
              buttonIcon={<ExternalLink size={16} />}
              iconPosition="right"
              className="w-full"
            />
          </Link>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${church.latitude},${church.longitude}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              buttonType="secondary"
              buttonVariant="outline"
              buttonText="Get Directions"
              className="w-full"
            />
          </a>
        </div>
      </Card>
    </div>
  );
};

export default ChurchDetailPreview;

