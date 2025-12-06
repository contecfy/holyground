import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yalor.app";

export const metadata: Metadata = {
  title: "yalor - A Bible Social Community",
  description:
    "Connect, share, and grow in faith. yalor is a social media platform designed for believers to share Bible verses, reflections, and build meaningful Christian community.",
  keywords: [
    "Bible",
    "Christian",
    "Social Media",
    "Faith",
    "Community",
    "Prayer",
    "Bible Study",
    "Church",
  ],
  authors: [{ name: "yalor" }],
  creator: "yalor",
  publisher: "yalor",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "yalor",
    title: "yalor - A Bible Social Community",
    description:
      "Connect, share, and grow in faith. yalor is a social media platform designed for believers to share Bible verses, reflections, and build meaningful Christian community.",
    images: [
      {
        url: "/images/christians-praying.jpg",
        width: 1200,
        height: 630,
        alt: "yalor - A Bible Social Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "yalor - A Bible Social Community",
    description:
      "Connect, share, and grow in faith. yalor is a social media platform designed for believers to share Bible verses, reflections, and build meaningful Christian community.",
    images: ["/images/christians-praying.jpg"],
    creator: "@yalor",
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
        <QueryProvider>
          {/* <Header /> */}
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
