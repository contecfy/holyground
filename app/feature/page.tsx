import React from "react";
import Link from "next/link";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import {
  BookOpen,
  Users,
  Search,
  MessageCircle,
  Smartphone,
  Shield,
  Heart,
  HelpCircle,
  MapPin,
  HandHeart,
  Sparkles,
  Send,
  User,
  Hash,
  Bell,
  Settings,
} from "lucide-react";

export default function Features() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-[#5d4a2f] to-[#8b6f47] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Features</h1>
          <p className="text-xl text-[#f5f1eb] max-w-2xl mx-auto">
            Everything you love about social media, designed specifically for
            believers. Discover all the ways yalor helps you connect, share, and
            grow in faith.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3d2817] mb-4">
              Core Features
            </h2>
            <p className="text-xl text-[#6b5d4a] max-w-2xl mx-auto">
              The essential tools you need to share your faith and connect with
              believers worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Share Verses */}
            <Card variant="paper" className="p-6">
              <div className="flex justify-center mb-4">
                <BookOpen className="w-12 h-12 text-[#8b6f47]" />
              </div>
              <h3 className="text-2xl font-bold text-[#3d2817] mb-3 text-center">
                Share Verses
              </h3>
              <p className="text-[#6b5d4a] text-center mb-4">
                Post your favorite Bible verses with beautiful formatting. Add
                your reflections and see how God&apos;s word touches others.
              </p>
              <ul className="text-sm text-[#6b5d4a] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Beautiful verse formatting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Add personal reflections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Tag by book, chapter, or topic</span>
                </li>
              </ul>
            </Card>

            {/* Build Community */}
            <Card variant="paper" className="p-6">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-[#8b6f47]" />
              </div>
              <h3 className="text-2xl font-bold text-[#3d2817] mb-3 text-center">
                Build Community
              </h3>
              <p className="text-[#6b5d4a] text-center mb-4">
                Connect with believers worldwide. Follow friends, join groups,
                and participate in meaningful discussions about faith.
              </p>
              <ul className="text-sm text-[#6b5d4a] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Follow friends and pastors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Join faith-based groups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Connect with your church</span>
                </li>
              </ul>
            </Card>

            {/* Discover Content */}
            <Card variant="paper" className="p-6">
              <div className="flex justify-center mb-4">
                <Search className="w-12 h-12 text-[#8b6f47]" />
              </div>
              <h3 className="text-2xl font-bold text-[#3d2817] mb-3 text-center">
                Discover Content
              </h3>
              <p className="text-[#6b5d4a] text-center mb-4">
                Explore verses by topic, book, or theme. Find daily devotionals,
                study plans, and inspiring content from the community.
              </p>
              <ul className="text-sm text-[#6b5d4a] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Search by verse, topic, or book</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Daily verse recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Explore trending content</span>
                </li>
              </ul>
            </Card>

            {/* Engage & Discuss */}
            <Card variant="paper" className="p-6">
              <div className="flex justify-center mb-4">
                <MessageCircle className="w-12 h-12 text-[#8b6f47]" />
              </div>
              <h3 className="text-2xl font-bold text-[#3d2817] mb-3 text-center">
                Engage & Discuss
              </h3>
              <p className="text-[#6b5d4a] text-center mb-4">
                Like, comment, and share posts. Start conversations about
                Scripture and learn from others&apos; perspectives.
              </p>
              <ul className="text-sm text-[#6b5d4a] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Like and react to posts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Comment with insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Share with your network</span>
                </li>
              </ul>
            </Card>

            {/* Familiar Interface */}
            <Card variant="paper" className="p-6">
              <div className="flex justify-center mb-4">
                <Smartphone className="w-12 h-12 text-[#8b6f47]" />
              </div>
              <h3 className="text-2xl font-bold text-[#3d2817] mb-3 text-center">
                Familiar Interface
              </h3>
              <p className="text-[#6b5d4a] text-center mb-4">
                Intuitive design that feels like Instagram, Twitter, or TikTok.
                Easy to use, beautiful to look at, built for believers.
              </p>
              <ul className="text-sm text-[#6b5d4a] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Intuitive navigation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Responsive design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Fast and reliable</span>
                </li>
              </ul>
            </Card>

            {/* Safe Space */}
            <Card variant="paper" className="p-6">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-[#8b6f47]" />
              </div>
              <h3 className="text-2xl font-bold text-[#3d2817] mb-3 text-center">
                Safe Space
              </h3>
              <p className="text-[#6b5d4a] text-center mb-4">
                A positive environment focused on encouragement, growth, and
                building each other up in faith.
              </p>
              <ul className="text-sm text-[#6b5d4a] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Community moderation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Respectful discussions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b6f47] mt-1">•</span>
                  <span>Faith-centered content</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Special Features */}
      <section className="py-20 px-4 bg-[#f5f1eb]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3d2817] mb-4">
              Special Features
            </h2>
            <p className="text-xl text-[#6b5d4a] max-w-2xl mx-auto">
              Unique tools designed specifically for the Christian community to
              deepen your faith journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bible Q&A */}
            <Card variant="elevated" className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <HelpCircle className="w-10 h-10 text-[#8b6f47]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                    Bible Q&A
                  </h3>
                  <p className="text-[#6b5d4a] leading-relaxed mb-4">
                    Ask questions about Scripture and get answers from the
                    community. Whether you&apos;re studying a difficult passage
                    or seeking guidance, find wisdom from fellow believers.
                  </p>
                  <ul className="text-sm text-[#6b5d4a] space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Ask questions about any Bible topic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Get answers from the community</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Upvote helpful responses</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Prayer Requests */}
            <Card variant="elevated" className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <HandHeart className="w-10 h-10 text-[#8b6f47]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                    Prayer Requests
                  </h3>
                  <p className="text-[#6b5d4a] leading-relaxed mb-4">
                    Share your prayer needs and pray for others. Create a space
                    where the community can lift each other up in prayer and see
                    God&apos;s faithfulness.
                  </p>
                  <ul className="text-sm text-[#6b5d4a] space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Share prayer requests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Pray for others in the community</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Share answered prayers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Find Churches */}
            <Card variant="elevated" className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="w-10 h-10 text-[#8b6f47]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                    Find Churches
                  </h3>
                  <p className="text-[#6b5d4a] leading-relaxed mb-4">
                    Discover churches in your area or connect with your existing
                    church community. See what&apos;s happening and stay
                    connected with your local body of believers.
                  </p>
                  <ul className="text-sm text-[#6b5d4a] space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Search churches by location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Connect with your church</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>See church events and updates</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Spaces */}
            <Card variant="elevated" className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Hash className="w-10 h-10 text-[#8b6f47]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                    Spaces
                  </h3>
                  <p className="text-[#6b5d4a] leading-relaxed mb-4">
                    Join topic-based communities where believers gather around
                    shared interests, Bible studies, or life stages. Find your
                    people and grow together.
                  </p>
                  <ul className="text-sm text-[#6b5d4a] space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Join topic-based communities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Participate in Bible studies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Connect with like-minded believers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Direct Messaging */}
            <Card variant="elevated" className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Send className="w-10 h-10 text-[#8b6f47]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                    Direct Messaging
                  </h3>
                  <p className="text-[#6b5d4a] leading-relaxed mb-4">
                    Have private conversations with friends, mentors, or prayer
                    partners. Share encouragement, discuss Scripture, and build
                    deeper relationships.
                  </p>
                  <ul className="text-sm text-[#6b5d4a] space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Private one-on-one chats</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Share verses in messages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Real-time notifications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Profile & Personalization */}
            <Card variant="elevated" className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <User className="w-10 h-10 text-[#8b6f47]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                    Profile & Personalization
                  </h3>
                  <p className="text-[#6b5d4a] leading-relaxed mb-4">
                    Create a profile that reflects your faith journey. Share
                    your testimony, favorite verses, and connect with others who
                    share your interests.
                  </p>
                  <ul className="text-sm text-[#6b5d4a] space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Customize your profile</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Share your testimony</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8b6f47] mt-1">•</span>
                      <span>Showcase your favorite verses</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3d2817] mb-4">
              More Features
            </h2>
            <p className="text-xl text-[#6b5d4a] max-w-2xl mx-auto">
              Additional tools and features to enhance your experience on yalor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="paper" className="p-6">
              <Bell className="w-8 h-8 text-[#8b6f47] mb-3" />
              <h4 className="text-lg font-bold text-[#3d2817] mb-2">
                Notifications
              </h4>
              <p className="text-sm text-[#6b5d4a]">
                Stay updated with likes, comments, and new followers. Never miss
                important updates from your community.
              </p>
            </Card>

            <Card variant="paper" className="p-6">
              <Settings className="w-8 h-8 text-[#8b6f47] mb-3" />
              <h4 className="text-lg font-bold text-[#3d2817] mb-2">
                Privacy Controls
              </h4>
              <p className="text-sm text-[#6b5d4a]">
                Control who sees your content and who can message you. Your
                privacy, your choice.
              </p>
            </Card>

            <Card variant="paper" className="p-6">
              <Heart className="w-8 h-8 text-[#8b6f47] mb-3" />
              <h4 className="text-lg font-bold text-[#3d2817] mb-2">
                Donations
              </h4>
              <p className="text-sm text-[#6b5d4a]">
                Support ministries, churches, and causes you care about directly
                through the platform.
              </p>
            </Card>

            <Card variant="paper" className="p-6">
              <Sparkles className="w-8 h-8 text-[#8b6f47] mb-3" />
              <h4 className="text-lg font-bold text-[#3d2817] mb-2">
                Daily Verses
              </h4>
              <p className="text-sm text-[#6b5d4a]">
                Receive daily Bible verses and devotionals to start your day
                with God&apos;s Word.
              </p>
            </Card>

            <Card variant="paper" className="p-6">
              <BookOpen className="w-8 h-8 text-[#8b6f47] mb-3" />
              <h4 className="text-lg font-bold text-[#3d2817] mb-2">
                Reading Plans
              </h4>
              <p className="text-sm text-[#6b5d4a]">
                Follow structured Bible reading plans and track your progress
                with the community.
              </p>
            </Card>

            <Card variant="paper" className="p-6">
              <Users className="w-8 h-8 text-[#8b6f47] mb-3" />
              <h4 className="text-lg font-bold text-[#3d2817] mb-2">Groups</h4>
              <p className="text-sm text-[#6b5d4a]">
                Create or join groups for Bible studies, prayer meetings, or
                fellowship.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#5d4a2f] to-[#8b6f47] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl mb-8 text-[#f5f1eb] max-w-2xl mx-auto">
            Join the waitlist and be among the first to access all these
            features when yalor launches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button
                buttonType="secondary"
                buttonSize="large"
                buttonText="Join Waitlist"
                className="text-lg px-8 bg-white text-[#5d4a2f] hover:bg-[#f5f1eb]"
              />
            </Link>
            <Link href="/about">
              <Button
                buttonType="secondary"
                buttonVariant="outline"
                buttonSize="large"
                buttonText="Learn More"
                className="text-lg px-8 border-2 border-white text-white hover:bg-white/10"
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
