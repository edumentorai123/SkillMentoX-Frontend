import Sidebar from "../Admin/Sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar (Fixed, non-scrollable) */}
            <aside className="fixed left-0 top-0 h-screen z-10">
                <Sidebar />
            </aside>

            {/* Main content (scrollable area) */}
            <main className="flex-1 ml-64 overflow-y-auto min-h-screen">
                {children}
            </main>
        </div>
    );
}