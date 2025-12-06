# Church Schema

## Overview

This document defines the church module schema for the HolyGround backend. The church module handles church listings, location-based search, and community features.

**Note**: Church member count is a manual input field provided by the church. The platform does NOT track individual user memberships to churches. Users can follow churches, but this is separate from membership.

---

## Core Church Schema

### Church Model

```typescript
{
  // Primary Identifiers
  id: string (UUID, Primary Key)
  name: string (Required, Max: 200, Indexed)
  slug: string (Unique, Indexed, URL-friendly version of name)

  // Denomination & Classification
  denomination: string (Indexed, e.g., "Baptist", "Catholic", "Non-denominational")
  tags: string[] (Array of tags, e.g., ["Contemporary Worship", "Children's Ministry", "Youth Group"])

  // Location Information
  address: string (Required, Street address)
  city: string (Required, Indexed)
  state: string (Required, Indexed)
  zipCode: string (Required)
  country: string (Required, Default: "US", Indexed)
  latitude: number (Required, Decimal(10, 8), Indexed for geospatial queries)
  longitude: number (Required, Decimal(11, 8), Indexed for geospatial queries)

  // Contact Information
  phone?: string (Formatted phone number)
  email?: string (Contact email, validated format)
  website?: string (URL, validated format)

  // Description & Content
  description?: string (Max: 2000 characters)
  shortDescription?: string (Max: 300 characters, for cards/previews)

  // Images
  image?: string (URL to profile/logo image)
  coverImage?: string (URL to cover/hero image)
  gallery?: string[] (Array of image URLs)

  // Leadership
  pastor?: string (Name of lead pastor/minister)
  pastorEmail?: string
  leadership?: Array<{
    name: string
    role: string
    email?: string
  }>

  // Service Times
  serviceTimes: Array<{
    day: string (e.g., "Sunday", "Wednesday")
    time: string (e.g., "9:00 AM")
    type?: string (e.g., "Morning Service", "Bible Study")
    description?: string
  }>

  // Statistics (Denormalized for performance)
  memberCount: number (Default: 0, Indexed) // Manual input by church admin, not tracked per user
  followerCount: number (Default: 0) // Users following this church (tracked)
  reviewCount: number (Default: 0)
  averageRating?: number (Decimal(3, 2), Calculated from reviews)

  // Status & Verification
  isActive: boolean (Default: true, Indexed)
  isVerified: boolean (Default: false, Indexed) // Verified by platform admins
  verificationDate?: Date
  verificationNotes?: string

  // Approval Workflow
  approvalStatus: "pending" | "approved" | "rejected" | "suspended" (Default: "pending", Indexed)
  submittedBy?: string (Foreign Key -> User.id) // User who submitted/created
  approvedBy?: string (Foreign Key -> User.id) // Admin who approved
  approvedAt?: Date
  rejectionReason?: string

  // Metadata
  createdAt: Date (Indexed)
  updatedAt: Date
  lastActivityAt?: Date (Last post/event/update)
  deletedAt?: Date (Soft delete)
}
```

---

## Related Schemas

### Church Followers

```typescript
{
  id: string (UUID, Primary Key)
  churchId: string (Foreign Key -> Church.id, Indexed)
  userId: string (Foreign Key -> User.id, Indexed)
  createdAt: Date

  // Composite unique constraint on (churchId, userId)
  // Prevent duplicate follows
}
```

### Church Service Times (Normalized)

```typescript
{
  id: string (UUID, Primary Key)
  churchId: string (Foreign Key -> Church.id, Indexed)
  dayOfWeek: number (0-6, 0 = Sunday, Indexed)
  time: string (Time format: "HH:MM")
  timeZone: string (Default: "America/Los_Angeles")
  type?: string (e.g., "Morning Service", "Bible Study")
  description?: string
  isRecurring: boolean (Default: true)
  startDate?: Date
  endDate?: Date
  createdAt: Date
  updatedAt: Date
}
```

### Church Reviews

```typescript
{
  id: string (UUID, Primary Key)
  churchId: string (Foreign Key -> Church.id, Indexed)
  userId: string (Foreign Key -> User.id, Indexed)
  rating: number (1-5, Required)
  title?: string (Max: 100)
  review: string (Max: 1000)
  isVerified: boolean (Default: false) // User actually attended
  helpfulCount: number (Default: 0) // Users who found review helpful
  isPublic: boolean (Default: true)
  isApproved: boolean (Default: false) // Moderation
  createdAt: Date (Indexed)
  updatedAt: Date
  deletedAt?: Date

  // Composite unique constraint on (churchId, userId)
  // One review per user per church
}
```

### Church Events

```typescript
{
  id: string (UUID, Primary Key)
  churchId: string (Foreign Key -> Church.id, Indexed)
  createdBy: string (Foreign Key -> User.id)
  title: string (Required, Max: 200)
  description?: string (Max: 2000)
  startDate: Date (Required, Indexed)
  endDate?: Date
  location?: string
  latitude?: number
  longitude?: number
  image?: string
  category: string (e.g., "Service", "Conference", "Workshop")
  isPublic: boolean (Default: true)
  attendeeCount: number (Default: 0)
  createdAt: Date
  updatedAt: Date
}
```

### Church Ministries/Programs

```typescript
{
  id: string (UUID, Primary Key)
  churchId: string (Foreign Key -> Church.id, Indexed)
  name: string (Required, Max: 200)
  description?: string (Max: 1000)
  category: string (e.g., "Children", "Youth", "Women", "Men", "Music")
  contactPerson?: string
  contactEmail?: string
  meetingTimes?: string[]
  image?: string
  isActive: boolean (Default: true)
  createdAt: Date
  updatedAt: Date
}
```

### Church Admins/Moderators

```typescript
{
  id: string (UUID, Primary Key)
  churchId: string (Foreign Key -> Church.id, Indexed)
  userId: string (Foreign Key -> User.id, Indexed)
  role: "admin" | "moderator" | "pastor" (Required, Indexed)
  permissions: string[] // Array of specific permissions if needed
  addedBy: string (Foreign Key -> User.id) // Who granted this role
  addedAt: Date
  removedAt?: Date
  isActive: boolean (Default: true)

  // Composite unique constraint on (churchId, userId)
  // Prevent duplicate admin assignments
}
```

**Note**: This is only for platform-level church management (editing church info, moderating content). It does NOT represent church membership. Member count is a manual input field.

---

## Geospatial Features

### Location Search

Churches support location-based search using:

- **PostGIS** (PostgreSQL) or **MongoDB Geospatial** indexes
- **Haversine formula** for distance calculations
- **Bounding box queries** for map views

### Distance Calculation

Distance is calculated in real-time based on user's location:

```typescript
distance: number; // in miles or kilometers (computed, not stored)
```

### Recommended Geospatial Index

```sql
-- PostgreSQL with PostGIS
CREATE INDEX idx_church_location ON churches USING GIST (
  ST_MakePoint(longitude, latitude)
);

-- MongoDB
db.churches.createIndex({ location: "2dsphere" });
```

---

## API Endpoints (Reference)

### Church Discovery

- `GET /api/churches` - List churches (with filters, pagination, sorting)
- `GET /api/churches/search` - Search churches by name, location, denomination
- `GET /api/churches/nearby` - Find churches near coordinates (radius search)
- `GET /api/churches/:id` - Get church details
- `GET /api/churches/:id/services` - Get church service times
- `GET /api/churches/:id/events` - Get church events
- `GET /api/churches/:id/ministries` - Get church ministries
- `GET /api/churches/:id/reviews` - Get church reviews

### Church Management (Authenticated)

- `POST /api/churches` - Create new church listing (requires approval)
- `PATCH /api/churches/:id` - Update church (church admin/moderator only)
- `DELETE /api/churches/:id` - Soft delete church (platform admin only)
- `POST /api/churches/:id/verify` - Verify church (platform admin only)
- `POST /api/churches/:id/approve` - Approve pending church (platform admin only)
- `POST /api/churches/:id/reject` - Reject pending church (platform admin only)

### Church Admin Management

- `GET /api/churches/:id/admins` - Get church admins/moderators (church admin only)
- `POST /api/churches/:id/admins` - Add church admin/moderator (church admin only)
- `PATCH /api/churches/:id/admins/:userId` - Update admin role (church admin only)
- `DELETE /api/churches/:id/admins/:userId` - Remove admin (church admin only, cannot remove pastor)

### Church Following

- `POST /api/churches/:id/follow` - Follow a church
- `DELETE /api/churches/:id/follow` - Unfollow a church
- `GET /api/churches/:id/follow-status` - Check follow status
- `GET /api/users/me/churches` - Get user's followed churches

### Church Reviews

- `POST /api/churches/:id/reviews` - Create review
- `PATCH /api/churches/:id/reviews/:reviewId` - Update own review
- `DELETE /api/churches/:id/reviews/:reviewId` - Delete own review
- `POST /api/churches/:id/reviews/:reviewId/helpful` - Mark review as helpful

### Church Events

- `POST /api/churches/:id/events` - Create event (follower/admin only)
- `PATCH /api/churches/:id/events/:eventId` - Update event
- `DELETE /api/churches/:id/events/:eventId` - Delete event
- `POST /api/churches/:id/events/:eventId/attend` - RSVP to event

---

## Database Indexes

### Recommended Indexes

```sql
-- Church table indexes
CREATE INDEX idx_church_name ON churches(name);
CREATE INDEX idx_church_slug ON churches(slug);
CREATE INDEX idx_church_denomination ON churches(denomination);
CREATE INDEX idx_church_city_state ON churches(city, state);
CREATE INDEX idx_church_country ON churches(country);
CREATE INDEX idx_church_approval_status ON churches(approval_status);
CREATE INDEX idx_church_is_active ON churches(is_active) WHERE is_active = true;
CREATE INDEX idx_church_is_verified ON churches(is_verified) WHERE is_verified = true;
CREATE INDEX idx_church_created_at ON churches(created_at DESC);
CREATE INDEX idx_church_member_count ON churches(member_count DESC);

-- Geospatial index (PostGIS)
CREATE INDEX idx_church_location ON churches USING GIST (
  ST_MakePoint(longitude, latitude)
);

-- Church Admins table indexes
CREATE INDEX idx_church_admins_church ON church_admins(church_id);
CREATE INDEX idx_church_admins_user ON church_admins(user_id);
CREATE INDEX idx_church_admins_role ON church_admins(role);
CREATE INDEX idx_church_admins_active ON church_admins(is_active) WHERE is_active = true;
CREATE UNIQUE INDEX idx_church_admins_unique ON church_admins(church_id, user_id);

-- Followers table indexes
CREATE INDEX idx_church_followers_church ON church_followers(church_id);
CREATE INDEX idx_church_followers_user ON church_followers(user_id);
CREATE UNIQUE INDEX idx_church_followers_unique ON church_followers(church_id, user_id);

-- Reviews table indexes
CREATE INDEX idx_church_reviews_church ON church_reviews(church_id, created_at DESC);
CREATE INDEX idx_church_reviews_user ON church_reviews(user_id);
CREATE INDEX idx_church_reviews_rating ON church_reviews(church_id, rating);
CREATE UNIQUE INDEX idx_church_reviews_unique ON church_reviews(church_id, user_id);

-- Service times indexes
CREATE INDEX idx_church_services_church ON church_service_times(church_id);
CREATE INDEX idx_church_services_day ON church_service_times(day_of_week);

-- Events indexes
CREATE INDEX idx_church_events_church ON church_events(church_id, start_date);
CREATE INDEX idx_church_events_upcoming ON church_events(start_date) WHERE start_date >= NOW();
```

---

## Validation Rules

### Church Name

- Minimum 3 characters
- Maximum 200 characters
- Cannot be empty or only whitespace
- Trimmed of leading/trailing whitespace

### Slug

- Auto-generated from name
- URL-friendly (lowercase, hyphens instead of spaces)
- Unique constraint
- Cannot be changed after creation

### Denomination

- Predefined list or free text
- Common denominations: Baptist, Catholic, Methodist, Presbyterian, Lutheran, Pentecostal, Anglican, Non-denominational, Other
- Case-insensitive matching

### Location

- **Address**: Required, max 500 characters
- **City**: Required, max 100 characters
- **State**: Required, max 100 characters (or province)
- **ZipCode**: Required, format validation based on country
- **Country**: Required, ISO 3166-1 alpha-2 code (e.g., "US", "UG")
- **Latitude**: Required, range -90 to 90
- **Longitude**: Required, range -180 to 180

### Contact Information

- **Phone**: Valid phone number format (international format preferred)
- **Email**: Valid email format, max 255 characters
- **Website**: Valid URL format, must include protocol (http/https)

### Service Times

- At least one service time required
- Day must be valid day of week
- Time must be valid time format
- No duplicate service times for same day/time

### Images

- **Image URLs**: Valid URL format
- **File size limits**: Recommend max 5MB per image
- **Supported formats**: JPEG, PNG, WebP
- **Dimensions**: Recommend min 400x400px for profile, 1200x600px for cover

---

## Search & Filtering

### Search Parameters

```typescript
{
  query?: string // Search by name, city, or address
  denomination?: string
  city?: string
  state?: string
  country?: string
  tags?: string[] // Filter by tags
  minMemberCount?: number
  maxMemberCount?: number
  isVerified?: boolean
  hasServiceToday?: boolean // Churches with services today
  latitude?: number // For nearby search
  longitude?: number // For nearby search
  radius?: number // In miles/kilometers
  sortBy?: "distance" | "memberCount" | "name" | "createdAt" | "rating"
  sortOrder?: "asc" | "desc"
  page?: number
  limit?: number (Default: 20, Max: 100)
}
```

### Sorting Options

1. **Distance** (requires lat/lng): Nearest first
2. **Member Count**: Most members first
3. **Name**: Alphabetical
4. **Created At**: Newest first
5. **Rating**: Highest rated first

---

## Approval Workflow

### Church Submission Process

1. **User Submits Church**
   - Status: "pending"
   - Requires: name, address, location coordinates
   - Optional: contact info, description, images

2. **Admin Review**
   - Admin reviews submission
   - Can approve, reject, or request more information
   - If approved: status → "approved", isActive → true
   - If rejected: status → "rejected", rejectionReason stored

3. **Verification** (Optional)
   - Admin can verify church (isVerified → true)
   - Verified churches get badge/indicator
   - Requires additional validation

### Auto-Approval Rules (Optional)

- Churches submitted by verified users can be auto-approved
- Churches with complete information can be auto-approved
- Churches in certain regions can be auto-approved

---

## Church Admin Roles & Permissions

### Roles (Platform-Level Management Only)

These roles are for managing the church listing on the platform, NOT for tracking church membership.

1. **Moderator**
   - Moderate posts/reviews
   - Manage events
   - Manage ministries
   - Update service times

2. **Admin**
   - All moderator permissions
   - Update church information (name, description, contact info, etc.)
   - Update member count (manual input)
   - Manage other admins/moderators
   - Manage church images

3. **Pastor**
   - All admin permissions
   - Cannot be removed (special status)
   - Official church representative on platform
   - Can claim/verify church ownership

---

## Statistics & Analytics

### Tracked Metrics

- Total churches
- Churches by denomination
- Churches by location (city/state/country)
- Average member count
- Churches with most members
- Most followed churches
- Churches with highest ratings
- New churches (last 30 days)

### Denormalized Counts

The following counts are denormalized for performance:

- `memberCount` - Manual input by church admin (not automatically tracked)
- `followerCount` - Updated when users follow/unfollow
- `reviewCount` - Updated when reviews are created/deleted
- `averageRating` - Recalculated when reviews change

---

## Security Considerations

1. **Location Privacy**
   - Exact coordinates can be obfuscated for privacy
   - Consider showing approximate location only

2. **Content Moderation**
   - Reviews require moderation before publication
   - User-generated content (descriptions, events) should be reviewed

3. **Spam Prevention**
   - Rate limiting on church creation
   - Verify email/phone for contact information
   - Monitor for duplicate submissions

4. **Data Validation**
   - Validate all location coordinates
   - Sanitize user input (descriptions, names)
   - Validate image URLs and file types

5. **Access Control**
   - Only admins can approve/verify churches
   - Only church admins can modify church details
   - Users can only edit their own reviews

---

## Notes

- All timestamps should be stored in UTC
- Use UUIDs for primary keys
- **Member count is a manual input field** - churches provide this number themselves. The platform does NOT track individual user memberships to churches.
- Users can follow churches (separate from membership) to stay updated on events and posts
- Implement caching for frequently accessed churches
- Consider implementing full-text search (PostgreSQL, Elasticsearch)
- Service times should respect timezone
- Distance calculations should use appropriate units (miles/km) based on region
- Consider implementing church "claiming" feature for official representatives
- Implement rate limiting on search endpoints
- Consider implementing church categories beyond denomination (size, style, etc.)
