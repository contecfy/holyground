import { Heart } from "lucide-react";
import Card from "../ui/card";
import { LivePrayer } from "@/lib/prayer-data";
import Badge from "../ui/badge";
import Avatar from "../ui/avatar";
import Button from "../ui/button";

export const LivePrayerCard = ({ prayer }: { prayer: LivePrayer }) => {
  return (
    <Card variant="paper" className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <Avatar
          name={prayer.requester.name}
          size="sm"
          src={prayer.requester.avatar}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-[#3d2817]">
              {prayer.requester.name}
            </p>
            <span className="text-xs text-[#6b5d4a]">• {prayer.timestamp}</span>
            {prayer.isUrgent && (
              <Badge variant="danger" size="sm">
                Urgent
              </Badge>
            )}
          </div>
          <p className="text-[#3d2817] mb-3">{prayer.request}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-[#6b5d4a]">
              <div className="flex items-center gap-1">
                <Heart size={16} />
                <span>{prayer.prayerCount} praying</span>
              </div>
            </div>
            <Button
              buttonType="secondary"
              buttonVariant="outline"
              buttonSize="small"
              buttonIcon={<Heart size={16} />}
              buttonText="Pray Now"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
