"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";


export default function StudentLayout({ children }: { children: React.ReactNode }) {
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

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar (only on selected routes) */}
            {showSidebar && (
                <aside className="w-64 bg-white shadow-md border-r border-gray-200">
                    <Sidebar />
                </aside>
            )}

            {/* Main content */}
            <main className={`flex-1 overflow-y-auto min-h-screen ${showSidebar ? "ml-0" : "w-full"}`}>
                {children}
            </main>
        </div>
    );
}
