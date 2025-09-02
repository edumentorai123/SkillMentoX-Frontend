"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./Student/Sidebar";

export default function SidebarWrapper() {
    const pathname = usePathname();

    const sidebarRoutes = [
        "/Student",
        "/Student/DashBord",
        "/Student/MyDouts",
        "/Student/Chat",
        "/Student/Quiezz",
        "/Student/Course",
    ];

    const showSidebar = sidebarRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (!showSidebar) return null;

    return (
        <aside className="w-64 bg-white shadow-md border-r border-gray-200">
            <Sidebar />
        </aside>
    );
}
