import React, { useState } from "react";
import { Search, MoreVertical, User, X } from "lucide-react";

interface Chat {
    id: number;
    title: string;
    subtitle: string;
    avatar: string;
    status: "online" | "away" | "offline" | "group";
}

type ChatTab = "Ask AI" | "Mentor";

interface SidebarProps {
    chats: Chat[];
    activeTab: ChatTab;
    setActiveTab: (tab: ChatTab) => void;
    selectedChat: number | null;
    setSelectedChat: (id: number) => void;
    isLoading?: boolean;
    error: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({
    chats,
    activeTab,
    setActiveTab,
    selectedChat,
    setSelectedChat,
    isLoading = false,
    error,
}) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [showSearch, setShowSearch] = useState<boolean>(false);
    
    const filteredChats = chats.filter(
        (chat) =>
            chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: Chat["status"]): string => {
        switch (status) {
            case "online":
                return "bg-green-500";
            case "away":
                return "bg-yellow-500";
            case "offline":
                return "bg-gray-400";
            case "group":
                return "bg-blue-500";
            default:
                return "bg-gray-400";
        }
    };

    return (
        <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            aria-label="Toggle search"
                        >
                            <Search
                                size={20}
                                className="text-gray-500 hover:text-gray-700"
                                aria-hidden="true"
                            />
                        </button>
                        <button
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            aria-label="More options"
                        >
                            <MoreVertical
                                size={20}
                                className="text-gray-500 hover:text-gray-700"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>

                {showSearch && (
                    <div className="mb-4">
                        <div className="relative">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                aria-hidden="true"
                            />
                            <input
                                type="text"
                                placeholder="Search chats..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1887A1] transition-shadow"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded p-1 transition-colors"
                                    aria-label="Clear search"
                                >
                                    <X
                                        size={16}
                                        className="text-gray-400 hover:text-gray-600"
                                        aria-hidden="true"
                                    />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex bg-gray-200 rounded-lg p-1">
                    {["Ask AI", "Mentor"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as ChatTab)}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                activeTab === tab
                                    ? "bg-[#1887A1] text-white shadow-sm"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="p-4 text-center text-gray-500">
                        <div className="animate-pulse">Loading...</div>
                    </div>
                ) : error ? (
                    <div className="p-4 text-center text-red-500 bg-red-50 m-2 rounded-lg">
                        {error}
                    </div>
                ) : filteredChats.length > 0 ? (
                    <div className="space-y-1 p-2">
                        {filteredChats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => setSelectedChat(chat.id)}
                                className={`p-3 cursor-pointer rounded-lg transition-all duration-200 hover:bg-gray-100 ${
                                    selectedChat === chat.id ? "bg-blue-50 border-l-4 border-[#1887A1]" : ""
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative flex-shrink-0">
                                        <div className="w-10 h-10 bg-[#1887A1] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                            {chat.avatar}
                                        </div>
                                        <div
                                            className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(
                                                chat.status
                                            )} rounded-full border-2 border-white`}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-900 truncate">{chat.title}</h3>
                                        <p className="text-sm text-gray-500 truncate">{chat.subtitle}</p>
                                    </div>
                                    {activeTab === "Mentor" && (
                                        <User size={16} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-4 text-center text-gray-500">
                        <div className="text-gray-300 mb-2">💬</div>
                        No chats found
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;