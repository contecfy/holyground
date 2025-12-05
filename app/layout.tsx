import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://holyground.app';

export const metadata: Metadata = {
  title: "HolyGround - A Bible Social Community",
  description: "Connect, share, and grow in faith. HolyGround is a social media platform designed for believers to share Bible verses, reflections, and build meaningful Christian community.",
  keywords: ["Bible", "Christian", "Social Media", "Faith", "Community", "Prayer", "Bible Study", "Church"],
  authors: [{ name: "HolyGround" }],
  creator: "HolyGround",
  publisher: "HolyGround",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "HolyGround",
    title: "HolyGround - A Bible Social Community",
    description: "Connect, share, and grow in faith. HolyGround is a social media platform designed for believers to share Bible verses, reflections, and build meaningful Christian community.",
    images: [
      {
        url: "/images/christians-praying.jpg",
        width: 1200,
        height: 630,
        alt: "HolyGround - A Bible Social Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HolyGround - A Bible Social Community",
    description: "Connect, share, and grow in faith. HolyGround is a social media platform designed for believers to share Bible verses, reflections, and build meaningful Christian community.",
    images: ["/images/christians-praying.jpg"],
    creator: "@holyground",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Header /> */}
        {children}
       
      </body>
    </html>
  );
}
