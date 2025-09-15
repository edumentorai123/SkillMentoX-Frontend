import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "./Navbar";

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Student Profile | SkillMentorX",
    description: "Manage your student profile",
};

export default function StudentProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`bg-white min-h-screen ${outfit.className}`}>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
        </div>
    );
}
