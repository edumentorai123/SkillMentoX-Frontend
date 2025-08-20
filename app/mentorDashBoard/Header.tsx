import React from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';

interface HeaderProps {
    setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ setMobileMenuOpen }: HeaderProps) {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-40">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden mr-3"
                    >
                        <Menu className="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-600 text-sm lg:text-base hidden sm:block">Welcome back! Here&apos;s what&apos;s happening with your platform.</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2 lg:space-x-4">
                    <div className="relative hidden md:block">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-48 lg:w-64"
                        />
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    </button>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform" style={{ background: 'linear-gradient(to right, #1887A1, #0D4C5B)' }}>
                        <User className="w-5 h-5 text-white" />
                    </div>
                </div>
            </div>
        </header>
    );
}