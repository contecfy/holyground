/**
 * API Response Types
 * Standard response format from the backend
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: unknown;
}

/**
 * Authentication Types
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  displayName?: string;
}

export interface LoginRequest {
  emailOrUsername: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * User Types
 */
export interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  publicProfile: boolean;
  showEmail: boolean;
  showReputation: boolean;
  theme: "light" | "dark" | "auto";
  language: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  emailVerified: boolean;
  isActive: boolean;
  isVerified: boolean;
  isBanned: boolean;
  reputation: number;
  level: number;
  postsCount: number;
  questionsCount: number;
  answersCount: number;
  upvotesReceived: number;
  followersCount: number;
  followingCount: number;
  preferences: UserPreferences;
  lastLoginAt?: string;
  lastActiveAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
}

export interface UpdatePreferencesRequest {
  preferences?: Partial<UserPreferences>;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

/**
 * Post Types
 */
export type PostCategory =
  | "question"
  | "discussion"
  | "testimony"
  | "prayer"
  | "bible-study"
  | "devotional"
  | "announcement"
  | "event"
  | "other";

export type PostVisibility = "public" | "followers" | "private";

export interface PostMedia {
  id?: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  alt?: string;
  order: number;
}

export interface PostVerse {
  book: string;
  chapter: number;
  verse: number | string;
  text: string;
  translation?: string;
}

export interface Post {
  id: string;
  slug: string;
  authorId: string;
  title: string;
  content: string;
  category: PostCategory;
  tags: string[];
  media: PostMedia[];
  verses: PostVerse[];
  upvoteCount: number;
  downvoteCount: number;
  answerCount: number;
  shareCount: number;
  bookmarkCount: number;
  viewCount: number;
  isPublished: boolean;
  isApproved: boolean;
  isPinned: boolean;
  isLocked: boolean;
  visibility: PostVisibility;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  lastAnsweredAt?: string;
  // Populated fields (when included)
  author?: User;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  category: PostCategory;
  tags?: string[];
  media?: PostMedia[];
  verses?: PostVerse[];
  visibility?: PostVisibility;
  isPublished?: boolean;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  category?: PostCategory;
  tags?: string[];
  media?: PostMedia[];
  verses?: PostVerse[];
  visibility?: PostVisibility;
  isPublished?: boolean;
}

export interface ListPostsParams {
  page?: number;
  limit?: number;
  category?: PostCategory;
  tags?: string; // Comma-separated
  authorId?: string;
  search?: string;
  sortBy?: "recent" | "popular" | "trending" | "upvotes" | "answers" | "views";
  sortOrder?: "asc" | "desc";
  hasMedia?: boolean;
  hasVerses?: boolean;
}

export interface ListPostsResponse {
  posts: Post[];
  total: number;
  page: number;
  totalPages: number;
}

/**
 * Answer Types
 */
export interface Answer {
  id: string;
  postId: string;
  authorId: string;
  parentAnswerId?: string;
  content: string;
  media?: PostMedia[];
  verses?: PostVerse[];
  upvoteCount: number;
  downvoteCount: number;
  replyCount: number;
  isApproved: boolean;
  isDeleted: boolean;
  isEdited: boolean;
  editedAt?: string;
  createdAt: string;
  updatedAt: string;
  // Populated fields
  author?: User;
}

export interface CreateAnswerRequest {
  content: string;
  media?: PostMedia[];
  verses?: PostVerse[];
  parentAnswerId?: string;
}

export interface UpdateAnswerRequest {
  content?: string;
  media?: PostMedia[];
  verses?: PostVerse[];
}

export interface ListAnswersResponse {
  answers: Answer[];
  total: number;
  page: number;
  totalPages: number;
}

export type VoteStatus = "upvote" | "downvote" | "none";
