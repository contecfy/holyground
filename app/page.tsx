import React from "react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Avatar from "@/components/ui/avatar";
import Badge from "@/components/ui/badge";
import Footer from "@/components/navigation/footer";
import Header from "@/components/navigation/header";
import {
  Sparkles,
  Mail,
  Users,
  BookOpen,
  Heart,
  MessageCircle,
  Send,
  Search,
  Smartphone,
  Shield,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <Badge variant="primary" size="md" className="mb-6">
                <Sparkles className="w-4 h-4 mr-1 inline" />
                Coming Soon
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#3d2817] mb-6 leading-tight">
                A Social Media
                <span className="block text-[#8b6f47]">For Believers</span>
              </h1>
              <p className="text-xl text-[#6b5d4a] mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Connect with fellow believers, share Bible verses, and grow in
                faith together. yalor brings the familiar social media
                experience you love, designed specifically for the Christian
                community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  buttonType="primary"
                  buttonSize="large"
                  buttonText="Join the Waitlist"
                  buttonIcon={<Mail className="w-5 h-5" />}
                  iconPosition="left"
                  className="text-lg px-8"
                />
                <Button
                  buttonType="secondary"
                  buttonVariant="outline"
                  buttonSize="large"
                  buttonText="Learn More"
                  className="text-lg px-8"
                />
              </div>
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-[#6b5d4a]">
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  <span>Join thousands of believers</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  <span>Share & discover verses</span>
                </div>
              </div>
            </div>

            {/* Right - Preview Cards */}
            <div className="relative">
              <div className="space-y-4 transform rotate-2">
                <Card variant="elevated" className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar name="Sarah M." size="md" />
                    <div>
                      <p className="font-semibold text-[#3d2817]">Sarah M.</p>
                      <p className="text-xs text-[#6b5d4a]">2 hours ago</p>
                    </div>
                  </div>
                  <p className="text-[#3d2817] mb-4">
                    Meditating on this verse today. God&apos;s love is truly
                    amazing!
                  </p>
                  <div className="p-4 bg-gradient-to-r from-[#f5f1eb] to-[#e8dfd0] border-l-4 border-[#8b6f47] rounded-r-md">
                    <p className="text-[#3d2817] italic mb-2">
                      &quot;For I know the plans I have for you,&quot; declares
                      the Lord, &quot;plans to prosper you and not to harm you,
                      plans to give you hope and a future.&quot;
                    </p>
                    <p className="text-sm text-[#6b5d4a] font-medium">
                      Jeremiah 29:11
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#e8dfd0]">
                    <span className="text-[#6b5d4a] flex items-center gap-1">
                      <Heart className="w-4 h-4" /> 42
                    </span>
                    <span className="text-[#6b5d4a] flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" /> 12
                    </span>
                    <span className="text-[#6b5d4a] flex items-center gap-1">
                      <Send className="w-4 h-4" /> 5
                    </span>
                  </div>
                </Card>
              </div>
              <div className="absolute -top-4 -right-4 -z-10 w-full h-full bg-[#e8dfd0] rounded-lg transform -rotate-2 opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3d2817] mb-4">
              Everything You Love About Social Media
            </h2>
            <p className="text-xl text-[#6b5d4a] max-w-2xl mx-auto">
              Familiar features, designed for believers. Share, connect, and
              grow in a safe, faith-centered environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card variant="paper" className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="w-12 h-12 text-[#8b6f47]" />
              </div>
              <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                Share Verses
              </h3>
              <p className="text-[#6b5d4a]">
                Post your favorite Bible verses with beautiful formatting. Add
                your reflections and see how God&apos;s word touches others.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card variant="paper" className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-[#8b6f47]" />
              </div>
              <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                Build Community
              </h3>
              <p className="text-[#6b5d4a]">
                Connect with believers worldwide. Follow friends, join groups,
                and participate in meaningful discussions about faith.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card variant="paper" className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Search className="w-12 h-12 text-[#8b6f47]" />
              </div>
              <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                Discover Content
              </h3>
              <p className="text-[#6b5d4a]">
                Explore verses by topic, book, or theme. Find daily devotionals,
                study plans, and inspiring content from the community.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card variant="paper" className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <MessageCircle className="w-12 h-12 text-[#8b6f47]" />
              </div>
              <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                Engage & Discuss
              </h3>
              <p className="text-[#6b5d4a]">
                Like, comment, and share posts. Start conversations about
                Scripture and learn from others&apos; perspectives.
              </p>
            </Card>

            {/* Feature 5 */}
            <Card variant="paper" className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Smartphone className="w-12 h-12 text-[#8b6f47]" />
              </div>
              <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                Familiar Interface
              </h3>
              <p className="text-[#6b5d4a]">
                Intuitive design that feels like Instagram, Twitter, or TikTok.
                Easy to use, beautiful to look at, built for believers.
              </p>
            </Card>

            {/* Feature 6 */}
            <Card variant="paper" className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-[#8b6f47]" />
              </div>
              <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                Safe Space
              </h3>
              <p className="text-[#6b5d4a]">
                A positive environment focused on encouragement, growth, and
                building each other up in faith.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-[#f5f1eb]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3d2817] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-[#6b5d4a] max-w-2xl mx-auto">
              Getting started is simple. Join thousands of believers sharing
              God&apos;s word every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#8b6f47] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                Sign Up
              </h3>
              <p className="text-[#6b5d4a]">
                Create your account in seconds. Choose your username and set up
                your profile with a photo and bio.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#8b6f47] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                Follow & Connect
              </h3>
              <p className="text-[#6b5d4a]">
                Follow friends, pastors, and Christian influencers. Discover new
                believers and build your faith community.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#8b6f47] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                Share & Grow
              </h3>
              <p className="text-[#6b5d4a]">
                Post verses, share reflections, and engage with content. Watch
                your faith grow as you connect with others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3d2817] mb-4">
              What Believers Are Saying
            </h2>
            <p className="text-xl text-[#6b5d4a] max-w-2xl mx-auto">
              Join a community of believers who are already experiencing the joy
              of sharing God&apos;s word together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="elevated" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar name="Michael T." size="lg" />
                <div>
                  <p className="font-semibold text-[#3d2817]">Michael T.</p>
                  <p className="text-sm text-[#6b5d4a]">Pastor, California</p>
                </div>
              </div>
              <p className="text-[#6b5d4a] italic mb-4">
                &quot;yalor has transformed how our church community connects.
                We share daily verses and encourage each other in ways we never
                could before.&quot;
              </p>
              <div className="text-[#8b6f47] text-xl">⭐⭐⭐⭐⭐</div>
            </Card>

            <Card variant="elevated" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar name="Jessica L." size="lg" />
                <div>
                  <p className="font-semibold text-[#3d2817]">Jessica L.</p>
                  <p className="text-sm text-[#6b5d4a]">Student, Texas</p>
                </div>
              </div>
              <p className="text-[#6b5d4a] italic mb-4">
                &quot;I love how familiar it feels - just like Instagram but for
                believers! I&apos;ve discovered so many amazing verses and made
                genuine connections.&quot;
              </p>
              <div className="text-[#8b6f47] text-xl">⭐⭐⭐⭐⭐</div>
            </Card>

            <Card variant="elevated" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar name="David R." size="lg" />
                <div>
                  <p className="font-semibold text-[#3d2817]">David R.</p>
                  <p className="text-sm text-[#6b5d4a]">Small Group Leader</p>
                </div>
              </div>
              <p className="text-[#6b5d4a] italic mb-4">
                &quot;Finally, a social media platform where I can share my
                faith freely. The community is supportive, encouraging, and
                truly Christ-centered.&quot;
              </p>
              <div className="text-[#8b6f47] text-xl">⭐⭐⭐⭐⭐</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#5d4a2f] to-[#8b6f47] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Join the Community?
          </h2>
          <p className="text-xl mb-8 text-[#f5f1eb] max-w-2xl mx-auto">
            Be among the first to experience yalor. Join our waitlist and get
            notified when we launch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              buttonType="secondary"
              buttonSize="large"
              buttonText="Join Waitlist"
              buttonIcon={<Mail className="w-5 h-5" />}
              iconPosition="left"
              className="text-lg px-8 bg-white text-[#5d4a2f] hover:bg-[#f5f1eb]"
            />
            <Button
              buttonType="secondary"
              buttonVariant="outline"
              buttonSize="large"
              buttonText="Learn More"
              className="text-lg px-8 border-2 border-white text-white hover:bg-white/10"
            />
          </div>
          <p className="mt-8 text-sm text-[#d4c4b0]">
            Coming soon to app.yalor.com
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
