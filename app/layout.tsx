import "./globals.css";

export const metadata = {
  title: "SkillMentorX",
  description: "Learn Smarter with AI + Human Mentorship",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">{children}</body>
    </html>
  );
}