import React from "react";
import { Search, MoreVertical, Phone, Video } from "lucide-react";

interface Chat {
    id: number;
    title: string;
    subtitle: string;
    avatar: string;
    status: "online" | "away" | "offline" | "group";
}

interface ChatHeaderProps {
    chat: Chat;
    activeTab: "Ask AI" | "Groups" | "Mentor";
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, activeTab }) => {
    const [showSearch, setShowSearch] = React.useState<boolean>(false);

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
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white flex-shrink-0">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-10 h-10 bg-[#1887A1] rounded-full flex items-center justify-center text-white font-semibold">
                        {chat.avatar}
                    </div>
                    <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(
                            chat.status
                        )} rounded-full border-2 border-white`}
                    ></div>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">{chat.title}</h3>
                    <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-600">
                            {chat.status === "online"
                                ? "online"
                                : chat.status === "away"
                                    ? "away"
                                    : chat.status === "group"
                                        ? chat.subtitle
                                        : "last seen recently"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {activeTab === "Mentor" && (
                    <>
                        <button
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Start phone call"
                        >
                            <Phone
                                size={20}
                                className="text-gray-500 hover:text-gray-700"
                                aria-hidden="true"
                            />
                        </button>
                        <button
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Start video call"
                        >
                            <Video
                                size={20}
                                className="text-gray-500 hover:text-gray-700"
                                aria-hidden="true"
                            />
                        </button>
                    </>
                )}
                <button
                    onClick={() => setShowSearch(!showSearch)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Toggle search"
                >
                    <Search
                        size={20}
                        className="text-gray-500 hover:text-gray-700"
                        aria-hidden="true"
                    />
                </button>
                <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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
    );
};

export default ChatHeader;