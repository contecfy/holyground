# User Schema

## Overview

This document defines the user module schema for the HolyGround backend. The user module handles authentication, profiles, social features, and user engagement metrics.

---

## Core User Schema

### User Model

```typescript
{
  // Primary Identifiers
  id: string (UUID, Primary Key)
  email: string (Unique, Indexed, Required)
  username: string (Unique, Indexed, Required, Min: 3, Max: 30, Alphanumeric + underscore)

  // Authentication
  passwordHash: string (Required, Bcrypt)
  emailVerified: boolean (Default: false)
  emailVerificationToken?: string
  emailVerificationExpires?: Date
  passwordResetToken?: string
  passwordResetExpires?: Date
  refreshToken?: string
  refreshTokenExpires?: Date

  // Profile Information
  firstName: string (Required, Max: 50)
  lastName: string (Required, Max: 50)
  displayName?: string (Max: 100) // Optional custom display name
  bio?: string (Max: 500)
  avatar?: string (URL to avatar image)
  coverImage?: string (URL to cover image)

  // Account Status
  isActive: boolean (Default: true)
  isVerified: boolean (Default: false) // Verified badge status
  isBanned: boolean (Default: false)
  banReason?: string
  bannedUntil?: Date

  // User Stats (Denormalized for performance)
  reputation: number (Default: 0, Indexed)
  level: number (Default: 1, Indexed)
  postsCount: number (Default: 0)
  questionsCount: number (Default: 0)
  answersCount: number (Default: 0)
  upvotesReceived: number (Default: 0)
  followersCount: number (Default: 0)
  followingCount: number (Default: 0)

  // Preferences
  preferences: {
    emailNotifications: boolean (Default: true)
    pushNotifications: boolean (Default: true)
    publicProfile: boolean (Default: true)
    showEmail: boolean (Default: false)
    showReputation: boolean (Default: true)
    theme: "light" | "dark" | "auto" (Default: "auto")
    language: string (Default: "en")
  }

  // Metadata
  lastLoginAt?: Date
  lastActiveAt?: Date
  createdAt: Date (Indexed)
  updatedAt: Date
  deletedAt?: Date (Soft delete)
}
```

---

## Related Schemas

### User Follows (Many-to-Many Relationship)

```typescript
{
  id: string (UUID, Primary Key)
  followerId: string (Foreign Key -> User.id, Indexed)
  followingId: string (Foreign Key -> User.id, Indexed)
  createdAt: Date

  // Composite unique constraint on (followerId, followingId)
  // Prevent self-follows
}
```

### User Settings

```typescript
{
  id: string (UUID, Primary Key)
  userId: string (Foreign Key -> User.id, Unique)

  // Privacy Settings
  profileVisibility: "public" | "followers" | "private" (Default: "public")
  showOnlineStatus: boolean (Default: true)
  allowDirectMessages: "everyone" | "followers" | "none" (Default: "everyone")

  // Content Settings
  defaultPostVisibility: "public" | "followers" | "private" (Default: "public")
  autoApproveFollowers: boolean (Default: false)

  // Notification Preferences (Detailed)
  notifications: {
    email: {
      newFollower: boolean
      newMessage: boolean
      newAnswer: boolean
      newComment: boolean
      newLike: boolean
      prayerRequest: boolean
      weeklyDigest: boolean
    }
    push: {
      newFollower: boolean
      newMessage: boolean
      newAnswer: boolean
      newComment: boolean
      newLike: boolean
      prayerRequest: boolean
    }
  }

  // Blocked Users
  blockedUserIds: string[] (Array of User IDs)

  createdAt: Date
  updatedAt: Date
}
```

### User Activity Log

```typescript
{
  id: string (UUID, Primary Key)
  userId: string (Foreign Key -> User.id, Indexed)
  activityType: string (e.g., "login", "post_created", "question_answered")
  metadata?: JSON (Additional activity-specific data)
  ipAddress?: string
  userAgent?: string
  createdAt: Date (Indexed)
}
```

### User Badges/Achievements

```typescript
{
  id: string (UUID, Primary Key)
  userId: string (Foreign Key -> User.id, Indexed)
  badgeId: string (Foreign Key -> Badge.id)
  earnedAt: Date

  // Composite unique constraint on (userId, badgeId)
}
```

---

## Authentication & Security

### Registration Flow

1. **Email/Username Validation**
   - Check email uniqueness
   - Check username uniqueness and format
   - Validate email format

2. **Password Requirements**
   - Minimum 8 characters
   - At least one uppercase, one lowercase, one number
   - Optional: special character requirement

3. **Email Verification**
   - Generate verification token
   - Send verification email
   - Token expires in 24 hours

### Login Flow

1. **Credentials Validation**
   - Find user by email or username
   - Verify password hash
   - Check if account is active and not banned

2. **Token Generation**
   - Generate JWT access token (15 min expiry)
   - Generate refresh token (7 days expiry)
   - Store refresh token hash in database

3. **Session Management**
   - Update lastLoginAt
   - Update lastActiveAt
   - Log login activity

### Password Reset Flow

1. **Request Reset**
   - Validate email exists
   - Generate reset token
   - Send reset email
   - Token expires in 1 hour

2. **Reset Password**
   - Validate token
   - Check expiration
   - Update password hash
   - Invalidate all refresh tokens

---

## Reputation & Leveling System

### Reputation Calculation

Reputation points are awarded for:

- Post upvote: +5 points
- Answer upvote: +10 points
- Answer marked as accepted: +25 points
- Question upvote: +3 points
- Post downvote: -2 points (to author)
- Answer downvote: -5 points (to author)

### Level Calculation

Levels are calculated based on reputation:

- Level 1: 0-99 reputation
- Level 2: 100-299 reputation
- Level 3: 300-599 reputation
- Level 4: 600-999 reputation
- Level 5: 1000-1499 reputation
- Level 6: 1500-2199 reputation
- Level 7: 2200-2999 reputation
- Level 8: 3000-3999 reputation
- Level 9: 4000-4999 reputation
- Level 10: 5000+ reputation

---

## API Endpoints (Reference)

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/verify-email` - Verify email address

### User Profile

- `GET /api/users/:id` - Get user profile (public)
- `GET /api/users/me` - Get current user profile
- `PATCH /api/users/me` - Update current user profile
- `GET /api/users/:id/stats` - Get user statistics
- `GET /api/users/:id/posts` - Get user posts
- `GET /api/users/:id/questions` - Get user questions
- `GET /api/users/:id/answers` - Get user answers

### Social Features

- `GET /api/users/:id/followers` - Get user followers
- `GET /api/users/:id/following` - Get users being followed
- `POST /api/users/:id/follow` - Follow a user
- `DELETE /api/users/:id/follow` - Unfollow a user
- `GET /api/users/:id/follow-status` - Check follow status

### Settings

- `GET /api/users/me/settings` - Get user settings
- `PATCH /api/users/me/settings` - Update user settings
- `POST /api/users/:id/block` - Block a user
- `DELETE /api/users/:id/block` - Unblock a user

---

## Database Indexes

### Recommended Indexes

```sql
-- User table indexes
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_username ON users(username);
CREATE INDEX idx_user_reputation ON users(reputation DESC);
CREATE INDEX idx_user_level ON users(level DESC);
CREATE INDEX idx_user_created_at ON users(created_at DESC);
CREATE INDEX idx_user_active ON users(is_active) WHERE is_active = true;

-- Follows table indexes
CREATE INDEX idx_follows_follower ON user_follows(follower_id);
CREATE INDEX idx_follows_following ON user_follows(following_id);
CREATE UNIQUE INDEX idx_follows_unique ON user_follows(follower_id, following_id);

-- Activity log indexes
CREATE INDEX idx_activity_user ON user_activity(user_id, created_at DESC);
```

---

## Validation Rules

### Username

- Minimum 3 characters
- Maximum 30 characters
- Alphanumeric characters and underscores only
- Cannot start or end with underscore
- Reserved usernames: admin, administrator, root, system, api, www, mail, support

### Email

- Valid email format
- Maximum 255 characters
- Case-insensitive uniqueness

### Display Name

- Maximum 100 characters
- Can contain spaces and special characters
- Trimmed of leading/trailing whitespace

### Bio

- Maximum 500 characters
- Supports line breaks
- HTML sanitization required if allowing HTML

---

## Security Considerations

1. **Password Storage**
   - Never store plain text passwords
   - Use bcrypt with cost factor 12
   - Salt is automatically handled by bcrypt

2. **Token Security**
   - Store refresh tokens as hashes
   - Implement token rotation
   - Set appropriate expiration times
   - Use HTTP-only cookies for refresh tokens (optional)

3. **Rate Limiting**
   - Login attempts: 5 per 15 minutes per IP
   - Registration: 3 per hour per IP
   - Password reset: 3 per hour per email

4. **Data Privacy**
   - Implement soft deletes
   - Anonymize user data on deletion (GDPR compliance)
   - Encrypt sensitive fields if required

5. **Email Verification**
   - Require email verification before full account access
   - Limit actions for unverified accounts

---

## Notes

- All timestamps should be stored in UTC
- Use UUIDs for primary keys to avoid enumeration attacks
- Implement proper CORS policies
- Consider implementing 2FA for enhanced security
- Reputation and level should be recalculated periodically to ensure accuracy
- Consider implementing a caching layer for frequently accessed user data
