import React, { useEffect, useRef } from "react";
import { User, ChevronDown, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface Student {
    name: string;
}

interface ProfileDropdownProps {
    student: Student | null;
    isProfileOpen: boolean;
    setIsProfileOpen: (open: boolean) => void;
    onEditProfile: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
    student,
    isProfileOpen,
    setIsProfileOpen,
    onEditProfile,
}) => {
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsProfileOpen]);

    const handleEditProfile = () => {
        onEditProfile();
        setIsProfileOpen(false);
    };

    return (
        <div className="relative" ref={profileRef}>
            <div
                className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-2 cursor-pointer backdrop-blur-md transition-all duration-300 group hover:bg-white/30 hover:shadow-lg hover:shadow-[#1887A1]/20 border border-white/30"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-white to-gray-200 flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                    {/* Always show first letter as requested */}
                    <span className="text-[#1887A1] font-bold text-lg">
                        {student?.name ? student.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                </div>
                <span className="text-white font-semibold text-sm sm:text-base hidden sm:block">{student?.name || 'User'}</span>
                <ChevronDown className={`w-4 h-4 text-white transform transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`} />
            </div>

            {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl p-2 z-20 animate-slide-down border border-gray-100 overflow-hidden">
                    <div className="p-3 border-b border-gray-50 bg-gray-50/50 rounded-t-lg mb-1">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Account</p>
                        <p className="text-sm font-bold text-gray-800 truncate">{student?.name || 'Student'}</p>
                    </div>
                    
                    <button
                        onClick={handleEditProfile}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-linear-to-r hover:from-[#1887A1]/5 hover:to-transparent hover:text-[#1887A1] rounded-lg transition-all duration-200 cursor-pointer group"
                    >
                        <UserCircle className="w-5 h-5 text-gray-400 group-hover:text-[#1887A1]" />
                        View Profile
                    </button>
                    
                    {/* Logout is handled in the sidebar now */}
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;