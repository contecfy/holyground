import React from 'react';
import Image from 'next/image';

interface AvatarProps {
    src?: string;
    alt?: string;
    name?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    status?: "online" | "offline" | "away";
    className?: string;
}

const Avatar = ({ 
    src, 
    alt, 
    name, 
    size = "md",
    status,
    className = ""
}: AvatarProps) => {
    const sizeClasses = {
        xs: "w-6 h-6 text-xs",
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-12 h-12 text-lg",
        xl: "w-16 h-16 text-xl"
    };

    const sizePixels = {
        xs: 24,
        sm: 32,
        md: 40,
        lg: 48,
        xl: 64
    };

    const statusColors = {
        online: "bg-green-500",
        offline: "bg-gray-400",
        away: "bg-amber-500"
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const pixelSize = sizePixels[size];

    const avatarContent = src ? (
        <Image 
            src={src} 
            alt={alt || name || "Avatar"} 
            width={pixelSize}
            height={pixelSize}
            className="w-full h-full object-cover rounded-full"
        />
    ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#8b6f47] to-[#5d4a2f] text-white flex items-center justify-center font-semibold rounded-full">
            {name ? getInitials(name) : "?"}
        </div>
    );

    return (
        <div className={`relative inline-block ${className}`}>
            <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-[#e8dfd0] shadow-sm`}>
                {avatarContent}
            </div>
            {status && (
                <span 
                    className={`absolute bottom-0 right-0 ${size === "xs" || size === "sm" ? "w-2 h-2" : "w-3 h-3"} ${statusColors[status]} rounded-full border-2 border-white`}
                />
            )}
        </div>
    );
};

export default Avatar;

