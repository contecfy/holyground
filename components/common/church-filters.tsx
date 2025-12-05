'use client';

import React from 'react';
import { Search, MapPin } from 'lucide-react';
import Input from '../ui/input';
import Badge from '../ui/badge';

interface ChurchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDenomination: string | null;
  onDenominationChange: (denomination: string | null) => void;
  showMap: boolean;
  onToggleMap: () => void;
}

const denominations = [
  'Baptist',
  'Catholic',
  'Methodist',
  'Presbyterian',
  'Lutheran',
  'Pentecostal',
  'Anglican',
  'Non-denominational',
  'Other'
];

const ChurchFilters = ({
  searchQuery,
  onSearchChange,
  selectedDenomination,
  onDenominationChange,
  showMap,
  onToggleMap
}: ChurchFiltersProps) => {
  return (
    <div className="space-y-4">
      {/* Search */}
      <Input
        placeholder="Search churches by name, city, or address..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        variant="underline"
        leftIcon={<Search size={18} className="text-[#6b5d4a]" />}
      />

      {/* Denominations */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-[#3d2817]">Denomination</label>
          {selectedDenomination && (
            <button
              onClick={() => onDenominationChange(null)}
              className="text-xs text-[#6b5d4a] hover:text-[#5d4a2f] underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {denominations.map((denom) => (
            <Badge
              key={denom}
              variant={selectedDenomination === denom ? "primary" : "default"}
              size="sm"
              className="cursor-pointer"
              onClick={() => onDenominationChange(
                selectedDenomination === denom ? null : denom
              )}
            >
              {denom}
            </Badge>
          ))}
        </div>
      </div>

      {/* Map Toggle */}
      <div className="flex justify-end">
        <button
          onClick={onToggleMap}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            showMap
              ? 'bg-[#5d4a2f] text-white'
              : 'bg-[#f5f1eb] text-[#6b5d4a] hover:bg-[#e8dfd0]'
          }`}
        >
          <MapPin size={16} />
          {showMap ? 'Hide Map' : 'Show Map'}
        </button>
      </div>
    </div>
  );
};

export default ChurchFilters;

