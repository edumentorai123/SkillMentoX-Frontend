import React, { useEffect, useRef } from "react";
import { User } from "lucide-react";
import Image from "next/image";

interface Mentor {
    _id: string;
    name: string;
}

interface Student {
    _id?: string;
    userId?: string;
    name: string;
    email?: string;
    location?: string;
    phone?: string;
    educationLevel?: string;
    selectedCategory?: string;
    selectedStack?: string;
    avatar?: string;
    assignedMentor?: Mentor;
    mentorStatus?: "pending" | "approved" | "none";
}

interface ProfileDropdownProps {
    student: Student | null;
    profileForm: Partial<Student>;
    isProfileOpen: boolean;
    setIsProfileOpen: (open: boolean) => void;
    handleProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleProfileUpdate: () => void;
    handleLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
    student,
    profileForm,
    isProfileOpen,
    setIsProfileOpen,
    handleProfileChange,
    handleProfileUpdate,
    handleLogout,
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

    const mentorDisplayText =
    student?.mentorStatus === "approved"
        ? student?.assignedMentor?.name || "Awaiting Mentor Assignment"
        : student?.mentorStatus === "pending"
            ? "Pending Mentor Assignment"
            : "No Mentor Assigned";

    return (
        <div className="relative" ref={profileRef}>
            <div
                className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-2 cursor-pointer backdrop-blur-md transition-all duration-300 group hover:bg-white/30 hover:shadow-lg hover:shadow-[#1887A1]/20"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                    {student?.avatar ? (
                        <Image src={student.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <span className="text-[#1887A1] font-bold text-base">{student?.name ? student.name.charAt(0).toUpperCase() : 'U'}</span>
                    )}
                </div>
                <span className="text-white font-semibold text-sm sm:text-base hidden sm:block">{student?.name || 'User'}</span>
                <svg
                    className={`w-4 h-4 text-white transform transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 z-20 animate-slide-down border border-gray-100/50">
                    <div className="flex items-center gap-2 mb-4 p-2 bg-gray-100 rounded-lg">
                        <span className="text-sm font-medium text-gray-600">Mentor:</span>
                        <span className="text-sm font-semibold text-[#1887A1]">{mentorDisplayText}</span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                        <User className="w-6 h-6 text-[#1887A1] cursor-pointer" />
                        <h4 className="text-lg font-bold text-gray-800">Edit Profile</h4>
                    </div>

                    <div className="space-y-4">
                        {["name", "email", "location", "phone", "educationLevel", "selectedCategory", "selectedStack"].map((field) => (
                            <div key={field}>
                                <label className="text-sm text-gray-600 font-medium">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                                <input
                                    type={field === "email" ? "email" : "text"}
                                    name={field}
                                    value={(profileForm[field as keyof Omit<Student, "assignedMentor" | "mentorStatus">] as string | undefined) || ""}
                                    onChange={handleProfileChange}
                                    className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1887A1] transition-all duration-300"
                                    placeholder={`Enter your ${field}`}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between gap-2 mt-6">
                        <button
                            onClick={handleProfileUpdate}
                            className="flex-1 px-4 py-2 cursor-pointer bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white text-sm font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Update Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex-1 px-4 py-2 cursor-pointer bg-red-500 text-white text-sm font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;