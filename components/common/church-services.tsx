'use client';

import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import Card from '../ui/card';

interface ChurchServicesProps {
  serviceTimes: string[];
}

const ChurchServices = ({ serviceTimes }: ChurchServicesProps) => {
  return (
    <Card variant="paper" className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={20} className="text-[#8b6f47]" />
        <h2 className="text-xl font-bold text-[#3d2817]">Service Times</h2>
      </div>
      <div className="space-y-3">
        {serviceTimes.map((time, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#e8dfd0]"
          >
            <Clock size={18} className="text-[#8b6f47] flex-shrink-0" />
            <span className="text-[#3d2817] font-medium">{time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ChurchServices;

