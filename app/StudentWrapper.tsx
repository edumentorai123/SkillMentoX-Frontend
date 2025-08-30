
import Sidebar from "./Student/Sidebar";


export default function StudentWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar fixed */}
            <aside className="w-64 bg-white shadow-md border-r border-gray-200">
                <Sidebar />
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto min-h-screen">
                {children}
            </main>
        </div>
    );
}
