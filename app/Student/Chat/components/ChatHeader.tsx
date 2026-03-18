import React, { useState, useRef, useEffect } from "react";
import { Search, MoreVertical, Phone, Video, Trash2, Menu, ArrowLeft } from "lucide-react";

import { Chat } from "../Chat";

interface ChatHeaderProps {
    chat: Chat;
    activeTab: "Ask AI" | "Mentor";
    onClearChat: () => void;
    onToggleSidebar: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, activeTab, onClearChat, onToggleSidebar }) => {
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getStatusColor = (status: Chat["status"]): string => {
        switch (status) {
            case "online": return "bg-green-500";
            case "away": return "bg-yellow-500";
            case "offline": return "bg-gray-400";
            default: return "bg-gray-400";
        }
    };

    return (
        <div className="p-3 sm:p-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0 relative z-10">
            <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                <button 
                    onClick={onToggleSidebar}
                    className="p-2 hover:bg-gray-50 rounded-full lg:hidden text-gray-400 shrink-0"
                    aria-label="Open Sidebar"
                >
                    <ArrowLeft size={20} />
                </button>
                
                <div className="relative shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-[#1887A1] to-[#0D4C5B] rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-sm">
                        {chat.avatar}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 ${getStatusColor(chat.status)} rounded-full border-2 border-white shadow-xs`}></div>
                </div>
                
                <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate leading-tight">{chat.title}</h3>
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] sm:text-xs text-emerald-600 font-medium">
                            {chat.status === "online" ? "Active now" : "Last seen recently"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1">
                {activeTab === "Mentor" && (
                    <>
                        <button className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-[#1887A1]">
                            <Phone size={18} />
                        </button>
                        <button className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-[#1887A1]">
                            <Video size={18} />
                        </button>
                    </>
                )}
                
                <button 
                    onClick={() => setShowSearch(!showSearch)} 
                    className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400"
                >
                    <Search size={18} />
                </button>

                <div className="relative" ref={menuRef}>
                    <button 
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400"
                    >
                        <MoreVertical size={18} />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-30 py-1 animate-in fade-in slide-in-from-top-3 duration-200">
                            <button
                                onClick={() => {
                                    onClearChat();
                                    setShowMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                            >
                                <Trash2 size={16} />
                                Clear Chat History
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;