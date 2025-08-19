import Providers from "@/redux/Providers";
import StudentHomeNavFooterWrapper from "../StudentHomeNavFooterWrapper";
import { Outfit } from "next/font/google";

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});


export const metadata = {
    title: "SkillMentorX",
    description: "Learn Smarter with AI + Human Mentorship",
    icons: [{ url: "/SkillMentroX.png",  type: "image/png" }],
};

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    return (
                <div className={`bg-white text-gray-800 ${outfit.className}`}>
                    <Providers>
                    <StudentHomeNavFooterWrapper>
                        {children}
                    </StudentHomeNavFooterWrapper>
                </Providers>
                </div>
    );
}
