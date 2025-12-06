import { MapPin, Clock, Users } from "lucide-react";
import Card from "../ui/card";
import { PrayerGroup } from "@/lib/prayer-data";
import Image from "next/image";
import Badge from "../ui/badge";
import Button from "../ui/button";

export const PrayerGroupCard = ({ group }: { group: PrayerGroup }) => {
  return (
    <Card
      variant="elevated"
      className="p-4 md:p-6 hover:shadow-xl transition-shadow w-full max-w-full overflow-hidden"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {group.image && (
          <div className="relative w-full md:w-48 h-48 md:h-full rounded-lg overflow-hidden bg-[#f5f1eb] flex-shrink-0 md:self-stretch">
            <Image
              src={group.image}
              alt={group.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl md:text-2xl font-bold text-[#3d2817] mb-2 break-words">
            {group.name}
          </h3>
          <p className="text-sm md:text-base text-[#6b5d4a] mb-4 break-words">
            {group.description}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs md:text-sm text-[#6b5d4a]">
              <Users size={14} className="md:w-4 md:h-4 flex-shrink-0" />
              <span className="break-words">Led by {group.leader}</span>
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-[#6b5d4a]">
              <Clock size={14} className="md:w-4 md:h-4 flex-shrink-0" />
              <span className="break-words">{group.meetingTime}</span>
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-[#6b5d4a]">
              <MapPin size={14} className="md:w-4 md:h-4 flex-shrink-0" />
              <span className="break-words">{group.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-[#6b5d4a]">
              <Users size={14} className="md:w-4 md:h-4 flex-shrink-0" />
              <span>{group.memberCount} members</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {group.tags.map((tag) => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          <Button
            buttonType="primary"
            buttonSize="medium"
            buttonText="Join Group"
            className="w-full md:w-auto"
          />
        </div>
      </div>
    </Card>
  );
};
