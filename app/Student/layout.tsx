import SidebarWrapper from "../StudentWrapper";


export default function StudentLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <SidebarWrapper />
            <main className="flex-1 overflow-y-auto min-h-screen">
                {children}
            </main>
        </div>
    );
}
