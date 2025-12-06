# Post Schema

## Overview

This document defines the post module schema for the HolyGround backend. The platform uses a unified post system where all content (questions, discussions, etc.) are posts with different categories. Comments are called "answers" (similar to social media platforms).

**Key Concepts:**

- Everything is a post (no separate "questions" or other types)
- Posts have categories to differentiate content types
- Comments are called "answers"
- Engagement metrics: upvotes, downvotes, shares, bookmarks, answer count

---

## Core Post Schema

### Post Model

```typescript
{
  // Primary Identifiers
  id: string (UUID, Primary Key)
  slug: string (Unique, Indexed, URL-friendly version of title)

  // Author
  authorId: string (Foreign Key -> User.id, Indexed, Required)

  // Content
  title: string (Required, Max: 300, Indexed)
  content: string (Required, Max: 10000 characters)

  // Category & Classification
  category: string (Required, Indexed, e.g., "question", "discussion", "testimony", "prayer", "bible-study")
  tags: string[] (Array of tags, Indexed, Max: 10 tags)

  // Media
  media: Array<{
    id: string (UUID)
    type: "image" | "video" (Required)
    url: string (Required, URL to media file)
    thumbnail?: string (URL to thumbnail for videos)
    alt?: string (Alt text for images)
    order: number (Display order)
  }>

  // Bible Verses
  verses: Array<{
    book: string (Required, e.g., "John", "Romans")
    chapter: number (Required)
    verse: number | string (Required, e.g., 5 or "5-7" for ranges)
    text: string (Required, Verse text)
    translation?: string (e.g., "NIV", "KJV", "ESV")
  }>

  // Engagement Statistics (Denormalized for performance)
  upvoteCount: number (Default: 0, Indexed)
  downvoteCount: number (Default: 0)
  answerCount: number (Default: 0, Indexed) // Comments/Answers count
  shareCount: number (Default: 0)
  bookmarkCount: number (Default: 0)
  viewCount: number (Default: 0, Indexed)

  // Status & Moderation
  isPublished: boolean (Default: true, Indexed)
  isApproved: boolean (Default: false) // Moderation approval
  isPinned: boolean (Default: false) // Pinned by author or admin
  isLocked: boolean (Default: false) // Locked (no new answers)
  isDeleted: boolean (Default: false, Indexed) // Soft delete

  // Visibility
  visibility: "public" | "followers" | "private" (Default: "public", Indexed)

  // Metadata
  createdAt: Date (Indexed)
  updatedAt: Date
  publishedAt?: Date (When post was published)
  lastAnsweredAt?: Date (Last answer timestamp, Indexed)
  deletedAt?: Date
}
```

---

## Related Schemas

### Post Answers (Comments)

```typescript
{
  id: string (UUID, Primary Key)
  postId: string (Foreign Key -> Post.id, Indexed, Required)
  authorId: string (Foreign Key -> User.id, Indexed, Required)
  parentAnswerId?: string (Foreign Key -> Answer.id) // For nested replies

  // Content
  content: string (Required, Max: 5000 characters)

  // Media (Optional)
  media?: Array<{
    id: string (UUID)
    type: "image" | "video"
    url: string
    thumbnail?: string
    alt?: string
  }>

  // Bible Verses (Optional)
  verses?: Array<{
    book: string
    chapter: number
    verse: number | string
    text: string
    translation?: string
  }>

  // Engagement Statistics
  upvoteCount: number (Default: 0)
  downvoteCount: number (Default: 0)
  replyCount: number (Default: 0) // Nested replies count

  // Status
  isApproved: boolean (Default: false) // Moderation
  isDeleted: boolean (Default: false)
  isEdited: boolean (Default: false)
  editedAt?: Date

  // Metadata
  createdAt: Date (Indexed)
  updatedAt: Date
  deletedAt?: Date
}
```

### Post Upvotes

```typescript
{
  id: string (UUID, Primary Key)
  postId: string (Foreign Key -> Post.id, Indexed)
  userId: string (Foreign Key -> User.id, Indexed)
  createdAt: Date

  // Composite unique constraint on (postId, userId)
  // One upvote per user per post
}
```

### Post Downvotes

```typescript
{
  id: string (UUID, Primary Key)
  postId: string (Foreign Key -> Post.id, Indexed)
  userId: string (Foreign Key -> User.id, Indexed)
  createdAt: Date

  // Composite unique constraint on (postId, userId)
  // One downvote per user per post
  // User cannot upvote and downvote same post
}
```

### Post Shares

```typescript
{
  id: string (UUID, Primary Key)
  postId: string (Foreign Key -> Post.id, Indexed)
  userId: string (Foreign Key -> User.id, Indexed) // User who shared
  sharedTo?: string (e.g., "facebook", "twitter", "copy_link", "internal")
  message?: string (Optional message with share)
  createdAt: Date (Indexed)

  // No unique constraint - users can share multiple times
}
```

### Post Bookmarks

```typescript
{
  id: string (UUID, Primary Key)
  postId: string (Foreign Key -> Post.id, Indexed)
  userId: string (Foreign Key -> User.id, Indexed)
  createdAt: Date

  // Composite unique constraint on (postId, userId)
  // One bookmark per user per post
}
```

### Post Views

```typescript
{
  id: string (UUID, Primary Key)
  postId: string (Foreign Key -> Post.id, Indexed)
  userId?: string (Foreign Key -> User.id, Indexed) // Null for anonymous views
  ipAddress?: string (For anonymous tracking)
  userAgent?: string
  viewedAt: Date (Indexed)

  // Track unique views (user + post combination)
  // Consider aggregating old views for performance
}
```

### Answer Upvotes/Downvotes

```typescript
{
  id: string (UUID, Primary Key)
  answerId: string (Foreign Key -> Answer.id, Indexed)
  userId: string (Foreign Key -> User.id, Indexed)
  type: "upvote" | "downvote" (Required)
  createdAt: Date

  // Composite unique constraint on (answerId, userId, type)
  // User can only upvote OR downvote, not both
}
```

---

## Post Categories

### Available Categories

```typescript
type PostCategory =
  | "question" // Asking a question
  | "discussion" // General discussion
  | "testimony" // Personal testimony
  | "prayer" // Prayer request or prayer
  | "bible-study" // Bible study content
  | "devotional" // Devotional content
  | "announcement" // Church/community announcement
  | "event" // Event-related post
  | "other"; // Other content
```

---

## API Endpoints (Reference)

### Posts

- `GET /api/posts` - List posts (with filters, pagination, sorting)
- `GET /api/posts/search` - Search posts by title, content, tags
- `GET /api/posts/:id` - Get post details
- `GET /api/posts/:id/answers` - Get post answers (comments)
- `POST /api/posts` - Create new post
- `PATCH /api/posts/:id` - Update post (author only)
- `DELETE /api/posts/:id` - Delete post (soft delete, author only)
- `POST /api/posts/:id/pin` - Pin post (author/admin only)
- `POST /api/posts/:id/lock` - Lock post (author/admin only)

### Post Engagement

- `POST /api/posts/:id/upvote` - Upvote post
- `DELETE /api/posts/:id/upvote` - Remove upvote
- `POST /api/posts/:id/downvote` - Downvote post
- `DELETE /api/posts/:id/downvote` - Remove downvote
- `POST /api/posts/:id/share` - Share post
- `POST /api/posts/:id/bookmark` - Bookmark post
- `DELETE /api/posts/:id/bookmark` - Remove bookmark
- `GET /api/posts/:id/vote-status` - Get user's vote status (upvote/downvote/none)

### Answers (Comments)

- `POST /api/posts/:id/answers` - Create answer/comment
- `PATCH /api/posts/:id/answers/:answerId` - Update answer (author only)
- `DELETE /api/posts/:id/answers/:answerId` - Delete answer (soft delete, author only)
- `POST /api/posts/:id/answers/:answerId/upvote` - Upvote answer
- `POST /api/posts/:id/answers/:answerId/downvote` - Downvote answer
- `DELETE /api/posts/:id/answers/:answerId/vote` - Remove vote on answer
- `POST /api/posts/:id/answers/:answerId/reply` - Reply to answer (nested comment)

### User Posts

- `GET /api/users/:id/posts` - Get user's posts
- `GET /api/users/me/bookmarks` - Get user's bookmarked posts
- `GET /api/users/me/upvoted` - Get user's upvoted posts

---

## Database Indexes

### Recommended Indexes

```sql
-- Post table indexes
CREATE INDEX idx_post_author ON posts(author_id);
CREATE INDEX idx_post_category ON posts(category);
CREATE INDEX idx_post_created_at ON posts(created_at DESC);
CREATE INDEX idx_post_upvote_count ON posts(upvote_count DESC);
CREATE INDEX idx_post_answer_count ON posts(answer_count DESC);
CREATE INDEX idx_post_view_count ON posts(view_count DESC);
CREATE INDEX idx_post_last_answered ON posts(last_answered_at DESC) WHERE last_answered_at IS NOT NULL;
CREATE INDEX idx_post_is_published ON posts(is_published) WHERE is_published = true;
CREATE INDEX idx_post_visibility ON posts(visibility);
CREATE INDEX idx_post_tags ON posts USING GIN(tags); -- GIN index for array search

-- Full-text search index
CREATE INDEX idx_post_search ON posts USING GIN(
  to_tsvector('english', title || ' ' || content)
);

-- Answers table indexes
CREATE INDEX idx_answer_post ON answers(post_id, created_at DESC);
CREATE INDEX idx_answer_author ON answers(author_id);
CREATE INDEX idx_answer_parent ON answers(parent_answer_id) WHERE parent_answer_id IS NOT NULL;
CREATE INDEX idx_answer_upvote_count ON answers(upvote_count DESC);

-- Upvotes table indexes
CREATE INDEX idx_post_upvotes_post ON post_upvotes(post_id);
CREATE INDEX idx_post_upvotes_user ON post_upvotes(user_id);
CREATE UNIQUE INDEX idx_post_upvotes_unique ON post_upvotes(post_id, user_id);

-- Downvotes table indexes
CREATE INDEX idx_post_downvotes_post ON post_downvotes(post_id);
CREATE INDEX idx_post_downvotes_user ON post_downvotes(user_id);
CREATE UNIQUE INDEX idx_post_downvotes_unique ON post_downvotes(post_id, user_id);

-- Shares table indexes
CREATE INDEX idx_post_shares_post ON post_shares(post_id, created_at DESC);
CREATE INDEX idx_post_shares_user ON post_shares(user_id);

-- Bookmarks table indexes
CREATE INDEX idx_post_bookmarks_post ON post_bookmarks(post_id);
CREATE INDEX idx_post_bookmarks_user ON post_bookmarks(user_id, created_at DESC);
CREATE UNIQUE INDEX idx_post_bookmarks_unique ON post_bookmarks(post_id, user_id);

-- Views table indexes
CREATE INDEX idx_post_views_post ON post_views(post_id);
CREATE INDEX idx_post_views_user ON post_views(user_id);
CREATE INDEX idx_post_views_date ON post_views(viewed_at DESC);

-- Answer votes indexes
CREATE INDEX idx_answer_votes_answer ON answer_votes(answer_id);
CREATE INDEX idx_answer_votes_user ON answer_votes(user_id);
CREATE UNIQUE INDEX idx_answer_votes_unique ON answer_votes(answer_id, user_id, type);
```

---

## Validation Rules

### Post Title

- Minimum 10 characters
- Maximum 300 characters
- Cannot be empty or only whitespace
- Trimmed of leading/trailing whitespace

### Post Content

- Minimum 20 characters
- Maximum 10,000 characters
- Supports markdown formatting
- HTML sanitization required

### Category

- Must be from predefined list
- Required field
- Case-sensitive

### Tags

- Maximum 10 tags per post
- Each tag: 2-30 characters
- Alphanumeric, hyphens, underscores only
- Case-insensitive (normalize to lowercase)
- Trimmed of whitespace

### Media

- Maximum 10 media items per post
- **Images**: JPEG, PNG, WebP, GIF
  - Max file size: 10MB per image
  - Recommended dimensions: 1200x1200px max
- **Videos**: MP4, WebM
  - Max file size: 100MB per video
  - Max duration: 5 minutes
  - Thumbnail required for videos

### Bible Verses

- Book name must be valid Bible book
- Chapter must be positive integer within book's range
- Verse can be single number or range (e.g., "5" or "5-7")
- Text is required and should match the verse
- Translation is optional (defaults to "NIV" if not specified)

### Answer Content

- Minimum 10 characters
- Maximum 5,000 characters
- Supports markdown formatting
- HTML sanitization required

---

## Search & Filtering

### Search Parameters

```typescript
{
  query?: string // Search by title, content, or tags
  category?: string // Filter by category
  tags?: string[] // Filter by tags (AND logic)
  authorId?: string // Filter by author
  hasMedia?: boolean // Posts with media only
  hasVerses?: boolean // Posts with Bible verses only
  minUpvotes?: number
  minAnswers?: number
  dateFrom?: Date
  dateTo?: Date
  sortBy?: "recent" | "popular" | "trending" | "upvotes" | "answers" | "views"
  sortOrder?: "asc" | "desc"
  page?: number
  limit?: number (Default: 20, Max: 100)
}
```

### Sorting Options

1. **Recent** (Default): `createdAt DESC`
2. **Popular**: `(upvoteCount * 2 + answerCount + viewCount) DESC`
3. **Trending**: Weighted score based on recent activity
4. **Upvotes**: `upvoteCount DESC`
5. **Answers**: `answerCount DESC`
6. **Views**: `viewCount DESC`

---

## Engagement Logic

### Upvote/Downvote Rules

1. **Mutual Exclusivity**
   - User can either upvote OR downvote, not both
   - Changing vote removes previous vote and applies new one

2. **Vote Removal**
   - User can remove their vote (upvote or downvote)
   - Removing vote decrements the count

3. **Reputation Impact**
   - Post upvote: +5 reputation to author
   - Post downvote: -2 reputation to author
   - Answer upvote: +10 reputation to author
   - Answer downvote: -5 reputation to author

### Share Tracking

- Track all shares (internal and external)
- Increment `shareCount` on each share
- Store share metadata (platform, timestamp, user)

### Bookmark Tracking

- One bookmark per user per post
- Increment/decrement `bookmarkCount` on bookmark/unbookmark
- Used for "Saved" or "Bookmarked" posts feature

### View Tracking

- Track unique views per user
- Aggregate anonymous views by IP (with rate limiting)
- Increment `viewCount` for unique views
- Consider aggregating old views for performance

---

## Moderation & Content Policy

### Post Moderation

1. **Auto-Approval**
   - Posts from verified users can be auto-approved
   - Posts with no flagged content can be auto-approved

2. **Manual Review**
   - Posts flagged by users require review
   - Posts with certain keywords require review
   - Posts from new users may require review

3. **Content Policies**
   - No spam or promotional content
   - No hate speech or harassment
   - No explicit or inappropriate content
   - Respectful discussion required

### Answer Moderation

- Answers follow same moderation rules as posts
- Nested replies (replies to answers) also moderated
- Author can moderate answers on their posts (optional)

---

## Statistics & Analytics

### Tracked Metrics

- Total posts by category
- Posts by author
- Average engagement per post
- Most upvoted posts
- Most answered posts
- Most shared posts
- Trending posts (based on recent activity)
- Posts with most views

### Denormalized Counts

The following counts are denormalized for performance:

- `upvoteCount` - Updated when votes change
- `downvoteCount` - Updated when votes change
- `answerCount` - Updated when answers are created/deleted
- `shareCount` - Updated when post is shared
- `bookmarkCount` - Updated when bookmarked/unbookmarked
- `viewCount` - Updated periodically (not real-time)

---

## Security Considerations

1. **Content Validation**
   - Sanitize all user input (HTML, markdown)
   - Validate media file types and sizes
   - Scan for malicious content

2. **Rate Limiting**
   - Post creation: 10 per hour per user
   - Answer creation: 30 per hour per user
   - Vote actions: 100 per hour per user
   - Share actions: 50 per hour per user

3. **Spam Prevention**
   - Detect duplicate content
   - Limit posts from new accounts
   - Monitor for spam patterns

4. **Access Control**
   - Only author can edit/delete their posts
   - Only author can pin/lock their posts
   - Admins can moderate any post
   - Respect visibility settings (public/followers/private)

5. **Data Privacy**
   - Soft delete posts (retain for moderation)
   - Anonymize deleted user content
   - Respect user privacy settings

---

## Notes

- All timestamps should be stored in UTC
- Use UUIDs for primary keys
- Implement caching for popular posts
- Consider implementing full-text search (PostgreSQL, Elasticsearch)
- Media files should be stored in cloud storage (S3, Cloudinary, etc.)
- Bible verse validation should use a Bible database/API
- Consider implementing post drafts (save without publishing)
- Trending algorithm should weight recent activity higher
- Consider implementing post collections/threads
- Answer nesting should be limited (e.g., max 3 levels deep)
- Implement post expiration for certain categories (e.g., events)
