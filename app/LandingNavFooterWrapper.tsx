"use client";

import { usePathname } from "next/navigation";
import Nav from "@/Components/landing/Nav";
import Footer from "@/Components/landing/footer";

export default function LandingNavFooterWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const routesWithNavFooter = ["/", "/landing", "/features", "/mentors","/About","/premium",];
    const showLandingNavFooter = routesWithNavFooter.includes(pathname);

    return (
    <>
        {showLandingNavFooter && <Nav />}
        {children}
        {showLandingNavFooter && <Footer />}
    </>
    );
}
