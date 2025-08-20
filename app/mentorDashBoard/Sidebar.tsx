import React from 'react';
import { Activity, MessageCircle, DollarSign, GraduationCap, Calendar, TrendingUp, User, Settings, BookOpen, X, ChevronRight } from 'lucide-react';

interface SidebarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    sidebarCollapsed: boolean;
    setSidebarCollapsed: (collapsed: boolean) => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
}

const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'student-doubts', label: 'Student Doubts', icon: MessageCircle },
    { id: 'total-revenue', label: 'Total Revenue', icon: DollarSign },
    { id: 'my-students', label: 'My Students', icon: GraduationCap },
    { id: 'sessions', label: 'Sessions', icon: Calendar },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
];

export default function Sidebar({
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileMenuOpen,
    setMobileMenuOpen
}: SidebarProps) {
    return (
        <>
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
                    <div className="bg-white w-64 h-full shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(to right, #1887A1, #0D4C5B)' }}>
                                        <BookOpen className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="ml-2 text-xl font-bold text-gray-900">SkillMentroX</span>
                                </div>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        </div>
                        <nav className="mt-8">
                            {sidebarItems.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveSection(item.id);
                                            setMobileMenuOpen(false);
                                        }}
                                        className={`w-full flex items-center px-4 py-3 text-left hover:bg-blue-50 transition-colors ${activeSection === item.id ? 'bg-blue-50 border-r-2 text-white' : 'text-gray-600'
                                            }`}
                                        style={activeSection === item.id ? { borderRightColor: '#1887A1', color: '#1887A1' } : {}}
                                    >
                                        <IconComponent className="w-5 h-5" />
                                        <span className="ml-3 font-medium">{item.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}

            <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-lg transition-all duration-300 min-h-screen hidden lg:block`}>
                <div className="p-4">
                    <div className="flex items-center justify-between">
                        {!sidebarCollapsed && (
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(to right, #1887A1, #0D4C5B)' }}>
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <span className="ml-2 text-xl font-bold text-gray-900">SkillMentroX</span>
                            </div>
                        )}
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
                        </button>
                    </div>
                </div>
                <nav className="mt-8">
                    {sidebarItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center px-4 py-3 text-left hover:bg-blue-50 transition-all duration-200 ${activeSection === item.id ? 'bg-blue-50 border-r-2' : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                style={activeSection === item.id ? { borderRightColor: '#1887A1', color: '#1887A1' } : {}}
                            >
                                <IconComponent className="w-5 h-5" />
                                {!sidebarCollapsed && <span className="ml-3 font-medium">{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}