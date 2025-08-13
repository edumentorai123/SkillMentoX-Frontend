import "./globals.css";
import { Outfit } from "next/font/google";
import Providers from "@/redux/Providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "SkillMentorX",
  description: "Learn Smarter with AI + Human Mentorship",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-white text-gray-800 ${outfit.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
