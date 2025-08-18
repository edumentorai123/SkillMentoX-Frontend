import "./globals.css";
import { Outfit } from "next/font/google";
import Providers from "@/redux/Providers";
import LandingNavFooterWrapper from "./LandingNavFooterWrapper"; 

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "SkillMentorX",
  description: "Learn Smarter with AI + Human Mentorship",
  icons: [{ url: "/SkillMentroX.png", type: "image/png" }],
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
