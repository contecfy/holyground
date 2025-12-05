import { MapPin, Clock, UserPlus } from "lucide-react";
import Card from "../ui/card";
import { PrayerPartner } from "@/lib/prayer-data";
import Badge from "../ui/badge";
import Avatar from "../ui/avatar";
import Button from "../ui/button";

export const PrayerPartnerCard = ({ partner }: { partner: PrayerPartner }) => {
  return (
    <Card variant="elevated" className="p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <Avatar name={partner.name} size="lg" src={partner.avatar} />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#3d2817] mb-1">
            {partner.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-[#6b5d4a] mb-2">
            <MapPin size={14} />
            <span>{partner.location}</span>
          </div>
          <p className="text-[#3d2817] mb-3">{partner.bio}</p>

          <div className="mb-3">
            <p className="text-sm font-semibold text-[#3d2817] mb-2">
              Interests:
            </p>
            <div className="flex flex-wrap gap-2">
              {partner.interests.map((interest) => (
                <Badge key={interest} variant="primary" size="sm">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#6b5d4a] mb-4">
            <Clock size={14} />
            <span>Available: {partner.availability}</span>
          </div>

          <Button
            buttonType="primary"
            buttonSize="medium"
            buttonIcon={<UserPlus size={16} />}
            buttonText="Connect"
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
};
