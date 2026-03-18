import React from "react";
import { User, Mail, MapPin, GraduationCap, Briefcase, Layout, ShieldCheck, ShieldAlert } from "lucide-react";

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
    isSubscribed?: boolean;
    assignedMentor?: Mentor | null;
    mentorStatus?: "pending" | "approved" | "none";
}

interface StudentProfileCardProps {
    student: Student | null;
}

const StudentProfileCard: React.FC<StudentProfileCardProps> = ({ student }) => {
    if (!student) return null;

    const mentorDisplayText =
        student.mentorStatus === "approved"
            ? student.assignedMentor?.name || "Awaiting Assignment"
            : student.mentorStatus === "pending"
                ? "Pending Approval"
                : "No Mentor Assigned";

    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 animate-slide-up border border-white/20 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#1887A1]" />
                    Student Profile
                </h3>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${student.isSubscribed ? "bg-green-100 text-green-700 border border-green-200" : "bg-amber-100 text-amber-700 border border-amber-200"}`}>
                    {student.isSubscribed ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                    {student.isSubscribed ? "Premium" : "Free"}
                </div>
            </div>

            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex items-center gap-4 p-4 bg-linear-to-br from-[#1887A1]/5 to-[#0D4C5B]/5 rounded-2xl border border-[#1887A1]/10">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#1887A1] to-[#0D4C5B] flex items-center justify-center text-white text-2xl font-bold shadow-lg border-2 border-white/50">
                        {student.name ? student.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-gray-800">{student.name}</h4>
                        <p className="text-sm text-gray-500 font-medium">Student Learner</p>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#1887A1]/5 transition-colors duration-300">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <Mail className="w-4 h-4 text-[#1887A1]" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Email</p>
                            <p className="text-sm text-gray-700 font-semibold truncate">{student.email || "N/A"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#1887A1]/5 transition-colors duration-300">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <MapPin className="w-4 h-4 text-[#1887A1]" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Location</p>
                            <p className="text-sm text-gray-700 font-semibold">{student.location || "N/A"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#1887A1]/5 transition-colors duration-300">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <GraduationCap className="w-4 h-4 text-[#1887A1]" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Education</p>
                            <p className="text-sm text-gray-700 font-semibold">{student.educationLevel || "N/A"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#1887A1]/5 transition-colors duration-300">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <Briefcase className="w-4 h-4 text-[#1887A1]" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Stack</p>
                            <p className="text-sm text-gray-700 font-semibold">{student.selectedStack || "N/A"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#1887A1]/5 transition-colors duration-300 sm:col-span-2">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <Layout className="w-4 h-4 text-[#1887A1]" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Category</p>
                            <p className="text-sm text-gray-700 font-semibold">{student.selectedCategory || "N/A"}</p>
                        </div>
                    </div>
                </div>

                {/* Mentor Section */}
                <div className={`p-4 rounded-2xl border ${student.mentorStatus === "approved" ? "bg-linear-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20" : "bg-gray-50 border-gray-100"}`}>
                    <div className="flex items-center justify-between mb-2">
                        <h5 className="text-xs font-bold uppercase tracking-widest text-[#1887A1]">Assigned Mentor</h5>
                        <div className={`w-2 h-2 rounded-full animate-pulse ${student.mentorStatus === "approved" ? "bg-emerald-500" : "bg-amber-500"}`} />
                    </div>
                    <p className={`text-base font-extrabold ${student.mentorStatus === "approved" ? "text-emerald-800" : "text-gray-700"}`}>
                        {mentorDisplayText}
                    </p>
                    {student.mentorStatus === "approved" && (
                        <p className="text-[11px] text-emerald-600 mt-1 font-medium italic">
                            Expert mentor is ready to guide you on your journey!
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default StudentProfileCard;
