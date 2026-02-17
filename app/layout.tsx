import "./globals.css";
import { Outfit } from "next/font/google";
import Providers from "@/redux/Providers";
import LandingNavFooterWrapper from "./LandingNavFooterWrapper";
import type { Metadata, Viewport } from "next";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap", // Better performance for SEO
});

export const viewport: Viewport = {
  themeColor: "#4F46E5", // Elegant indigo brand color
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://skill-mento-x-frontend.vercel.app"),
  title: {
    default: "SkillMentorX | AI-Powered Learning & Mentorship",
    template: "%s | SkillMentorX",
  },
  description:
    "Empower your learning journey with SkillMentorX. A modern AI-driven mentorship platform offering real-time guidance, student dashboards, and expert human mentorship.",
  applicationName: "SkillMentorX",
  authors: [{ name: "SkillMentorX Team" }],
  generator: "Next.js",
  keywords: [
    "SkillMentorX",
    "AI Mentorship",
    "Personalized Learning",
    "Student Success Dashboard",
    "Mentor Matchmaking",
    "MERN Stack Learning",
    "Real-time AI Chat",
    "Online Education 2.0",
  ],
  referrer: "origin-when-cross-origin",
  creator: "SkillMentorX",
  publisher: "SkillMentorX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skill-mento-x-frontend.vercel.app",
    title: "SkillMentorX – Learn Smarter with AI + Mentorship",
    description:
      "Transform your learning experience with AI-driven insights and professional human mentorship. Built for the modern student.",
    siteName: "SkillMentorX",
    images: [
      {
        url: "/skillmentorX.tm.png",
        width: 1200,
        height: 630,
        alt: "SkillMentorX Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillMentorX – AI + Mentorship Platform",
    description:
      "The future of learning is here. AI chat, expert mentors, and student growth tracking.",
    creator: "@skillmentorx",
    images: ["/skillmentorX.tm.png"],
  },
  icons: {
    icon: "/skillmentorX.tm.png",
    shortcut: "/skillmentorX.tm.png",
    apple: "/skillmentorX.tm.png",
  },
  verification: {
    google: "PASTE_YOUR_GOOGLE_VERIFICATION_CODE_HERE",
  },
  category: "education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SkillMentorX",
    url: "https://skill-mento-x-frontend.vercel.app",
    logo: "https://skill-mento-x-frontend.vercel.app/skillmentorX.tm.png",
    description:
      "SkillMentorX is an AI-powered learning and mentorship platform.",
    sameAs: [
      "https://twitter.com/skillmentorx",
      "https://github.com/skillmentorx",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`bg-white text-gray-800 ${outfit.className} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Providers>
          <LandingNavFooterWrapper>
            <main className="flex-grow">{children}</main>
          </LandingNavFooterWrapper>
        </Providers>
      </body>
    </html>
  );
}
