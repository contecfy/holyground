# API Integration Guide

This directory contains all API-related code for the HolyGround platform.

## Structure

```
lib/api/
├── types.ts          # TypeScript types for API requests/responses
├── client.ts         # Axios client with interceptors
├── auth.ts           # Authentication API functions
└── users.ts          # User API functions
```

## Setup

1. **Environment Variables**: Create a `.env.local` file with:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

2. **API Client**: The `client.ts` file automatically:
   - Adds Bearer token to all requests
   - Handles token refresh on 401 errors
   - Manages error responses

## Usage

### Authentication

```typescript
import { useLogin, useRegister, useLogout } from "@/hooks/useAuth";

// Login
const loginMutation = useLogin();
await loginMutation.mutateAsync({
  emailOrUsername: "user@example.com",
  password: "password123",
});

// Register
const registerMutation = useRegister();
await registerMutation.mutateAsync({
  email: "user@example.com",
  username: "username",
  password: "Password123",
  firstName: "John",
  lastName: "Doe",
});

// Logout
const logoutMutation = useLogout();
await logoutMutation.mutateAsync();
```

### User Operations

```typescript
import { useMe, useUpdateProfile } from "@/hooks/useUser";

// Get current user
const { data: user, isLoading } = useMe();

// Update profile
const updateMutation = useUpdateProfile();
await updateMutation.mutateAsync({
  firstName: "Jane",
  bio: "Updated bio",
});
```

### Auth Store (Zustand)

```typescript
import { useAuthStore } from "@/stores/auth-store";

// Access auth state
const { user, isAuthenticated, tokens } = useAuthStore();

// Manual actions (usually handled by hooks)
const { setAuth, logout } = useAuthStore();
```

## Features

- ✅ Automatic token refresh
- ✅ Persistent authentication (survives page reloads)
- ✅ Type-safe API calls
- ✅ Error handling
- ✅ Loading states
- ✅ React Query caching
