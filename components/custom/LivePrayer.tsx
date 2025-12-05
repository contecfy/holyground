import { Heart } from "lucide-react";
import Card from "../ui/card";
import { LivePrayer } from "@/lib/prayer-data";
import Badge from "../ui/badge";
import Avatar from "../ui/avatar";
import Button from "../ui/button";

export const LivePrayerCard = ({ prayer }: { prayer: LivePrayer }) => {
  return (
    <Card
      variant="paper"
      className="p-3 md:p-4 hover:shadow-lg transition-shadow w-full max-w-full overflow-hidden"
    >
      <div className="flex items-start gap-2 md:gap-3 mb-3">
        <Avatar
          name={prayer.requester.name}
          size="sm"
          src={prayer.requester.avatar}
          className="flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 md:gap-2 mb-1 flex-wrap">
            <p className="font-semibold text-sm md:text-base text-[#3d2817] break-words">
              {prayer.requester.name}
            </p>
            <span className="text-xs text-[#6b5d4a] whitespace-nowrap">
              • {prayer.timestamp}
            </span>
            {prayer.isUrgent && (
              <Badge variant="danger" size="sm" className="flex-shrink-0">
                Urgent
              </Badge>
            )}
          </div>
          <p className="text-sm md:text-base text-[#3d2817] mb-3 break-words">
            {prayer.request}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-4 text-xs md:text-sm text-[#6b5d4a]">
              <div className="flex items-center gap-1">
                <Heart size={14} className="md:w-4 md:h-4" />
                <span>{prayer.prayerCount} praying</span>
              </div>
            </div>
            <Button
              buttonType="secondary"
              buttonVariant="outline"
              buttonSize="small"
              buttonIcon={<Heart size={14} className="md:w-4 md:h-4" />}
              buttonText="Pray Now"
              className="w-full sm:w-auto flex-shrink-0"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
