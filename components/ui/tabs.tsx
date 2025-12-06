import React from "react";
import { LucideIcon } from "lucide-react";

export interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="mb-6 md:block">
      <div className="border-b border-[#e8dfd0] overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-2 md:gap-4 w-max  w-[90%] md:w-full md:min-w-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-2 md:px-4 py-2 md:py-3 font-medium transition-colors border-b-2 whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? "border-[#5d4a2f] text-[#5d4a2f]"
                    : "border-transparent text-[#6b5d4a] hover:text-[#5d4a2f]"
                }`}
              >
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Icon size={16} className="md:w-[18px] md:h-[18px]" />
                  <span className="text-sm md:text-base">{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
