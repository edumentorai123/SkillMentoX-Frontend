"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {  LogOut, } from "lucide-react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/Slices/authSlice";

interface NavbarProps {
    studentName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ studentName: propStudentName }) => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const user = useSelector((state: RootState) => state.auth.user);
    const isLoading = useSelector((state: RootState) => state.auth.loading);
    const dispatch = useDispatch();
    const router = useRouter();

    const getStudentName = () => {
        if (propStudentName) return propStudentName;
        if (!user) return "Guest";

        const firstName = user.firstName?.trim() || "";
        const lastName = user.lastName?.trim() || "";

        if (firstName && lastName) return `${firstName} ${lastName}`;
        return firstName || "Guest";
    };

    const studentName = getStudentName();
    const displayName = isLoading ? "Loading..." : studentName;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // only Home link now
    const navLinks = [
        { name: "Home", href: "/StudentHome" },
    ];

    const profileMenuItems = [
        { name: "Sign Out", href: "/loginForm", icon: LogOut },
    ];

    const handleLogout = () => {
        dispatch(logout());
        router.push("/loginForm");
        setIsProfileDropdownOpen(false);
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileDropdownOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isProfileDropdownOpen || isMobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isProfileDropdownOpen, isMobileMenuOpen]);

    return (
        <>
            <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                    <div className="flex justify-between items-center h-16 sm:h-18">
                        {/* Logo */}
                        <Link href="/StudentHome" className="flex items-center group min-w-0 flex-shrink-0">
                            <div className="relative w-16 h-10 sm:w-20 sm:h-12 lg:w-24 lg:h-14 transform group-hover:scale-105 transition-transform duration-200">
                                <Image
                                    src="/skillmentorX.tm.png"
                                    alt="Company Logo"
                                    fill
                                    sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="text-base sm:text-lg lg:text-xl font-bold tracking-wide text-gray-800 group-hover:text-[#1887A1] transition-colors duration-200 ml-1 sm:ml-2 truncate">
                                SkillMentorX
                            </span>
                        </Link>

                        {/* Desktop Navigation (only Home) */}
                        <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-1 justify-center max-w-lg mx-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap relative group ${pathname === link.href
                                            ? "text-[#1887A1]"
                                            : "text-gray-600 hover:text-[#1887A1]"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Right Side Actions - Profile */}
                        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] cursor-pointer rounded-full flex items-center justify-center text-white font-semibold"
                                >
                                    {isMounted ? displayName.charAt(0).toUpperCase() : "G"}
                                </button>

                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                        {profileMenuItems.map((item) =>
                                            item.name === "Sign Out" ? (
                                                <button
                                                    key={item.name}
                                                    onClick={handleLogout}
                                                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                >
                                                    <item.icon className="w-4 h-4 mr-2" />
                                                    {item.name}
                                                </button>
                                            ) : (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                    onClick={() => setIsProfileDropdownOpen(false)}
                                                >
                                                    <item.icon className="w-4 h-4 mr-2" />
                                                    {item.name}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
