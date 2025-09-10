"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./Student/Sidebar";

export default function SidebarWrapper() {
    const pathname = usePathname();

    const sidebarRoutes = [
        "/Student",
        "/Student/DashBord",
        "/Student/MyDouts",
        "/Student/Quiezz",
        "/Student/Course",
    ];

    const hiddenRoutes = ["/Student/Chat"];


    const showSidebar = 
    sidebarRoutes.some((route) => pathname.startsWith(route)) &&
    !hiddenRoutes.includes(pathname)

    if (!showSidebar) return null;

    return (
        <aside>
            <Sidebar />
        </aside>
    );
}
