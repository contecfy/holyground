import React from "react";
import Link from "next/link";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import { BookOpen, Users, Heart, Shield, Target, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-[#5d4a2f] to-[#8b6f47] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About yalor</h1>
          <p className="text-xl text-[#f5f1eb] max-w-2xl mx-auto">
            A social media platform designed specifically for believers to
            connect, share, and grow in faith together.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3d2817] mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-[#6b5d4a] leading-relaxed max-w-3xl mx-auto">
              yalor exists to create a safe, encouraging space where believers
              can share Bible verses, engage in meaningful discussions, and
              build authentic community centered on faith. We believe that
              technology can be a powerful tool for spiritual growth when
              designed with purpose and values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Card variant="paper" className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="w-12 h-12 text-[#8b6f47]" />
              </div>
              <h3 className="text-xl font-bold text-[#3d2817] mb-3">
                Scripture-Centered
              </h3>
              <p className="text-[#6b5d4a]">
                Every feature is designed to help you engage with God&apos;s
                Word and share it with others.
              </p>
            </Card>

            <Card variant="paper" className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-[#8b6f47]" />
              </div>
              <h3 className="text-xl font-bold text-[#3d2817] mb-3">
                Community-Focused
              </h3>
              <p className="text-[#6b5d4a]">
                Build genuine relationships with believers worldwide who share
                your faith and values.
              </p>
            </Card>

            <Card variant="paper" className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-[#8b6f47]" />
              </div>
              <h3 className="text-xl font-bold text-[#3d2817] mb-3">
                Safe & Encouraging
              </h3>
              <p className="text-[#6b5d4a]">
                A positive environment where you can express your faith freely
                and be built up in love.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 px-4 bg-[#f5f1eb]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3d2817] mb-6">
              What Makes Us Different
            </h2>
          </div>

          <div className="space-y-8">
            <Card variant="elevated" className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Target className="w-8 h-8 text-[#8b6f47]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                    Purpose-Built for Believers
                  </h3>
                  <p className="text-[#6b5d4a] leading-relaxed">
                    Unlike general social media platforms, yalor is designed
                    from the ground up for the Christian community. Every
                    feature, from verse sharing to prayer requests, is crafted
                    to support your spiritual journey.
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="elevated" className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Heart className="w-8 h-8 text-[#8b6f47]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                    Familiar Yet Faithful
                  </h3>
                  <p className="text-[#6b5d4a] leading-relaxed">
                    We&apos;ve taken the best aspects of platforms like
                    Instagram, Twitter, and TikTok—the intuitive interfaces and
                    engaging features you already love—and reimagined them for a
                    faith-centered community. You&apos;ll feel right at home
                    while experiencing something uniquely designed for
                    believers.
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="elevated" className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Sparkles className="w-8 h-8 text-[#8b6f47]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                    Growing Together
                  </h3>
                  <p className="text-[#6b5d4a] leading-relaxed">
                    yalor isn&apos;t just about sharing—it&apos;s about growing.
                    Discover new verses, learn from others&apos; perspectives,
                    participate in Bible studies, and find encouragement when
                    you need it most. Your faith journey becomes richer when
                    shared with a community that cares.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3d2817] mb-6">
              Our Story
            </h2>
          </div>

          <Card variant="paper" className="p-8">
            <p className="text-lg text-[#6b5d4a] leading-relaxed mb-6">
              yalor was born from a simple observation: believers need a place
              online where they can share their faith authentically, without the
              noise and distractions of general social media. We wanted to
              create a platform where Scripture takes center stage, where
              encouragement flows freely, and where community is built on the
              foundation of shared faith.
            </p>
            <p className="text-lg text-[#6b5d4a] leading-relaxed mb-6">
              The name &quot;yalor&quot; reflects our vision—a community where
              believers can come together to share God&apos;s Word, support one
              another, and grow in their relationship with Christ. We&apos;re
              building more than a social network; we&apos;re creating a digital
              space that honors God and serves His people.
            </p>
            <p className="text-lg text-[#6b5d4a] leading-relaxed">
              As we continue to develop and launch yalor, we&apos;re committed
              to maintaining our core values: Scripture-centered content,
              authentic community, and a safe environment for spiritual growth.
              We invite you to join us on this journey and be part of a
              community that&apos;s changing how believers connect online.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#5d4a2f] to-[#8b6f47] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Us on This Journey
          </h2>
          <p className="text-xl mb-8 text-[#f5f1eb] max-w-2xl mx-auto">
            Be among the first to experience yalor. Join our waitlist and help
            us build a community that honors God.
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
            <Link href="/">
              <Button
                buttonType="secondary"
                buttonVariant="outline"
                buttonSize="large"
                buttonText="Back to Home"
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
