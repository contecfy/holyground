// Prayer-related demo data

export interface PrayerGroup {
  id: string;
  name: string;
  description: string;
  leader: string;
  memberCount: number;
  meetingTime: string;
  location: string;
  tags: string[];
  image?: string;
}

export interface LivePrayer {
  id: string;
  requester: {
    name: string;
    avatar?: string;
  };
  request: string;
  timestamp: string;
  prayerCount: number;
  isUrgent: boolean;
}

export interface PrayerPartner {
  id: string;
  name: string;
  avatar?: string;
  location: string;
  interests: string[];
  availability: string;
  bio: string;
}

export const demoPrayerGroups: PrayerGroup[] = [
  {
    id: "1",
    name: "Morning Prayer Warriors",
    description:
      "Join us every morning for powerful prayer and intercession. We pray for our community, nation, and personal needs.",
    leader: "Pastor Sarah Mitchell",
    memberCount: 45,
    meetingTime: "Daily 6:00 AM",
    location: "Online & In-Person",
    tags: ["Intercession", "Morning", "Community"],
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
  },
  {
    id: "2",
    name: "Youth Prayer Circle",
    description:
      "A vibrant prayer group for young adults (18-30) seeking God together through worship and prayer.",
    leader: "David Rodriguez",
    memberCount: 32,
    meetingTime: "Friday 7:00 PM",
    location: "San Francisco, CA",
    tags: ["Youth", "Worship", "Fellowship"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    name: "Women's Intercession",
    description:
      "A safe space for women to come together in prayer, supporting each other through life's challenges.",
    leader: "Elizabeth Thompson",
    memberCount: 28,
    meetingTime: "Tuesday 10:00 AM",
    location: "Oakland, CA",
    tags: ["Women", "Support", "Intercession"],
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&h=600&fit=crop",
  },
  {
    id: "4",
    name: "24/7 Prayer Room",
    description:
      "Continuous prayer coverage. Sign up for time slots to maintain unceasing prayer for our city.",
    leader: "Rev. James Wilson",
    memberCount: 120,
    meetingTime: "24/7",
    location: "Online",
    tags: ["24/7", "Intercession", "City"],
    image:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=600&fit=crop",
  },
];

export const demoLivePrayers: LivePrayer[] = [
  {
    id: "1",
    requester: {
      name: "Sarah M.",
      avatar: undefined,
    },
    request:
      "Please pray for my father who is undergoing surgery tomorrow. He has been diagnosed with cancer and we need God's healing touch.",
    timestamp: "2 minutes ago",
    prayerCount: 24,
    isUrgent: true,
  },
  {
    id: "2",
    requester: {
      name: "Michael C.",
      avatar: undefined,
    },
    request:
      "Praying for wisdom in a major career decision. I have two job offers and need God's guidance on which path to take.",
    timestamp: "15 minutes ago",
    prayerCount: 12,
    isUrgent: false,
  },
  {
    id: "3",
    requester: {
      name: "Jessica L.",
      avatar: undefined,
    },
    request:
      "My marriage is struggling. Please pray for restoration, healing, and God's love to fill our home again.",
    timestamp: "1 hour ago",
    prayerCount: 45,
    isUrgent: true,
  },
  {
    id: "4",
    requester: {
      name: "Robert K.",
      avatar: undefined,
    },
    request:
      "Praying for my daughter who is struggling with anxiety and depression. She needs God's peace and healing.",
    timestamp: "2 hours ago",
    prayerCount: 38,
    isUrgent: false,
  },
];

export const demoPrayerPartners: PrayerPartner[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    location: "San Francisco, CA",
    interests: ["Intercession", "Healing", "Family"],
    availability: "Morning & Evening",
    bio: "Looking for a prayer partner to pray together regularly. I'm passionate about intercession and seeing God move in our city.",
  },
  {
    id: "2",
    name: "David Rodriguez",
    location: "Oakland, CA",
    interests: ["Worship", "Youth Ministry", "Missions"],
    availability: "Evening",
    bio: "Seeking a prayer partner for accountability and mutual encouragement in our walk with God.",
  },
  {
    id: "3",
    name: "Emma Johnson",
    location: "Berkeley, CA",
    interests: ["Healing", "Deliverance", "Spiritual Growth"],
    availability: "Flexible",
    bio: "Looking for someone to pray with regularly, especially for breakthrough in spiritual warfare.",
  },
];
