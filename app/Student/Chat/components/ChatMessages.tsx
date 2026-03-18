import React, { useEffect, useRef } from "react";

import { Chat, Message } from "../Chat";

interface ChatMessagesProps {
    messages: Message[];
    chat: Chat;
    isTyping?: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, chat, isTyping = false }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const formatTime = (ts?: number) => {
        if (!ts) return "";
        return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-gray-50/50 scrollbar-hide"
            style={{ 
                minHeight: 0,
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
            }}
        >
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
            {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-3xl">👋</span>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold text-gray-600">Say hello to {chat.title}!</p>
                        <p className="text-sm">Start your conversation below.</p>
                    </div>
                </div>
            ) : (
                messages.map((msg, idx) => {
                    const isSelf = msg.sender === "user";
                    const showAvatar = !isSelf && (idx === 0 || messages[idx-1].sender === "user");
                    
                    return (
                        <div key={msg.id} className={`flex ${isSelf ? "justify-end" : "justify-start"} items-end gap-2`}>
                            {!isSelf && (
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm ${showAvatar ? "bg-linear-to-br from-[#1887A1] to-[#0D4C5B]" : "opacity-0"}`}>
                                    {chat.avatar}
                                </div>
                            )}
                            <div className={`flex flex-col ${isSelf ? "items-end" : "items-start"} max-w-[80%]`}>
                                <div
                                    className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm sm:text-base transition-all duration-200 ${
                                        isSelf
                                            ? "bg-linear-to-r from-[#1887A1] to-[#0D4C5B] text-white rounded-br-none"
                                            : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                                <span className="text-[10px] text-gray-400 mt-1 px-1">
                                    {formatTime(msg.timestamp || (typeof msg.id === 'number' ? msg.id : undefined))}
                                </span>
                            </div>
                        </div>
                    );
                })
            )}

            {isTyping && (
                <div className="flex justify-start items-end gap-2">
                    <div className="w-8 h-8 bg-linear-to-br from-[#1887A1] to-[#0D4C5B] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
                        {chat.avatar}
                    </div>
                    <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-xs">
                        <div className="flex space-x-1.5">
                            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                </div>
            )}
            
            <div ref={messagesEndRef} className="h-2" />
        </div>
    );
};

export default ChatMessages;