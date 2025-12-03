import React from 'react';
import { BookOpen, Shield, Sun, Heart, Church, HandHeart } from 'lucide-react';
import Card from '@/components/ui/card';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import { demoSpaces } from '@/lib/demo-data';

const iconMap: Record<string, React.ReactNode> = {
  '📖': <BookOpen size={28} className="text-white" />,
  '🛡️': <Shield size={28} className="text-white" />,
  '☀️': <Sun size={28} className="text-white" />,
  '💑': <Heart size={28} className="text-white" />,
  '⛪': <Church size={28} className="text-white" />,
  '🙏': <HandHeart size={28} className="text-white" />,
};

export default function SpacesPage() {

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#3d2817] mb-2">Spaces</h1>
        <p className="text-[#6b5d4a]">Join communities focused on specific topics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoSpaces.map((space) => (
          <Card key={space.id} variant="elevated" className="p-6 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-[#5d4a2f] to-[#8b6f47] rounded-lg flex items-center justify-center mb-4">
              {iconMap[space.icon as string] || <BookOpen size={28} className="text-white" />}
            </div>
            <h3 className="text-xl font-bold text-[#3d2817] mb-2">{space.name}</h3>
            <p className="text-[#6b5d4a] text-sm mb-4">{space.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {space.topics.slice(0, 3).map((topic) => (
                <Badge key={topic} variant="default" size="sm">
                  {topic}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-4 text-sm text-[#6b5d4a]">
                <span>{space.memberCount.toLocaleString()} members</span>
                <span>{space.questionCount.toLocaleString()} questions</span>
              </div>
            </div>
            <Button
              buttonType="primary"
              buttonSize="medium"
              buttonText="Join Space"
              className="w-full"
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

