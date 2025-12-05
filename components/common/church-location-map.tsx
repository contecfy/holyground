'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Church } from './church-card';
import ChurchMap from './church-map';
import Card from '../ui/card';
import Button from '../ui/button';

interface ChurchLocationMapProps {
  church: Church;
}

const ChurchLocationMap = ({ church }: ChurchLocationMapProps) => {
  const fullAddress = `${church.address}, ${church.city}, ${church.state} ${church.zipCode}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${church.latitude},${church.longitude}`
  )}`;
  const openStreetMapUrl = `https://www.openstreetmap.org/?mlat=${church.latitude}&mlon=${church.longitude}&zoom=15`;

  return (
    <Card variant="paper" className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#3d2817]">Location</h2>
        <div className="flex gap-2">
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <Button
              buttonType="secondary"
              buttonVariant="outline"
              buttonSize="small"
              buttonIcon={<ExternalLink size={14} />}
              buttonText="Directions"
            />
          </a>
        </div>
      </div>
      <p className="text-sm text-[#6b5d4a] mb-4">{fullAddress}</p>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <ChurchMap
          churches={[church]}
          center={{ lat: church.latitude, lng: church.longitude }}
          selectedChurch={church}
          className="h-full w-full"
        />
      </div>
    </Card>
  );
};

export default ChurchLocationMap;

