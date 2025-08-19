"use client";

import { usePathname } from "next/navigation";
import Navbar from "./StudentHome/Navbar";
import Footer from "./StudentHome/Footer";


export default function StudentHomeNavFooterWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const showLandingNavFooter = pathname.startsWith("/StudentHome");


    return (
        <>
            {showLandingNavFooter && <Navbar />}
            {children}
            {showLandingNavFooter && <Footer />}
        </>
    );
}
