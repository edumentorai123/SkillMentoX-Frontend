"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";

interface Chat {
  id: number;
  title: string;
  subtitle: string;
  avatar: string;
  status: "online" | "away" | "offline" | "group";
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

type ChatTab = "Ask AI" | "Mentor";

const Chat: React.FC = () => {
  const [chats] = useState<Chat[]>([
    {
      id: 0,
      title: "AI Assistant",
      subtitle: "How can I help you today?",
      avatar: "AI",
      status: "online",
    },
  ]);
  
  const [selectedChat, setSelectedChat] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<ChatTab>("Ask AI");
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || selectedChat === null) return;

    const newMessage: Message = {
      id: Date.now(),
      text: message,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/ai`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message,
            chatId: selectedChat,
            messages: messages.map((msg) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text,
            })),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to send message");
      }

      const data = await response.json();
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: data.reply || "Sorry, I couldn't generate a response.",
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to send message. Please try again.";
      setError(errorMessage);
      console.error("Send Message Error:", err);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const currentChat = chats.find((chat) => chat.id === selectedChat) || null;

  // Clear messages when switching chats
  useEffect(() => {
    setMessages([]);
    setError(null);
    setIsTyping(false);
  }, [selectedChat]);

  return (
    <div className="h-screen w-screen bg-white flex overflow-hidden">
      <Sidebar
        chats={chats}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        error={error}
        isLoading={isLoading}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        {currentChat ? (
          <>
            <ChatHeader chat={currentChat} activeTab={activeTab} />
            <ChatMessages 
              messages={messages} 
              chat={currentChat}
              isTyping={isTyping}
            />
            <ChatInput 
              onSendMessage={handleSendMessage} 
              disabled={isLoading}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-50">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-xl font-semibold mb-2">Welcome to Chat</h2>
              <p>Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;