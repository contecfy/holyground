import { MapPin, Clock, Users } from "lucide-react";
import Card from "../ui/card";
import { PrayerGroup } from "@/lib/prayer-data";
import Image from "next/image";
import Badge from "../ui/badge";
import Button from "../ui/button";

export const PrayerGroupCard = ({ group }: { group: PrayerGroup }) => {
  return (
    <Card variant="elevated" className="p-6 hover:shadow-xl transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        {group.image && (
          <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden bg-[#f5f1eb] flex-shrink-0">
            <Image
              src={group.image}
              alt={group.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-[#3d2817] mb-2">
            {group.name}
          </h3>
          <p className="text-[#6b5d4a] mb-4">{group.description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-[#6b5d4a]">
              <Users size={16} />
              <span>Led by {group.leader}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6b5d4a]">
              <Clock size={16} />
              <span>{group.meetingTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6b5d4a]">
              <MapPin size={16} />
              <span>{group.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6b5d4a]">
              <Users size={16} />
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
