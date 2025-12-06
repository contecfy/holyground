// Demo data for the app

export interface Question {
  id: string;
  question: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
    reputation: number;
    level: number;
  };
  topics: string[];
  books: string[];
  answerCount: number;
  upvotes: number;
  views: number;
  timestamp: string;
  isAnswered: boolean;
  images?: string[];
  topAnswer?: {
    author: string;
    preview: string;
  };
}

export interface Answer {
  id: string;
  answer: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
    reputation: number;
    level: number;
    isVerified: boolean;
  };
  upvotes: number;
  downvotes: number;
  verses: Array<{
    book: string;
    chapter: number;
    verse: number;
    text: string;
  }>;
  timestamp: string;
  isTopAnswer: boolean;
}

export const demoQuestions: Question[] = [
  {
    id: "1",
    question:
      'What does it mean to "walk by faith, not by sight" in 2 Corinthians 5:7?',
    author: {
      name: "Sarah Mitchell",
      username: "sarahm",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
      reputation: 1250,
      level: 7,
    },
    topics: ["faith", "doctrine", "daily living"],
    books: ["2 Corinthians"],
    answerCount: 12,
    upvotes: 45,
    views: 320,
    timestamp: "2 hours ago",
    isAnswered: true,
    topAnswer: {
      author: "Pastor John Davis",
      preview:
        "Walking by faith means trusting in God's promises and character even when circumstances suggest otherwise...",
    },
  },
  {
    id: "2",
    question:
      "How should Christians respond to persecution according to the Bible?",
    author: {
      name: "Michael Chen",
      username: "michaelc",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
      reputation: 890,
      level: 5,
    },
    topics: ["persecution", "apologetics", "suffering"],
    books: ["Matthew", "1 Peter", "Acts"],
    answerCount: 8,
    upvotes: 32,
    views: 245,
    timestamp: "5 hours ago",
    isAnswered: true,
    images: [
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    ],
    topAnswer: {
      author: "Dr. Elizabeth Thompson",
      preview:
        "The Bible provides clear guidance on responding to persecution with grace, prayer, and unwavering faith...",
    },
  },
  {
    id: "3",
    question:
      "What is the biblical view on spiritual gifts? Are they still active today?",
    author: {
      name: "David Rodriguez",
      username: "davidr",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
      reputation: 2100,
      level: 9,
    },
    topics: ["spiritual gifts", "doctrine", "church history"],
    books: ["1 Corinthians", "Romans", "Ephesians"],
    answerCount: 25,
    upvotes: 78,
    views: 890,
    timestamp: "1 day ago",
    isAnswered: true,
    topAnswer: {
      author: "Rev. James Wilson",
      preview:
        "Spiritual gifts are indeed active today, as Paul teaches in 1 Corinthians 12-14. The key is understanding their purpose...",
    },
  },
  {
    id: "4",
    question:
      "Can someone explain the significance of the Trinity in simple terms?",
    author: {
      name: "Emma Johnson",
      username: "emmaj",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
      reputation: 450,
      level: 3,
    },
    topics: ["doctrine", "trinity", "theology"],
    books: ["Matthew", "John"],
    answerCount: 15,
    upvotes: 56,
    views: 412,
    timestamp: "3 days ago",
    isAnswered: true,
    images: [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
    ],
    topAnswer: {
      author: "Theology Professor Mark",
      preview:
        "The Trinity is one God in three persons: Father, Son, and Holy Spirit. Each is fully God, yet distinct...",
    },
  },
  {
    id: "5",
    question:
      "What does the Bible say about handling conflict in Christian relationships?",
    author: {
      name: "Jessica Lee",
      username: "jessical",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
      reputation: 670,
      level: 4,
    },
    topics: ["relationships", "conflict resolution", "daily devotionals"],
    books: ["Matthew", "Ephesians", "Colossians"],
    answerCount: 9,
    upvotes: 28,
    views: 198,
    timestamp: "4 days ago",
    isAnswered: false,
  },
  {
    id: "6",
    question:
      "How do I know if I'm truly saved? What are the signs of genuine salvation?",
    author: {
      name: "Robert Kim",
      username: "robertk",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces",
      reputation: 340,
      level: 2,
    },
    topics: ["salvation", "faith", "assurance"],
    books: ["John", "1 John", "Romans"],
    answerCount: 18,
    upvotes: 67,
    views: 567,
    timestamp: "5 days ago",
    isAnswered: true,
    topAnswer: {
      author: "Pastor Sarah Mitchell",
      preview:
        "Genuine salvation is evidenced by a transformed life, love for God and others, and the fruit of the Spirit...",
    },
  },
];

export const getQuestionById = (id: string): Question | undefined => {
  return demoQuestions.find((q) => q.id === id);
};

export const getAnswersForQuestion = (questionId: string): Answer[] => {
  const answers: Record<string, Answer[]> = {
    "1": [
      {
        id: "a1",
        answer:
          "Walking by faith means trusting in God's promises and character even when circumstances suggest otherwise. It's about living with an eternal perspective, recognizing that what we see with our physical eyes is temporary, but what we believe by faith is eternal and true.\n\nThis verse calls us to rely on God's word rather than our feelings or what appears to be reality. When we walk by faith, we act on what God says is true, not what our circumstances tell us.",
        author: {
          name: "Pastor John Davis",
          username: "pastorjohn",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
          reputation: 3400,
          level: 10,
          isVerified: true,
        },
        upvotes: 89,
        downvotes: 2,
        verses: [
          {
            book: "2 Corinthians",
            chapter: 5,
            verse: 7,
            text: "For we live by faith, not by sight.",
          },
          {
            book: "Hebrews",
            chapter: 11,
            verse: 1,
            text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
          },
        ],
        timestamp: "1 hour ago",
        isTopAnswer: true,
      },
      {
        id: "a2",
        answer:
          "I think it means we should trust God even when things don't make sense. Like when Job went through all that suffering, he couldn't see why, but he trusted God anyway.",
        author: {
          name: "Maria Garcia",
          username: "mariag",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
          reputation: 780,
          level: 5,
          isVerified: false,
        },
        upvotes: 23,
        downvotes: 1,
        verses: [
          {
            book: "Job",
            chapter: 1,
            verse: 21,
            text: "The Lord gave and the Lord has taken away; may the name of the Lord be praised.",
          },
        ],
        timestamp: "3 hours ago",
        isTopAnswer: false,
      },
    ],
    "2": [
      {
        id: "a3",
        answer:
          "The Bible provides clear guidance on responding to persecution with grace, prayer, and unwavering faith. Jesus himself taught us to \"bless those who curse you\" and to pray for our enemies. This doesn't mean we should be passive, but rather that our response should reflect Christ's character.\n\nKey principles include: praying for persecutors, maintaining our witness, rejoicing in suffering, and trusting God's sovereignty. The early church in Acts provides excellent examples of this.",
        author: {
          name: "Dr. Elizabeth Thompson",
          username: "elizabetht",
          avatar:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces",
          reputation: 2800,
          level: 9,
          isVerified: true,
        },
        upvotes: 67,
        downvotes: 3,
        verses: [
          {
            book: "Matthew",
            chapter: 5,
            verse: 44,
            text: "But I tell you, love your enemies and pray for those who persecute you.",
          },
          {
            book: "1 Peter",
            chapter: 4,
            verse: 12,
            text: "Dear friends, do not be surprised at the fiery ordeal that has come on you to test you, as though something strange were happening to you.",
          },
        ],
        timestamp: "4 hours ago",
        isTopAnswer: true,
      },
    ],
    "3": [
      {
        id: "a4",
        answer:
          'Spiritual gifts are indeed active today, as Paul teaches in 1 Corinthians 12-14. The key is understanding their purpose: to build up the body of Christ and glorify God.\n\nPaul lists various gifts including prophecy, teaching, healing, tongues, and more. These are given by the Holy Spirit "as he determines" for the common good. The cessationist view that gifts ended with the apostles isn\'t supported by Scripture.',
        author: {
          name: "Rev. James Wilson",
          username: "revjames",
          avatar:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces",
          reputation: 4200,
          level: 10,
          isVerified: true,
        },
        upvotes: 124,
        downvotes: 8,
        verses: [
          {
            book: "1 Corinthians",
            chapter: 12,
            verse: 7,
            text: "Now to each one the manifestation of the Spirit is given for the common good.",
          },
          {
            book: "1 Corinthians",
            chapter: 12,
            verse: 11,
            text: "All these are the work of one and the same Spirit, and he distributes them to each one, just as he determines.",
          },
        ],
        timestamp: "2 hours ago",
        isTopAnswer: true,
      },
    ],
    "4": [
      {
        id: "a5",
        answer:
          "The Trinity is one God in three persons: Father, Son, and Holy Spirit. Each is fully God, yet distinct. Think of it like water: same substance (H2O), but can exist as ice, liquid, or vapor.\n\nScripture shows all three as divine: The Father sends the Son, the Son obeys the Father, and the Spirit proceeds from both. Yet there is only one God (Deuteronomy 6:4). This is a mystery we accept by faith.",
        author: {
          name: "Theology Professor Mark",
          username: "profmark",
          avatar:
            "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=faces",
          reputation: 3800,
          level: 10,
          isVerified: true,
        },
        upvotes: 98,
        downvotes: 5,
        verses: [
          {
            book: "Matthew",
            chapter: 28,
            verse: 19,
            text: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.",
          },
        ],
        timestamp: "1 day ago",
        isTopAnswer: true,
      },
    ],
    "6": [
      {
        id: "a6",
        answer:
          "Genuine salvation is evidenced by a transformed life, love for God and others, and the fruit of the Spirit. As 1 John teaches, we can have assurance through:\n\n1. Obedience to God's commands (1 John 2:3)\n2. Love for fellow believers (1 John 3:14)\n3. The witness of the Spirit (1 John 4:13)\n4. Confession of Jesus as Lord (1 John 4:15)\n\nIf you're concerned about your salvation, that concern itself may be evidence of the Spirit's work in you.",
        author: {
          name: "Pastor Sarah Mitchell",
          username: "pastorsarah",
          avatar:
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=faces",
          reputation: 2900,
          level: 9,
          isVerified: true,
        },
        upvotes: 156,
        downvotes: 4,
        verses: [
          {
            book: "1 John",
            chapter: 5,
            verse: 13,
            text: "I write these things to you who believe in the name of the Son of God so that you may know that you have eternal life.",
          },
          {
            book: "Romans",
            chapter: 8,
            verse: 16,
            text: "The Spirit himself testifies with our spirit that we are God's children.",
          },
        ],
        timestamp: "3 hours ago",
        isTopAnswer: true,
      },
    ],
  };

  return answers[questionId] || [];
};

// Categories/Spaces
export interface Space {
  id: string;
  name: string;
  description: string;
  icon: string;
  memberCount: number;
  questionCount: number;
  topics: string[];
}

export const demoSpaces: Space[] = [
  {
    id: "doctrine",
    name: "Christian Doctrine",
    description: "Deep discussions about core Christian beliefs and theology",
    icon: "📖",
    memberCount: 12450,
    questionCount: 3420,
    topics: ["Trinity", "Salvation", "Atonement", "Eschatology"],
  },
  {
    id: "apologetics",
    name: "Apologetics",
    description: "Defending the faith with reason and evidence",
    icon: "🛡️",
    memberCount: 8900,
    questionCount: 2150,
    topics: ["Evidence", "Philosophy", "Science", "History"],
  },
  {
    id: "devotionals",
    name: "Daily Devotionals",
    description: "Daily encouragement and Bible study",
    icon: "☀️",
    memberCount: 25600,
    questionCount: 8900,
    topics: ["Daily Reading", "Prayer", "Meditation", "Growth"],
  },
  {
    id: "relationships",
    name: "Christian Relationships",
    description: "Navigating relationships from a biblical perspective",
    icon: "💑",
    memberCount: 15200,
    questionCount: 4200,
    topics: ["Dating", "Marriage", "Friendship", "Family"],
  },
  {
    id: "church-history",
    name: "Church History",
    description: "Learning from the rich history of the Christian church",
    icon: "⛪",
    memberCount: 6700,
    questionCount: 1800,
    topics: ["Early Church", "Reformation", "Missions", "Theology"],
  },
  {
    id: "prayer",
    name: "Prayer & Intercession",
    description: "Growing in prayer and interceding for others",
    icon: "🙏",
    memberCount: 18900,
    questionCount: 5600,
    topics: ["Prayer Life", "Intercession", "Worship", "Spiritual Warfare"],
  },
];

// Notifications
export interface Notification {
  id: string;
  type:
    | "like"
    | "comment"
    | "follow"
    | "mention"
    | "answer"
    | "share"
    | "verse_shared";
  read: boolean;
  timestamp: string;
  users: Array<{
    name: string;
    username: string;
    avatar?: string;
  }>;
  content?: {
    type: "post" | "question" | "verse" | "answer";
    preview: string;
    id?: string;
  };
  action?: string;
}

export const demoNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    read: false,
    timestamp: "5m ago",
    users: [
      {
        name: "Sarah Mitchell",
        username: "sarahm",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
      },
      {
        name: "Michael Chen",
        username: "michaelc",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
      },
      { name: "David Rodriguez", username: "davidr" },
    ],
    content: {
      type: "verse",
      preview:
        '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."',
      id: "verse-123",
    },
  },
  {
    id: "2",
    type: "comment",
    read: false,
    timestamp: "12m ago",
    users: [
      {
        name: "Pastor John Davis",
        username: "pastorjohn",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
      },
    ],
    content: {
      type: "post",
      preview: "Meditating on this verse today. God's love is truly amazing!",
      id: "post-456",
    },
    action: 'commented: "Amen! This verse has been such a blessing to me too."',
  },
  {
    id: "3",
    type: "follow",
    read: false,
    timestamp: "1h ago",
    users: [
      {
        name: "Jessica Williams",
        username: "jessicaw",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
      },
      { name: "Robert Taylor", username: "robertt" },
    ],
  },
  {
    id: "4",
    type: "answer",
    read: true,
    timestamp: "2h ago",
    users: [
      {
        name: "Dr. Elizabeth Thompson",
        username: "elizabetht",
        avatar:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=faces",
      },
    ],
    content: {
      type: "question",
      preview:
        'What does it mean to "walk by faith, not by sight" in 2 Corinthians 5:7?',
      id: "question-789",
    },
  },
  {
    id: "5",
    type: "mention",
    read: true,
    timestamp: "3h ago",
    users: [
      {
        name: "Michael Chen",
        username: "michaelc",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
      },
    ],
    content: {
      type: "post",
      preview: "Just shared an amazing verse! @you should check it out.",
      id: "post-101",
    },
  },
  {
    id: "6",
    type: "share",
    read: true,
    timestamp: "4h ago",
    users: [
      {
        name: "Sarah Mitchell",
        username: "sarahm",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
      },
    ],
    content: {
      type: "verse",
      preview:
        '"Trust in the Lord with all your heart and lean not on your own understanding."',
      id: "verse-234",
    },
  },
  {
    id: "7",
    type: "like",
    read: true,
    timestamp: "5h ago",
    users: [{ name: "David Rodriguez", username: "davidr" }],
    content: {
      type: "answer",
      preview:
        "Walking by faith means trusting in God's promises and character even when circumstances suggest otherwise...",
      id: "answer-345",
    },
  },
  {
    id: "8",
    type: "verse_shared",
    read: true,
    timestamp: "6h ago",
    users: [
      {
        name: "Pastor John Davis",
        username: "pastorjohn",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
      },
    ],
    content: {
      type: "verse",
      preview: '"Be still, and know that I am God." - Psalm 46:10',
      id: "verse-567",
    },
  },
  {
    id: "9",
    type: "comment",
    read: true,
    timestamp: "1d ago",
    users: [
      {
        name: "Jessica Williams",
        username: "jessicaw",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
      },
    ],
    content: {
      type: "question",
      preview:
        "How should Christians respond to persecution according to the Bible?",
      id: "question-890",
    },
    action:
      'commented: "Great question! I think the key is to respond with love and prayer."',
  },
  {
    id: "10",
    type: "follow",
    read: true,
    timestamp: "2d ago",
    users: [{ name: "Robert Taylor", username: "robertt" }],
  },
];
