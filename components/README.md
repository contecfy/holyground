# Yalor Components

A collection of reusable components for the Yalor Bible social media app, featuring a beautiful color palette inspired by aged Bible paper.

## Color Palette

The components use a carefully crafted color scheme:

- **Background**: Soft cream/white (`#faf8f5`)
- **Paper tones**: Light (`#f5f1eb`), Medium (`#e8dfd0`), Dark (`#d4c4b0`)
- **Browns**: Light (`#c9a882`), Medium (`#8b6f47`), Dark (`#5d4a2f`), Darker (`#3d2817`)
- **Text**: Primary (`#3d2817`), Secondary (`#6b5d4a`)

## Components

### UI Components (`/ui`)

#### Button

A versatile button component with multiple variants, sizes, and types.

```tsx
import { Button } from "@/components/ui";

<Button
  buttonType="primary"
  buttonSize="medium"
  buttonVariant="solid"
  buttonShape="rounded"
  buttonText="Click Me"
  buttonIcon={<span>❤️</span>}
  iconPosition="left"
/>;
```

#### Avatar

User profile avatars with status indicators.

```tsx
import { Avatar } from "@/components/ui";

<Avatar src="/avatar.jpg" name="John Doe" size="md" status="online" />;
```

#### Card

Container component with multiple variants.

```tsx
import { Card } from "@/components/ui";

<Card variant="paper">
  <p>Your content here</p>
</Card>;
```

#### Input & Textarea

Form input components with variants and icons.

```tsx
import { Input, Textarea } from '@/components/ui';

<Input
  label="Email"
  placeholder="Enter your email"
  leftIcon={<span>✉️</span>}
  variant="filled"
/>

<Textarea
  label="Message"
  placeholder="Type your message"
  variant="default"
/>
```

#### Badge

Small label component for tags and categories.

```tsx
import { Badge } from "@/components/ui";

<Badge variant="primary" size="md">
  New Testament
</Badge>;
```

#### SearchBar

Search input with icon and search functionality.

```tsx
import { SearchBar } from "@/components/ui";

<SearchBar
  placeholder="Search verses..."
  onSearch={(value) => console.log(value)}
/>;
```

### Common Components (`/common`)

#### PostCard

Social media post component with verse support.

```tsx
import { PostCard } from "@/components/common";

<PostCard
  author={{
    name: "John Doe",
    username: "johndoe",
    avatar: "/avatar.jpg",
  }}
  content="This is a beautiful verse that touched my heart."
  timestamp="2 hours ago"
  likes={42}
  comments={12}
  shares={5}
  verse={{
    book: "John",
    chapter: 3,
    verse: 16,
    text: "For God so loved the world...",
  }}
/>;
```

#### VerseCard

Dedicated component for displaying Bible verses beautifully.

```tsx
import { VerseCard } from "@/components/common";

<VerseCard
  book="John"
  chapter={3}
  verse={16}
  text="For God so loved the world that he gave his one and only Son..."
  translation="NIV"
  onShare={() => {}}
  onSave={() => {}}
/>;
```

#### CreatePost

Component for creating new posts.

```tsx
import { CreatePost } from "@/components/common";

<CreatePost
  user={{
    name: "John Doe",
    avatar: "/avatar.jpg",
  }}
  onSubmit={(content) => console.log(content)}
/>;
```

### Navigation Components (`/navigation`)

#### Header

Main navigation header with logo and menu.

```tsx
import { Header } from "@/components/navigation";

<Header />;
```

## Usage Examples

### Complete Feed Page

```tsx
import { Header } from "@/components/navigation";
import { CreatePost, PostCard } from "@/components/common";
import { SearchBar } from "@/components/ui";

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <SearchBar className="mb-6" />
        <CreatePost
          user={{ name: "You", avatar: "/avatar.jpg" }}
          onSubmit={(content) => console.log(content)}
        />
        <PostCard
          author={{
            name: "Sarah Smith",
            username: "sarahsmith",
            avatar: "/sarah.jpg",
          }}
          content="Meditating on this verse today..."
          timestamp="1 hour ago"
          likes={24}
          comments={8}
          verse={{
            book: "Philippians",
            chapter: 4,
            verse: 6,
            text: "Do not be anxious about anything...",
          }}
        />
      </main>
    </div>
  );
}
```

## Styling

All components use Tailwind CSS with custom colors defined in `app/globals.css`. The color palette creates a warm, inviting atmosphere reminiscent of aged Bible paper.

## Notes

- All components are fully typed with TypeScript
- Components are designed to be accessible and responsive
- The design emphasizes readability and a peaceful aesthetic
- Custom scrollbar styling matches the Bible theme
