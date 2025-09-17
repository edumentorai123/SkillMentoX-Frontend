import React, { useEffect, useRef } from "react";

interface Message {
    id: number;
    text: string;
    sender: "user" | "ai";
}

interface Chat {
    avatar: string;
}

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

    return (
        <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
            style={{ minHeight: 0 }} // Important for proper flex behavior
        >
            {messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                        <div className="text-4xl mb-4">💬</div>
                        <p className="text-lg font-medium">Start a conversation</p>
                        <p className="text-sm">Send a message to begin chatting</p>
                    </div>
                </div>
            ) : (
                messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "ai" ? "justify-start" : "justify-end"}`}>
                        {msg.sender === "ai" && (
                            <div className="w-8 h-8 bg-[#1887A1] rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 mt-1 flex-shrink-0">
                                {chat.avatar}
                            </div>
                        )}
                        <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                                msg.sender === "ai"
                                    ? "bg-white text-gray-800 shadow-sm border"
                                    : "bg-[#1887A1] text-white"
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))
            )}

            {isTyping && (
                <div className="flex justify-start">
                    <div className="w-8 h-8 bg-[#1887A1] rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 mt-1 flex-shrink-0">
                        {chat.avatar}
                    </div>
                    <div className="bg-white text-gray-800 shadow-sm border px-4 py-2 rounded-2xl">
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                    </div>
                </div>
            )}
            
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatMessages;