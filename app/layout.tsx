// import "./globals.css";
// import { Outfit } from "next/font/google";
// import Providers from "@/redux/Providers";
// import LandingNavFooterWrapper from "./LandingNavFooterWrapper"; 

// const outfit = Outfit({
//   variable: "--font-outfit",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "SkillMentorX",
//   description: "Learn Smarter with AI + Human Mentorship",
//   icons: [{ url: "/SkillMentroX.png", type: "image/png" }],
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className={`bg-white text-gray-800 ${outfit.className}`}>
//         <Providers>
//           <LandingNavFooterWrapper>{children}</LandingNavFooterWrapper>
//         </Providers>
//       </body>
//     </html>
//   );
// }




import "./globals.css";
import { Outfit } from "next/font/google";
import Providers from "@/redux/Providers";
import LandingNavFooterWrapper from "./LandingNavFooterWrapper";
import type { Metadata } from "next";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillMentorX – Learn Smarter with AI + Mentorship",
  description:
    "SkillMentorX is a modern learning + mentorship platform with AI chat, student dashboard, mentor onboarding, and real-time learning features.",
  keywords: [
    "SkillMentorX",
    "AI mentorship platform",
    "student learning",
    "mentor student platform",
    "Faisal MERN developer",
    "Next.js project",
    "learning platform",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "SkillMentorX – Learn Smarter with AI",
    description:
      "AI + Human Mentorship Platform built with Next.js, MongoDB, Node.js, Socket.IO and Cloudinary.",
    url: "https://skill-mento-x-frontend.vercel.app",
    siteName: "SkillMentorX",
    images: [
      {
        url: "/SkillMentroX.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillMentorX – AI + Mentorship Platform",
    description: "Learning platform with AI chat and mentor support.",
    images: ["/SkillMentroX.png"],
  },
  icons: [{ url: "/SkillMentroX.png", type: "image/png" }],
  verification: {
    google: "PASTE_YOUR_GOOGLE_VERIFICATION_CODE_HERE",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-white text-gray-800 ${outfit.className}`}>
        <Providers>
          <LandingNavFooterWrapper>{children}</LandingNavFooterWrapper>
        </Providers>
      </body>
    </html>
  );
}
