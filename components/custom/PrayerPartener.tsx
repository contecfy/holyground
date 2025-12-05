import { MapPin, Clock, UserPlus } from "lucide-react";
import Card from "../ui/card";
import { PrayerPartner } from "@/lib/prayer-data";
import Badge from "../ui/badge";
import Avatar from "../ui/avatar";
import Button from "../ui/button";

export const PrayerPartnerCard = ({ partner }: { partner: PrayerPartner }) => {
  return (
    <Card
      variant="elevated"
      className="p-4 md:p-6 hover:shadow-xl transition-shadow w-full max-w-full overflow-hidden"
    >
      <div className="flex items-start gap-3 md:gap-4 mb-4">
        <Avatar
          name={partner.name}
          size="lg"
          src={partner.avatar}
          className="flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold text-[#3d2817] mb-1 break-words">
            {partner.name}
          </h3>
          <div className="flex items-center gap-2 text-xs md:text-sm text-[#6b5d4a] mb-2">
            <MapPin size={12} className="md:w-3.5 md:h-3.5 flex-shrink-0" />
            <span className="break-words">{partner.location}</span>
          </div>
          <p className="text-sm md:text-base text-[#3d2817] mb-3 break-words">
            {partner.bio}
          </p>

          <div className="mb-3">
            <p className="text-xs md:text-sm font-semibold text-[#3d2817] mb-2">
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

          <div className="flex items-center gap-2 text-xs md:text-sm text-[#6b5d4a] mb-4">
            <Clock size={12} className="md:w-3.5 md:h-3.5 flex-shrink-0" />
            <span className="break-words">
              Available: {partner.availability}
            </span>
          </div>

          <Button
            buttonType="primary"
            buttonSize="medium"
            buttonIcon={<UserPlus size={14} className="md:w-4 md:h-4" />}
            buttonText="Connect"
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
};
